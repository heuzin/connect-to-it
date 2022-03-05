import { User } from './User';

export interface Profile {
    _id: string;
    user: User;
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

export interface IProfileExperience {
    _id: string;
    title: string;
    company: string;
    location: string;
    from: string;
    to: string;
    current: boolean;
    description: string;
}

export interface IProfileEducation {
    _id: string;
    school: string;
    degree: string;
    fieldofstudy: string;
    from: string;
    to: string;
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
