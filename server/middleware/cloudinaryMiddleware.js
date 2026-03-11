import { v2 as cloudinary } from 'cloudinary';
import fs from "node:fs"
import dotenv from "dotenv";
dotenv.config();


//configuration
cloudinary.config({
    cloud_name: 'dqsnftyie',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});




const uploadToCloudinary = async (filePath) => {

    // upload an image
    const uploadResult = await cloudinary.uploader
    .upload(
        filePath, {
            resource_type: "auto"
        }
    )
    .catch((error) => {
        console.log(error);
        //if failes remove file from our server
        fs.unlinkSync(filePath)
    });
    return uploadResult
}

export default uploadToCloudinary