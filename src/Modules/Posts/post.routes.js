import {Router} from 'express';
import * as postController from './post.controller.js';

const router = Router();

router.post('/create', postController.createPost)
router.get('/read', postController.readPost)
router.put('/update', postController.updatePost)
router.patch('/delete', postController.deletePost)
router.get('/get', postController.getPost)





export default router;