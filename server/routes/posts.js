import express from 'express';
import {getPosts,createPost,updatePost,deletePost,likePost} from '../controllers/posts.js';
import {createNewUser,signInUser} from '../controllers/user.js';
import bodyParser from 'body-parser';

import auth from '../middleware/auth.js';

const router = express.Router();


router.get('/',getPosts);
router.post('/',auth,createPost);
router.patch('/:id',auth, updatePost);
router.delete('/:id',deletePost);
router.patch('/:id/likePost',auth,likePost);


//For New User


export default router;