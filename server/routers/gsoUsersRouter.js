const express = require('express');
const router = express.Router();
const gsoUsersController = require('../controllers/gsoUsersController')
const passport = require('passport')
const {IsLoggedIn, isAdmin, isUser, validateUser, validateUpdateInfoAdmin, validateChangePassword ,validateUpdateUserinfo} = require('../../middlewares')

router.get('/', gsoUsersController.loginFormFirstPage)
router.post('/', passport.authenticate('local', {failureFlash: true,failureRedirect: '/login'}), gsoUsersController.loginUserFirstPage)
router.get('/login', gsoUsersController.loginForm)
router.post('/login', passport.authenticate('local', {failureFlash: true,failureRedirect: '/login'}), gsoUsersController.loginUser)

router.get('/user/myprofile/view/:id',IsLoggedIn, isUser, gsoUsersController.userMyProfile)
router.get('/user/myprofile/update/:id',IsLoggedIn, isUser, gsoUsersController.updateMyProfilePage)
router.put('/user/myprofile/update/:id',IsLoggedIn, isUser, validateUpdateUserinfo, gsoUsersController.updateMyProfileInfo)
router.post('/user/changepass/:id',IsLoggedIn, isUser, validateChangePassword, gsoUsersController.userChangePassword)


// ============================================================Admin Side
router.get('/userspage/view/:id',IsLoggedIn, isAdmin, gsoUsersController.viewUser);
router.get('/userspage/update/:id',IsLoggedIn, isAdmin, gsoUsersController.updateUserPage)
router.put('/userspage/update/:id',IsLoggedIn, isAdmin, validateUpdateInfoAdmin, gsoUsersController.updateUserInfo);
router.post('/userspage/changepass/:id',IsLoggedIn, isAdmin, validateChangePassword, gsoUsersController.adminUserChangePassword);

router.get('/admin/myprofile/view/:id',IsLoggedIn, isAdmin, gsoUsersController.adminMyProfile);
router.get('/admin/myprofile/update/:id',IsLoggedIn, isAdmin, gsoUsersController.adminUpdatePage)
router.put('/admin/myprofile/update/:id',IsLoggedIn, validateUpdateInfoAdmin, gsoUsersController.adminUpdateInfo)
router.post('/admin/myprofile/changepass/:id',IsLoggedIn, isAdmin, validateChangePassword, gsoUsersController.adminMyProfileChangePassword);

// router.get('/register', gsoUsersController.registrationForm);
// router.post('/register',validateUser, gsoUsersController.saveAccount);

router.get('/register',IsLoggedIn, isAdmin, gsoUsersController.registrationForm);
router.post('/register',IsLoggedIn, isAdmin, validateUser, gsoUsersController.saveAccount);



router.get('/logout', gsoUsersController.logout);


module.exports = router;