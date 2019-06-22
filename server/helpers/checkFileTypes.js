const path = require('path');

// eslint-disable-next-line consistent-return
module.exports = (file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|mp3|aif|cda|mid|midi|mpa|ogg|wav|wma|rar|7z|deb|pkg|rpm|tar.gz|zip|bin|dmg|iso|vcd|apk|avi|flv|h264|m4v|mkv|mov|mp4|mpg|mpeg|rm|swf|wmv|txt|pdf|doc|odt/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Error: Images Only!');
};
