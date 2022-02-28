import { Document, model, ObjectId } from 'mongoose';
import mongoose from 'mongoose';

export interface IProfileDocument extends Document {
    user: ObjectId;
    company: string;
    website: string;
    location: string;
    status: string;
    skills: string[];
    bio: string;
    githubusername: string;
    experience: IProfileExperience[];
    education: IProfileEducation[];
    social: IProfileSocial;
}

export interface IProfileExperience extends Document {
    title: string;
    company: string;
    location: string;
    from: Date;
    to: Date;
    current: boolean;
    description: string;
}

export interface IProfileEducation extends Document {
    school: string;
    degree: string;
    fieldofstudy: string;
    from: Date;
    to: Date;
    current: boolean;
    description: string;
}

export interface IProfileSocial {
    youtube: string;
    twitter: string;
    facebook: string;
    linkedin: string;
    instagram: string;
}

const ProfileSchema = new mongoose.Schema<IProfileDocument>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    company: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    status: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    bio: {
        type: String,
    },
    githubusername: {
        type: String,
    },
    experience: [
        {
            title: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            location: {
                type: String,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false,
            },
            description: {
                type: String,
            },
        },
    ],
    education: [
        {
            school: {
                type: String,
                required: true,
            },
            degree: {
                type: String,
                required: true,
            },
            fieldofstudy: {
                type: String,
                required: true,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false,
            },
            description: {
                type: String,
            },
        },
    ],
    social: {
        youtube: {
            type: String,
        },
        twitter: {
            type: String,
        },
        facebook: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        instagram: {
            type: String,
        },
    },
});

const Profile = model<IProfileDocument>('Profile', ProfileSchema);

export default Profile;
