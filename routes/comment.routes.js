const Router = require('express');
const router = new Router();
const commentController = require('../controller/comment.controller');

router.post('/comms', commentController.addComment);
router.get('/comms/:id', commentController.getCommsByPost);
router.get('/comms', commentController.getCommsByUser);

module.exports = router;
