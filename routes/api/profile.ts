import express from 'express';
const router = express.Router();

// @route  GET api/profile
// @desc   Test route
// @access Public
router.get('/', (req, res) => res.send('Profile route'));

export default router;
