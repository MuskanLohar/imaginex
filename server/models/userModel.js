import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter your email"],
        unique: true
    },
     phone: {
        type: String,
        required: [true, "Please Enter your phone"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please Enter your Password"],
    },
    isAdmin: {
        type : Boolean,
        default : false,
        required : true
    },
    isActive: {
         type : Boolean,
         default : true,
        required : true
    },
    credits: {
        type : Number,
         default : 5,
        required : true
    }
}, {
    timestamps: true
})


const user = mongoose.model("User", userSchema)

export default user