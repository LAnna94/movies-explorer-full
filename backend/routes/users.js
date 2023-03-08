const userRouter = require('express').Router();
const {
  updateUserInfo,
  getCurrentUser,
} = require('../controllers/users');
const {
  celebrateProfileInfo,
} = require('../validators/users');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', celebrateProfileInfo, updateUserInfo);

module.exports = userRouter;
