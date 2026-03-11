import User from "../models/userModel.js"

const followUserRequest = async (req, res) => {


    let targetUser = await User.findById(req.params.uid)
    let currentUser = await User.findById(req.user._id)


    // chack if both user exists
    if (!targetUser || !currentUser) {
        res.status(404)
        throw new Error("User Not Found!")
    }

    // check if already followed

    if (targetUser.followers.includes(currentUser._id)) {
        res.status(409)
        throw new Error("Already followed")
    }


    // Add follower
    targetUser.followers.push(currentUser._id)
    await targetUser.save()

    // Add following
    currentUser.following.push(targetUser._id)
    await currentUser.save()

    res.status(200).json(targetUser).select("-password")
}


const unfollowUserRequest = async (req, res) => {


    let targetUser = await User.findById(req.params.uid)
    let currentUser = await User.findById(req.user._id)


    // chack if both user exists
    if (!targetUser || !currentUser) {
        res.status(404)
        throw new Error("User Not Found!")
    }


    // check if already unfollowed
    if (!targetUser.followers.includes(currentUser._id)) {
        res.status(409)
        throw new Error("Already un-followed")
    }


    // remove follower
    let updatedFollowersList = targetUser.followers.filter(follower => follower.toString() !== currentUser._id.toString())
    targetUser.followers = updatedFollowersList
    await targetUser.save()


    // remove following
    let updatedFollowingList = currentUser.following.filter(follower => follower._id.toString() !== targetUser._id.toString())
    currentUser.following = updatedFollowingList
    await currentUser.save()
    res.status(200).json(targetUser).select("-password")

    res.send("unfollowed")
}






const followController = { followUserRequest, unfollowUserRequest }

export default followController