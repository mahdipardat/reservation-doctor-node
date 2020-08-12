const express = require('express');
const router = express.Router();

// Middlewares
const isDoctor = require('../../middlewares/isDoctorAuth');

// Controllers
const addressController = require('../../controllers/v1/addressController');

router.get('/' , addressController.getAll);
router.get('/:id' , addressController.get);
router.post('/' ,isDoctor, addressController.store);
router.patch('/:id' , isDoctor , addressController.store);
router.delete('/:id' , isDoctor , addressController);


module.exports = router;