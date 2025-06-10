const multer = require('multer');
const path = require('path');

// Store resumes in uploads/ directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') cb(null, true);
  else cb(new Error('Only PDFs allowed'), false);
};

const upload = multer({ storage, fileFilter });
module.exports = upload;
