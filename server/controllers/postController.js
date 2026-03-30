import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import uploadToCloudinary from "../middleware/cloudinaryMiddleware.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import Report from "../models/reportModel.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// take prompt and caption
// generate image with ai model
// store on local server
// upload on cloudinary
// remove from server
// respond with caption and post
const generateAndPost = async (req, res) => {


    let userId = req.user.id
    let newPost

    // check if user exists
    const user = await User.findById(userId)

    if(!user){
        res.status(404)
        throw new Error("User Not Found!")

    }

    //check if user have enough credits
    if(user.credits < 1){
        res.status(409)
        throw new Error("Not Enough Credits!")
    }

    try {
        // Get Prompt
        const { prompt } = req.body

        // check if prompt is coming in body
        if (!prompt) {
            res.status(409)
            throw new Error("Kindly Provide Prompt To Generate image!")
        }

        // initialize google gen ai instence
        const ai = new GoogleGenAI({})

        // Api call to generate image
        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-image-preview",
            contents: prompt,
        });


        // Loop Through correct response
        for (const part of response.candidates[0].content.parts) {
            if (part.text) {
                console.log(part.text);
            } else if (part.inlineData) {
                const imageData = part.inlineData.data;

                // convert text to image
                const buffer = Buffer.from(imageData, "base64");

                //save locally
                const filename = crypto.randomUUID() + ".png";
                const filePath = path.join(__dirname, "../generated-content", filename);

                //write file into server
                fs.writeFileSync(filePath, buffer);

                // upload to cloudinary
                const imageLink = await uploadToCloudinary(filePath)

                // remove image from server
                fs.unlinkSync(filePath)

                //create post


                newPost = new Post({
                    user: userId,
                    imageLink: imageLink.secure_url,
                    prompt: prompt
                })

                // save post to db
                await newPost.save()
                //aggregate user details in newpost object
                await newPost.populate("user")
            }
        }

        //updated credits
        await User.findByIdAndUpdate(user._id, {credits : user.credits - 1}, {new: true})

        res.status(201).json(newPost)


    } catch (error) {

        console.log("REAL ERROR:", error)
        res.status(409)
        throw new Error("Post Not Created!")
    }
}

const getPosts = async (req, res) => {
    const posts = await Post.find().populate('user')

    if (!posts) {
        res.status(404)
        throw new Error("posts not found!")
    }

    res.status(200).json(posts)
}


const getPost = async (req, res) => {
    const post = await Post.findById(req.params.pid).populate('user')

    if (!post) {
        res.status(404)
        throw new Error("post not found!")
    }

    res.status(200).json(post)
}


const likeAndUnlikePost = async (req, res) => {

    let currentUser = await User.findById(req.user._id)

    // chack if user exists
    if (!currentUser) {
        res.status(404)
        throw new Error("User Not Found!")
    }

    // check if post exist
    const post = await Post.findById(req.params.pid).populate('user')

    if (!post) {
        res.status(404)
        throw new Error("post not found!")
    }

    // check if already liked
    if (post.likes.includes(currentUser._id)) {
        // dislike
        // remove follower from likes
        let updatedLikesList= post.likes.filter(like => like.toString() !== currentUser._id.toString())
        post.likes = updatedLikesList
        await post.save()
    } else {
        // like
        // Add followers in liked
        post.likes.push(currentUser._id)
        await post.save()
    }

    // populate after save using the post model directly
    // await Post.populate(post, { path: 'likes' })

    res.status(200).json(post)

}


const reportPost = async(req, res) => {
    const {text} = req.body
    const postId = req.params.pid
    const userId = req.user._id

    if(!text){
        res.status(409)
        throw new Error("please Enter Text")
    }

    const newReport = new Report({
        user : userId, 
        post : postId,
        text : text
    })


    await newReport.save()
    await newReport.populate('user')
     await newReport.populate('post')

    if(!newReport){
        res.status(409)
        throw new Error("unable to report this post ")
    }

    res.status(201).json(newReport)
}




const postController = { generateAndPost, getPosts, getPost, likeAndUnlikePost, reportPost}

export default postController