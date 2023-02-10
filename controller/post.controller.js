const db = require('../db');

class PostController {
  async createPost(req, res) {
    const { title, body, userId } = req.body;
    const newPost = await db.query(
      'INSERT INTO posts ( user_id, title, body) VALUES ($1,$2,$3)   returning *',
      [userId, title, body],
    );
    res.json(newPost.rows[0]);
  }
  async getAllPosts(req, res) {
    const posts = await db.query('SELECT * FROM posts  ORDER BY id ASC');
    res.json(posts.rows);
  }
  async getPostsByUser(req, res) {
    const userId = req.params.id;
    const posts = await db.query(
      'SELECT * FROM posts WHERE user_id = $1 ORDER BY id ASC ',
      [userId],
    );
    res.json(posts.rows);
  }
}

module.exports = new PostController();
