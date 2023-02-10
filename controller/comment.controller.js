const db = require('../db');

class CommentController {
  async addComment(req, res) {
    const { postId, userId, body } = req.body;
    const newPost = await db.query(
      'INSERT INTO comments (post_id, user_id, body) VALUES ($1,$2,$3) returning *',
      [postId, userId, body],
    );
    res.json(newPost.rows[0]);
  }
  async getCommsByUser(req, res) {
    const userId = req.query.userId;
    const posts = await db.query(
      'SELECT * FROM comments WHERE user_id = $1 ORDER BY id ASC ',
      [userId],
    );
    res.json(posts.rows);
  }
  async getCommsByPost(req, res) {
    const postId = req.params.id;
    const posts = await db.query(
      'SELECT * FROM comments WHERE post_id = $1 ORDER BY id ASC ',
      [postId],
    );
    res.json(posts.rows);
  }
}

module.exports = new CommentController();
