const express = require('express');
const router = express.Router();

// controllers
const userController = require('../../controllers/v1/userController');

router.get('/' , userController.getUsers);
router.get('/me' , userController.getUser);
router.post('/register' , userController.store);
router.post('/login' ,userController.login);
router.patch('/me' , userController.updateUser);
router.delete('/me' , userController.deleteUser);


module.exports = router;