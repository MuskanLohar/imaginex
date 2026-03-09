import User from "../models/userModel.js"

const getAllUsers = async (req, res) => {
  
    const users = await User.find()

    if(!users){
        res.status(404)
        throw new Error("users not found!")
    }

    res.status(200).json(users)
}

const getAllPosts = async(req, res) => {
    res.send("All Posts")
}


const updatePost = async (req, res) => {
    res.send("Post Updated!")
}

const getReports = async(req, res) => {
     res.send("Get Reports!")
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