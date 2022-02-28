import express from 'express';
import request from 'request';
import { config } from 'node-config-ts';
const router = express.Router();
import { check, validationResult } from 'express-validator';
import auth from '../../middleware/auth';
import Profile, { IProfileDocument, IProfileEducation, IProfileExperience, IProfileSocial } from '../../models/Profile';
import User from '../../models/User';

// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user?.id }).populate('user', ['name', 'avatar']);

        if (!profile) return res.status(400).json({ msg: 'There is no profile for this user' });

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route  POST api/profile
// @desc   Create or update a user profile
// @access Private
router.post(
    '/',
    auth,
    [
        check('status', 'Status is required')
            .not()
            .isEmpty(),
        check('skills', 'Skills is required')
            .not()
            .isEmpty(),
    ],
    async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin,
        } = req.body;

        const profileFields: IProfileDocument = {} as IProfileDocument;

        profileFields.user = req.user?.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map((skill: string) => skill.trim());
        }
        profileFields.social = {} as IProfileSocial;
        if (youtube) profileFields.social.youtube = youtube;
        if (facebook) profileFields.social.facebook = facebook;
        if (twitter) profileFields.social.twitter = twitter;
        if (instagram) profileFields.social.instagram = instagram;
        if (linkedin) profileFields.social.linkedin = linkedin;

        try {
            let profile = await Profile.findOne({ user: req.user?.id });

            if (profile) {
                profile = await Profile.findOneAndUpdate(
                    { user: req.user?.id },
                    { $set: profileFields },
                    { new: true },
                );

                return res.json(profile);
            }

            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    },
);

// @route  GET api/profile
// @desc   Get all profiles
// @access Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET api/profile/user/:user_id
// @desc   Get profile by user ID
// @access Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if (!profile) return res.status(400).json({ msg: 'Profile not found' });

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route  DELETE api/profile
// @desc   Delete profile, user & posts
// @access Private
router.delete('/', auth, async (req, res) => {
    try {
        await Profile.findOneAndRemove({ user: req.user?.id });
        await User.findOneAndRemove({ _id: req.user?.id });

        res.json({ msg: 'User deleted' });
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route  PUT api/profile/experience
// @desc   Add profile experience
// @access Private
router.put(
    '/experience',
    auth,
    [
        check('title', 'Title is required')
            .not()
            .isEmpty(),
        check('company', 'Company is required')
            .not()
            .isEmpty(),
        check('from', 'From date is required')
            .not()
            .isEmpty(),
    ],
    async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, company, location, from, to, current, description } = req.body;

        const newExp = { title, company, location, from, to, current, description } as IProfileExperience;

        try {
            const profile = await Profile.findOne({ user: req.user?.id });

            profile?.experience.unshift(newExp);

            await profile?.save();

            res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    },
);

// @route  DELETE api/profile/experience/:exp_id
// @desc   Delete profile experience from profile
// @access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user?.id });

        const remooveIndex = profile?.experience.map(exp => exp.id).indexOf(req.params.exp_id);

        profile?.experience.splice(remooveIndex!, 1);

        await profile?.save();

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route  PUT api/profile/education
// @desc   Add profile education
// @access Private
router.put(
    '/education',
    auth,
    [
        check('school', 'School is required')
            .not()
            .isEmpty(),
        check('degree', 'Degree is required')
            .not()
            .isEmpty(),
        check('fieldofstudy', 'Field of study is required')
            .not()
            .isEmpty(),
        check('from', 'From date is required')
            .not()
            .isEmpty(),
    ],
    async (req: express.Request, res: express.Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { school, degree, fieldofstudy, from, to, current, description } = req.body;

        const newEdu = { school, degree, fieldofstudy, from, to, current, description } as IProfileEducation;

        try {
            const profile = await Profile.findOne({ user: req.user?.id });

            profile?.education.unshift(newEdu);

            await profile?.save();

            res.json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    },
);

// @route  DELETE api/profile/experience/:edu_id
// @desc   Delete profile education from profile
// @access Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user?.id });

        const remooveIndex = profile?.education.map(exp => exp.id).indexOf(req.params.edu_id);

        profile?.education.splice(remooveIndex!, 1);

        await profile?.save();

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET api/profile/github/:username
// @desc   Get user repos from Github
// @access Public
router.get('/github/:username', async (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id${config.githubClientId}&client_secret=${config.githubSecret}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' },
        };

        request(options, (error, response, body) => {
            if (error) return console.error(error);

            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: 'No Github profile found' });
            }

            res.json(JSON.parse(body));
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

export default router;
