import User from "../models/userModel.js"
import Post from "../models/postModel.js"
import Report from "../models/reportModel.js"

const getAllUsers = async (req, res) => {
  
    const users = await User.find()

    if(!users){
        res.status(404)
        throw new Error("users not found!")
    }

    res.status(200).json(users)
}

const getAllPosts = async(req, res) => {
  const posts = await User.find()

    if(!posts){
        res.status(404)
        throw new Error("posts not found!")
    }

    res.status(200).json(posts)
}


const updatePost = async (req, res) => {
    let postId = req.params.pid

    const post = await Post.findById(postId)

    if(!post){
        res.status(404)
        throw new Error("post not found")
    }

    let updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true})

  if(!updatePost){
        res.status(409)
        throw new Error("post not updated!")
    }

    res.status(200).json(updatedPost)
}

const getReports = async(req, res) => {
     const reports = await Report.find()

    if(!reports){
        res.status(404)
        throw new Error("reports not found!")
    }

    res.status(200).json(reports)
}

const UpdateUser = async(req, res) => {

    let userId = req.params.uid

    const user = await User.findById(userId)

    if(!user){
        res.status(404)
        throw new Error("user not found")
    }

    let updatedUser = await User.findByIdAndUpdate(userId, {isActive : user.isActive ? false : true}, { new: true })

  if(!updatedUser){
        res.status(409)
        throw new Error("user not updated!np")
    }
    res.status(200).json(updatedUser)
}



const adminController = {getAllPosts, getAllUsers, updatePost, UpdateUser, getReports}

export default adminController