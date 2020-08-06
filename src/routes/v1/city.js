const express = require('express');
const router = express.Router();

// middlewares
const isAuth = require('../../middlewares/isAuth');
const isAdmin = require('../../middlewares/isAdmin');

// controllers
const cityController = require('../../controllers/v1/cityController');

router.get('/' , cityController.getAll);
router.get('/:id' , cityController.get);
router.post('/' , isAuth , isAdmin , cityController.store);
router.patch('/:id' , isAuth , isAdmin , cityController.update);
router.delete('/' , isAuth , isAdmin , cityController.delete);


module.exports = router;