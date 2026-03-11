// save post

import Post from "../models/postModel.js"
import Saved from "../models/savedPostModal.js"

const savePost = async (req, res) => {
    const userId = req.user._id
    const postId = req.params.pid

    // check if posts exists
    const post = await Post.findById(postId)

    if (!post) {
        res.status(404)
        throw new Error("Post Not Found!")
    }



    // chack if post is already saved
    const saveExists = await Saved.findOne({user : userId})

    if(saveExists){
        res.status(409)
        throw new Error("post already saved!")
    }

    // create save post
    const savedPost = new Saved({
        user: userId,
        post: postId
    })

    await savedPost.save()
    await savedPost.populate('post')

    if (!savedPost) {
        res.status(409)
        throw new Error("Post Not saved!")
    }

    res.status(201).json(savedPost)
}

// get save post

const getSavePosts = async (req, res) => {

    const userId = req.user._id
    const allMySavedPosts = await Saved.find({ user: userId }).populate('post')

    if (!allMySavedPosts) {
        res.status(404)
        throw new Error("saved posts not found!")
    }

    res.status(200).json(allMySavedPosts)
}

// delete saved post
const removeSavedPost = async(req,res) => {
    await Saved.findOneAndDelete(req.params.pid)
    res.status(200).json({
        _id: req.params.pid,
        msg: "saved post removed"
    })
}

const savePostController = { savePost, getSavePosts, removeSavedPost }

export default savePostController