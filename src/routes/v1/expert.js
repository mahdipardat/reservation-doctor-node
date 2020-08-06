const express = require('express');
const router = express.Router();

// middlewares
const isAuth = require('../../middlewares/isAuth');
const isAdmin = require('../../middlewares/isAdmin');

// controllers
const expertController = require('../../controllers/v1/expertController');

router.get('/' , expertController.getAll);
router.get('/:id' , expertController.get);
router.post('/' , isAuth , isAdmin , expertController.store);
router.patch('/:id' , isAuth , isAdmin , expertController.update);
router.delete('/:id' , isAuth , isAdmin , expertController.delete);


module.exports = router;