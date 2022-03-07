"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../../middleware/auth"));
const Posts_1 = __importDefault(require("../../models/Posts"));
const User_1 = __importDefault(require("../../models/User"));
const router = express_1.default.Router();
// @route  POST api/posts
// @desc   Create a post
// @access Private
router.post('/', auth_1.default, [
    (0, express_validator_1.check)('text', 'Text is required')
        .not()
        .isEmpty(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = yield User_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id).select('-password');
        const newPost = new Posts_1.default({
            text: req.body.text,
            name: user === null || user === void 0 ? void 0 : user.name,
            avatar: user === null || user === void 0 ? void 0 : user.avatar,
            user: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
        });
        const post = yield newPost.save();
        res.json(post);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}));
// @route  POST api/posts
// @desc   Get all posts
// @access Private
router.get('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield Posts_1.default.find().sort({ date: -1 });
        res.json(posts);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}));
// @route  POST api/posts/:id
// @desc   Get post by ID
// @access Private
router.get('/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Posts_1.default.findById(req.params.id);
        if (!post)
            return res.status(404).json({ msg: 'Post not found' });
        res.json(post);
    }
    catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId')
            return res.status(404).json({ msg: 'Post not found' });
        res.status(500).send('Server Error');
    }
}));
// @route  DELETE api/posts/:id
// @desc   Delete a post
// @access Private
router.delete('/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const post = yield Posts_1.default.findById(req.params.id);
        if (!post)
            return res.status(404).json({ msg: 'Post not found' });
        if (post.user.toString() !== ((_c = req.user) === null || _c === void 0 ? void 0 : _c.id))
            return res.status(401).json({ msg: 'User not authorized' });
        yield post.remove();
        res.json({ msg: 'Post removed' });
    }
    catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId')
            return res.status(404).json({ msg: 'Post not found' });
        res.status(500).send('Server Error');
    }
}));
// @route  PUT api/posts/like/:id
// @desc   Like a post
// @access Private
router.put('/like/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const post = yield Posts_1.default.findById(req.params.id);
        if (!post)
            return res.status(404).json({ msg: 'Post not found' });
        if ((post === null || post === void 0 ? void 0 : post.likes.filter(like => { var _a; return like.user.toString() === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id); }).length) > 0) {
            return res.status(400).json({ msg: 'Post already liked' });
        }
        post.likes.unshift({ user: (_d = req.user) === null || _d === void 0 ? void 0 : _d.id });
        yield post.save();
        res.json(post.likes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}));
// @route  PUT api/posts/unlike/:id
// @desc   Like a post
// @access Private
router.put('/unlike/:id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const post = yield Posts_1.default.findById(req.params.id);
        if (!post)
            return res.status(404).json({ msg: 'Post not found' });
        if ((post === null || post === void 0 ? void 0 : post.likes.filter(like => { var _a; return like.user.toString() === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id); }).length) === 0) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf((_e = req.user) === null || _e === void 0 ? void 0 : _e.id);
        post.likes.splice(removeIndex, 1);
        yield post.save();
        res.json(post.likes);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}));
// @route  POST api/posts/comment/:id
// @desc   Comment on a post
// @access Private
router.post('/comment/:id', auth_1.default, [
    (0, express_validator_1.check)('text', 'Text is required')
        .not()
        .isEmpty(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = yield User_1.default.findById((_f = req.user) === null || _f === void 0 ? void 0 : _f.id).select('-password');
        const post = yield Posts_1.default.findById(req.params.id);
        if (!post)
            return res.status(404).json({ msg: 'Post not found' });
        const newComment = {
            text: req.body.text,
            name: user === null || user === void 0 ? void 0 : user.name,
            avatar: user === null || user === void 0 ? void 0 : user.avatar,
            user: (_g = req.user) === null || _g === void 0 ? void 0 : _g.id,
        };
        post === null || post === void 0 ? void 0 : post.comments.unshift(newComment);
        yield post.save();
        res.json(post.comments);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}));
// @route  DELETE api/posts/comment/:id/:comment_id
// @desc   Delete a comment
// @access Private
router.delete('/comment/:id/:comment_id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j;
    try {
        const post = yield Posts_1.default.findById(req.params.id);
        if (!post)
            return res.status(404).json({ msg: 'Post not found' });
        const comment = post === null || post === void 0 ? void 0 : post.comments.find(comment => comment.id === req.params.comment_id);
        if (!comment)
            return res.status(404).json({ msg: 'Comment does not exist' });
        if (comment.user.toString() !== ((_h = req.user) === null || _h === void 0 ? void 0 : _h.id))
            return res.status(401).json({ msg: 'User not authorized' });
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf((_j = req.user) === null || _j === void 0 ? void 0 : _j.id);
        post.comments.splice(removeIndex, 1);
        yield post.save();
        res.json(post.comments);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}));
exports.default = router;
