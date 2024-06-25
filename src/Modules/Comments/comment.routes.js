import {Router} from 'express';
import * as commentController from './comment.controller.js';


const router = Router();

router.post('/create', commentController.createComment)
router.get('/read', commentController.readComment)
router.patch('/update', commentController.updateComment)
router.delete('/delete', commentController.deleteComment)



export default router;