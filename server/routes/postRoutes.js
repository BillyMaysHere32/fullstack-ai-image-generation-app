import express from 'express';
import * as dotenv from 'dotenv';
import Post from '../models/post.js';

dotenv.config();

const router = express.Router();

router.route('/').get(async (req, res) => {
    try {
      const posts = await Post.find({});
      res.status(200).json({ success: true, data: posts });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
});

router.route('/').post(async (req, res) => {
    try {
      const { name, prompt, photo } = req.body;
  
      const newPost = await Post.create({
        name,
        prompt,
        photo,
      });
  
      res.status(200).json({ success: true, data: newPost });
    } catch (err) {
      res.status(500).json({ success: false, message: error });
    }
});

export default router;