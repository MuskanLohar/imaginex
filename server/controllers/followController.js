import User from "../models/userModel.js"

const followUserRequest = async (req, res) => {


    let targetUser = await User.findById (req.params.uid)
    let currentUser = await User.findById(req.user._id)

    // chack if both user exists
    if(!targetUser || !currentUser){
        res.status(404)
        throw new Error("User Not Found!")
    }

  

    // Add follower
    targetUser.followers.push(currentUser._id)
    await targetUser.save()

    res.status(200).json(targetUser).select("-password")






    // let user = await User.findById(req.params.uid)

    // if(!user){
    //     res.status(404)
    //     throw new Error("user not Found!")
    // }

    // user.followers.push(req.params._id)

    // await user.save()

    // res.send("Followed")
}



const followController = { followUserRequest }

export default followController