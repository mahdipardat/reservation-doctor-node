const express = require('express');
const router = express.Router();

// middlewares
const isAuth = require('../../middlewares/isAuth');
const isAdmin = require('../../middlewares/isAdmin');


// controllers
const stateController = require('../../controllers/v1/stateController');

router.get('/' , stateController.getAll);
router.get('/:id' , stateController.get);
router.post('/' , isAuth , isAdmin , stateController.store);
router.patch('/:id' , isAuth , isAdmin , stateController.update);
router.delete('/:id' , isAuth , isAdmin , stateController.delete);


module.exports = router;