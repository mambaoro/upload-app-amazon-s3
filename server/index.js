/* eslint-disable global-require */
/* eslint consistent-return:0 import/order:0 */

const express = require('express');
const logger = require('./logger');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config();

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const { resolve } = require('path');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const uploadFiles = multer({
  storage: multerS3({
    s3,
    bucket: process.env.BUCKET_NAME,
    acl: 'public-read',
    key(req, file, cb) {
      cb(null, path.basename(file.originalname));
    },
  }),
  limits: { fileSize: 15728640 }, // In bytes: 15728640 bytes = 15 MB
}).array('uploadList', 5);

app.post('/uploadMultiple', (req, res) => {
  uploadFiles(req, res, error => {
    if (error) {
      return res.json({ error });
    }
    if (req.files === undefined) {
      return res.json('Error: No file selected');
    }
    const ListFiles = req.files;
    let fileLocation;
    const ListLocation = ListFiles.map(file => {
      fileLocation = file.location;
      return fileLocation;
    });
    res.json({
      files: ListFiles,
      locations: ListLocation,
    });
  });
});

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// use the gzipped bundle
app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set('Content-Encoding', 'gzip');
  next();
});

// Start your app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    let url;
    try {
      url = await ngrok.connect(port);
    } catch (e) {
      return logger.error(e);
    }
    logger.appStarted(port, prettyHost, url);
  } else {
    logger.appStarted(port, prettyHost);
  }
});

// const params = {
//   Bucket: 'upload-app-portfolio',
//   Key: 'LSD',
//   Body: 'LSD - Genius',
// };

// s3.upload(params, (err, data) => {
//   if (err) {
//     console.log('Error', err);
//   }
//   if (data) {
//     console.log(data);
//   }
// });
