import express from "express";
import * as dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL-E!" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      // response_format: "b64_json",
    });
    
    // const aiResponse = await openai.createImage({
      // model: "dall-e-3",
    //   prompt,
    //   n: 1,
    //   size: '1024x1024',
    //   response_format: 'b64_json',
    // });


    const image = aiResponse?.data?.data?.[0]?.b64_json || "DefaultFallbackImage";

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    // res
    //   .status(500)
    //   .send(error?.response?.data?.error.message || "Something went wrong");
    const errorMessage =
    error.response?.data?.error?.message ||
    (typeof error === 'object' ? JSON.stringify(error) : "Something went wrong");

  res.status(500).send(errorMessage);
  }
});

export default router;