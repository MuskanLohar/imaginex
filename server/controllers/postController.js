import { GoogleGenAI } from "@google/genai";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const generateAndPost = async (req, res) => {

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


                //create post
            }
        }

        res.send("image Generated!")
    } catch (error) {
        res.status(409)
        throw new Error("Image Generate for Failed!")
    }
}


const postController = {generateAndPost}

export default postController