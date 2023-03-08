import express from 'express';
const router = express.Router();

import { signin, signup, getUsers } from "../controllers/userControllers.js";

// router.get('/signup', (req, res) => {
//     res.send('Working!');
// });

router.get("/", getUsers);
router.post('/signin', signin);
router.post('/signup', signup);

export default router;