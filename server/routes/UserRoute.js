import express from 'express'
import { authUser, loginUser,updateUserProfile,getUserProfile,logoutUser,registerUser } from '../controller/UserController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();
router.post('/auth',authUser)
router.post('/login',loginUser)
router.post('/register',registerUser)
router.post('/logout',logoutUser)
// router.get('/profile',getUserProfile)
// router.put('/profile',updateUserProfile)
router.get('/profile/:userId', getUserProfile)

export default router;