import express from 'express';
import {
  authUser,
  registerUser,
  forgot,
  // logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  profileAddress,
} from '../controllers/userController.js';


const router = express.Router();

router.route('/').post(registerUser).get( getUsers).put(forgot);
router.post('/auth', authUser);
// router.post('/logout', logoutUser);
router
  .route('/profile')
  .get( getUserProfile)
  .put( updateUserProfile);
  router.put('/address/:id', profileAddress);
router
  .route('/:id')
  .delete( deleteUser)
  .get( getUserById)
  .put( updateUser);

export default router;
