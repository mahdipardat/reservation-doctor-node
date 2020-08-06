const express = require('express');
const router = express.Router();

// controllers
const userController = require('../../controllers/v1/userController');

// middlewares
const isAuth = require('../../middlewares/isAuth');
const isSuperAdmin = require('../../middlewares/isSuperAdmin');

router.get('/' , userController.getUsers);
router.post('/' , userController.store);
router.post('/login' ,userController.login);
router.post('/logout', isAuth , userController.logout);
router.get('/me', isAuth , userController.getUser);
router.patch('/me', isAuth , userController.updateUser);
router.delete('/me', isAuth , userController.deleteUser);
router.post('/forget' , userController.forget);
router.post('/reset/:token' , userController.reset);
router.post('/add-admin/:id' , isAuth , isSuperAdmin , userController.addAdmin);


module.exports = router;