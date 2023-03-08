import * as dotenv from 'dotenv';
import Post from '../models/post.js';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const getPosts = async (req, res) => {
    try {
      const posts = await Post.find({});
      res.status(200).json({ success: true, data: posts });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
};

export const createPost = async (req, res) => {
    try {
      const { name, prompt, photo } = req.body;
      const photoUrl = await cloudinary.uploader.upload(photo);
  
      const newPost = await Post.create({
        name,
        prompt,
        photo: photoUrl.url,
      });
  
      res.status(200).json({ success: true, data: newPost });
    } catch (err) {
      res.status(500).json({ success: false, message: err });
    }
};
