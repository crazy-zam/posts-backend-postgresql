const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');
const commsRouter = require('./routes/comment.routes');

const PORT = process.env.PORT || 8080;
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

const upload = multer();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static('public'));
app.use('/api', userRouter);
app.use('/api', postRouter);
app.use('/api', commsRouter);

app.use(allowCrossDomain);

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
