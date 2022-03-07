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
const request_1 = __importDefault(require("request"));
const router = express_1.default.Router();
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../../middleware/auth"));
const Profile_1 = __importDefault(require("../../models/Profile"));
const User_1 = __importDefault(require("../../models/User"));
const Posts_1 = __importDefault(require("../../models/Posts"));
// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private
router.get('/me', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const profile = yield Profile_1.default.findOne({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }).populate('user', ['name', 'avatar']);
        if (!profile)
            return res.status(400).json({ msg: 'There is no profile for this user' });
        res.json(profile);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}));
// @route  POST api/profile
// @desc   Create or update a user profile
// @access Private
router.post('/', auth_1.default, [
    (0, express_validator_1.check)('status', 'Status is required')
        .not()
        .isEmpty(),
    (0, express_validator_1.check)('skills', 'Skills is required')
        .not()
        .isEmpty(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin, } = req.body;
    const profileFields = {};
    profileFields.user = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
    if (company)
        profileFields.company = company;
    if (website)
        profileFields.website = website;
    if (location)
        profileFields.location = location;
    if (bio)
        profileFields.bio = bio;
    if (status)
        profileFields.status = status;
    if (githubusername)
        profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }
    profileFields.social = {};
    if (youtube)
        profileFields.social.youtube = youtube;
    if (facebook)
        profileFields.social.facebook = facebook;
    if (twitter)
        profileFields.social.twitter = twitter;
    if (instagram)
        profileFields.social.instagram = instagram;
    if (linkedin)
        profileFields.social.linkedin = linkedin;
    try {
        let profile = yield Profile_1.default.findOne({ user: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id });
        if (profile) {
            profile = yield Profile_1.default.findOneAndUpdate({ user: (_d = req.user) === null || _d === void 0 ? void 0 : _d.id }, { $set: profileFields }, { new: true });
            return res.json(profile);
        }
        profile = new Profile_1.default(profileFields);
        yield profile.save();
        res.json(profile);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}));
// @route  GET api/profile
// @desc   Get all profiles
// @access Public
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profiles = yield Profile_1.default.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}));
// @route  GET api/profile/user/:user_id
// @desc   Get profile by user ID
// @access Public
router.get('/user/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield Profile_1.default.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if (!profile)
            return res.status(400).json({ msg: 'Profile not found' });
        res.json(profile);
    }
    catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
}));
// @route  DELETE api/profile
// @desc   Delete profile, user & posts
// @access Private
router.delete('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g;
    try {
        yield Posts_1.default.deleteMany({ user: (_e = req.user) === null || _e === void 0 ? void 0 : _e.id });
        yield Profile_1.default.findOneAndRemove({ user: (_f = req.user) === null || _f === void 0 ? void 0 : _f.id });
        yield User_1.default.findOneAndRemove({ _id: (_g = req.user) === null || _g === void 0 ? void 0 : _g.id });
        res.json({ msg: 'User deleted' });
    }
    catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
}));
// @route  PUT api/profile/experience
// @desc   Add profile experience
// @access Private
router.put('/experience', auth_1.default, [
    (0, express_validator_1.check)('title', 'Title is required')
        .not()
        .isEmpty(),
    (0, express_validator_1.check)('company', 'Company is required')
        .not()
        .isEmpty(),
    (0, express_validator_1.check)('from', 'From date is required')
        .not()
        .isEmpty(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, company, location, from, to, current, description } = req.body;
    const newExp = { title, company, location, from, to, current, description };
    try {
        const profile = yield Profile_1.default.findOne({ user: (_h = req.user) === null || _h === void 0 ? void 0 : _h.id });
        profile === null || profile === void 0 ? void 0 : profile.experience.unshift(newExp);
        yield (profile === null || profile === void 0 ? void 0 : profile.save());
        res.json(profile);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}));
// @route  DELETE api/profile/experience/:exp_id
// @desc   Delete profile experience from profile
// @access Private
router.delete('/experience/:exp_id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _j;
    try {
        const profile = yield Profile_1.default.findOne({ user: (_j = req.user) === null || _j === void 0 ? void 0 : _j.id });
        const remooveIndex = profile === null || profile === void 0 ? void 0 : profile.experience.map(exp => exp.id).indexOf(req.params.exp_id);
        profile === null || profile === void 0 ? void 0 : profile.experience.splice(remooveIndex, 1);
        yield (profile === null || profile === void 0 ? void 0 : profile.save());
        res.json(profile);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}));
// @route  PUT api/profile/education
// @desc   Add profile education
// @access Private
router.put('/education', auth_1.default, [
    (0, express_validator_1.check)('school', 'School is required')
        .not()
        .isEmpty(),
    (0, express_validator_1.check)('degree', 'Degree is required')
        .not()
        .isEmpty(),
    (0, express_validator_1.check)('fieldofstudy', 'Field of study is required')
        .not()
        .isEmpty(),
    (0, express_validator_1.check)('from', 'From date is required')
        .not()
        .isEmpty(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { school, degree, fieldofstudy, from, to, current, description } = req.body;
    const newEdu = { school, degree, fieldofstudy, from, to, current, description };
    try {
        const profile = yield Profile_1.default.findOne({ user: (_k = req.user) === null || _k === void 0 ? void 0 : _k.id });
        profile === null || profile === void 0 ? void 0 : profile.education.unshift(newEdu);
        yield (profile === null || profile === void 0 ? void 0 : profile.save());
        res.json(profile);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}));
// @route  DELETE api/profile/experience/:edu_id
// @desc   Delete profile education from profile
// @access Private
router.delete('/education/:edu_id', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _l;
    try {
        const profile = yield Profile_1.default.findOne({ user: (_l = req.user) === null || _l === void 0 ? void 0 : _l.id });
        const remooveIndex = profile === null || profile === void 0 ? void 0 : profile.education.map(exp => exp.id).indexOf(req.params.edu_id);
        profile === null || profile === void 0 ? void 0 : profile.education.splice(remooveIndex, 1);
        yield (profile === null || profile === void 0 ? void 0 : profile.save());
        res.json(profile);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}));
// @route  GET api/profile/github/:username
// @desc   Get user repos from Github
// @access Public
router.get('/github/:username', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id${process.env.githubClientId}&client_secret=${process.env.githubSecret}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' },
        };
        (0, request_1.default)(options, (error, response, body) => {
            if (error)
                return console.error(error);
            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: 'No Github profile found' });
            }
            res.json(JSON.parse(body));
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}));
exports.default = router;
