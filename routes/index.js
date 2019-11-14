const express = require('express');
const AuthController = require('../controllers/auth')
// const TeamController = require('../controllers/team')
const UserController = require('../controllers/user')
const { isUser } = require('../utils/middleware')
const { validate_login, validate_signup, validate_send_token, validate_reset_token } = require('../validations/auth.validation')
const { validate_change_pass, validate_user_id_param } = require('../validations/user.validation')

const router = express.Router();

/**
 * Auth Routes
 */
router.post('/users/register', validate_signup, AuthController.register);
router.post('/users/signin', validate_login, AuthController.login);
router.post('/users/send-token', validate_send_token, AuthController.sendToken);
router.patch('/users/reset-pass', validate_reset_token, AuthController.resetPass);

/** 
 * User Routes
 */
router.get('/users', UserController.all);
router.get('/users/:id', validate_user_id_param, UserController.one);
router.patch('/users/:id', validate_user_id_param, isUser, UserController.update);
router.patch('/users/change-pass', isUser, validate_change_pass, UserController.changePass);

// router.get('/teams', TeamController.all);
// router.get('/teams/:id', TeamController.one);
// router.patch('/teams/:id', isAdmin, TeamController.update);
// router.post('/teams', isAdmin, TeamController.create);
// router.delete('/teams/:id', isAdmin, TeamController.remove);
module.exports = router;
