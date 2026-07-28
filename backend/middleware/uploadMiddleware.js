const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage engine configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate secure, unique filenames: fieldName-userId-timestamp.ext
    const userId = req.user ? req.user.id : 'anonymous';
    const cleanFieldName = file.fieldname.replace(/[^a-zA-Z0-9]/g, '');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${cleanFieldName}-${userId}-${uniqueSuffix}${path.extname(file.originalname).toLowerCase()}`);
  },
});

// File filter based on type
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png|webp|gif|svg|heic|heif/;
  const allowedDocTypes = /pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document/;
  const allowedPptTypes = /mspowerpoint|powerpoint|vnd.ms-powerpoint|vnd.openxmlformats-officedocument.presentationml.presentation/;

  const ext = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;
  const isGenericMime = !mimetype || mimetype === 'application/octet-stream';

  if (file.fieldname === 'profileImage' || file.fieldname === 'projectImage') {
    const isValidExt = allowedImageTypes.test(ext) || ext === '.svg' || ext === '.heic';
    const isValidMime = allowedImageTypes.test(mimetype) || mimetype === 'image/svg+xml';
    if (isValidExt || (isValidMime && !isGenericMime)) {
      return cb(null, true);
    }
    return cb(new Error('Only JPEG, JPG, PNG, WEBP, GIF, SVG, or HEIC images are allowed!'));
  } else if (file.fieldname === 'resumeURL') {
    const isValidExt = allowedDocTypes.test(ext) || ext === '.pdf' || ext === '.doc' || ext === '.docx';
    const isValidMime = allowedDocTypes.test(mimetype) || mimetype === 'application/pdf';
    if (isValidExt || (isValidMime && !isGenericMime)) {
      return cb(null, true);
    }
    return cb(new Error('Only PDF or Word documents are allowed for resumes!'));
  } else if (file.fieldname === 'uploadedPPT') {
    const isValidExt = allowedPptTypes.test(ext) || ext === '.ppt' || ext === '.pptx';
    const isValidMime = allowedPptTypes.test(mimetype);
    if (isValidExt || (isValidMime && !isGenericMime)) {
      return cb(null, true);
    }
    return cb(new Error('Only PPT or PPTX slideshow presentations are allowed!'));
  } else {
    cb(new Error('Unknown file field upload!'));
  }
};

// Define specific uploads config
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // General maximum limit: 50MB (to allow high-res images and large PPTs)
  },
});

module.exports = upload;
