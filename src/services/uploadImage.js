const multer = require('multer');
const mkdirp = require('mkdirp');

const generatePath = () => {
   const year = new Date().getFullYear();
   const month = new Date().getMonth();
   const day = new Date().getDay();
   return `statics/uploads/${year}/${month}/${day}`;
}

const fileStorage = multer.diskStorage({
   destination : function (req , file , cb) {
      const filePath = generatePath();
      const made = mkdirp.sync(filePath);
      cb(null , filePath);

   } ,

   filename : function (req , file , cb) {
      cb(null , Date.now() + '-' + file.originalname);
   }
});

const filterFile = function(req , file , cb) {

   if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg') {
      cb(null , false);
   } else {
      cb(null , true)
   }

}

module.exports = multer({storage : fileStorage , fileFilter : filterFile})