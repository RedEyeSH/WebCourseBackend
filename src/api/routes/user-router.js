import express from 'express';
import { getUser, getUserById, postUser, putUser, deleteUser } from '../controllers/user-controller.js';

const userRouter = express.Router();

userRouter.route('/').get(getUser).post(postUser);

userRouter.route('/:id').get(getUserById).put(putUser).delete(deleteUser);

export default userRouter;

// import express from 'express';
// import {
//   getUser,
//   getUserById,
//   addUser,      // Replaced postUser with addUser
//   modifyUser,   // Replaced putUser with modifyUser
//   deleteUser
// } from '../controllers/user-controller.js';

// const userRouter = express.Router();

// userRouter.route('/')
//   .get(getUser)     // Get all users
//   .post(addUser);   // Add a new user

// userRouter.route('/:id')
//   .get(getUserById)  // Get a user by ID
//   .put(modifyUser)   // Modify a user by ID
//   .delete(deleteUser); // Delete a user and their cats

// export default userRouter;
