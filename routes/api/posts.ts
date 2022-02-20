import express from 'express';
const router = express.Router();

// @route  GET api/posts
// @desc   Test route
// @access Public
router.get('/', (req, res) => res.send('Posts route'));

export default router;
