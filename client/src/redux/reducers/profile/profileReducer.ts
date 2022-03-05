import { Profile } from '../../../models/Profile';
import {
    ClearProfile,
    CLEAR_PROFILE,
    GetProfile,
    GetProfiles,
    GetRepos,
    GET_PROFILE,
    GET_PROFILES,
    GET_REPOS,
    ProfileError,
    PROFILE_ERROR,
    UpdateProfile,
    UPDATE_PROFILE,
} from './profileTypes';

export interface ProfileState {
    profile: Profile | null;
    profiles: Profile[];
    repos: any[];
    loading: boolean;
    error: ErrorProps;
}

interface ErrorProps {
    msg: string;
    status: number;
}

const PROFILE_INITIAL_STATE: ProfileState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {} as ErrorProps,
};

export const profileReducer = (
    state: ProfileState = PROFILE_INITIAL_STATE,
    action: GetProfile | GetProfiles | GetRepos | ProfileError | ClearProfile | UpdateProfile,
) => {
    switch (action.type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false,
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false,
            };
        case GET_REPOS:
            return {
                ...state,
                repos: action.payload,
                loading: false,
            };
        case PROFILE_ERROR:
            return {
                ...state,
                profile: null,
                loading: false,
                error: action.payload,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false,
            };

        default:
            return state;
    }
};
