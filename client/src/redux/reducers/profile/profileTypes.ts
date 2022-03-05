import { Action } from 'redux';
import { Profile } from '../../../models/Profile';

export const GET_PROFILE = 'GET_PROFILE';
export const GET_PROFILES = 'GET_PROFILES';
export const GET_REPOS = 'GET_REPOS';
export const PROFILE_ERROR = 'PROFILE_ERROR';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const CLEAR_PROFILE = 'CLEAR_PROFILE';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';

export interface GetProfile extends Action<typeof GET_PROFILE> {
    payload: Profile;
}

export interface GetProfiles extends Action<typeof GET_PROFILES> {
    payload: Profile[];
}

export interface GetRepos extends Action<typeof GET_REPOS> {
    payload: any;
}

export interface ProfileError extends Action<typeof PROFILE_ERROR> {
    payload: {
        msg: string;
        status: number;
    };
}

export interface UpdateProfile extends Action<typeof UPDATE_PROFILE> {
    payload: Profile;
}

export interface ClearProfile extends Action<typeof CLEAR_PROFILE> {}

export interface DeleteAccount extends Action<typeof DELETE_ACCOUNT> {}
