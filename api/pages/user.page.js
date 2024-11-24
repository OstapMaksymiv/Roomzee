import express from 'express'
import { getUsers, updateUser,deleteUser,getNotificationNumber, savePost, profilePosts,resetPassword } from '../controllers/user.controller.js'
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router()
router.get ('/', getUsers);
router.put('/:id',verifyToken, updateUser);
router.delete('/:id',verifyToken, deleteUser);
router.get("/notification", verifyToken, getNotificationNumber);
router.post("/save", verifyToken, savePost);
router.post('/reset-password', resetPassword);
router.get("/profilePosts", verifyToken, profilePosts);
export default router;