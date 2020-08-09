const express = require('express');
const router = express.Router();
const upload = require('../../services/uploadImage');
// middlewares
const isDoctorAuth = require('../../middlewares/isDoctorAuth');
// controllers
const doctorController = require('../../controllers/v1/doctorController');

router.get('/' , doctorController.getAll);
router.get('/:id' , doctorController.get);
router.post('/' ,upload.single('licenseImage'), doctorController.store);
router.post('/login' , doctorController.login);
router.patch('/:id' , isDoctorAuth, upload.single('licenseImage') , doctorController.update);
router.delete('/:id' , isDoctorAuth, doctorController.delete);
router.post('/accept/:id' , doctorController.accept)
router.post('/reject/:id' , doctorController.reject)


module.exports = router;