import User from "../models/userModel.js"

const  getMyFollowers = async(req, res) => {

    const user = await User.findById(req.user.id).populate("followers")

    if(!user){
        res.status(404)
        throw new Error("user Not Found!")
    }

    res.status(200).json(user.followers)
   
}

const  getMyFollowing = async(req, res) => {
   const user = await User.findById(req.user.id).populate("following")

    if(!user){
        res.status(404)
        throw new Error("user Not Found!")
    }

    res.status(200).json(user.following)
}


const profileController = { getMyFollowers, getMyFollowing }

export default profileController