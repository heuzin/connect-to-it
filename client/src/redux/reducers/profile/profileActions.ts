import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { CreateProfileProps } from '../../../models/CreateProfile';
import { IProfileEducation, IProfileExperience, Profile } from '../../../models/Profile';
import setAuthToken from '../../../utils/setAuthToken';
import { setAlert } from '../alert/alertAction';
import {
    ClearProfile,
    CLEAR_PROFILE,
    DeleteAccount,
    DELETE_ACCOUNT,
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

export const getCurrentProfile = (): ThunkAction<
    void,
    RootState,
    undefined,
    GetProfile | ProfileError
> => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const { data } = await axios.get<Profile>('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: data,
        });
    } catch (error: any) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const getProfiles = (): ThunkAction<
    void,
    RootState,
    undefined,
    GetProfiles | ClearProfile | ProfileError
> => async dispatch => {
    dispatch({ type: CLEAR_PROFILE });

    try {
        const { data } = await axios.get<Profile[]>('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: data,
        });
    } catch (error: any) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const getProfileById = (userId: string): ThunkAction<
    void,
    RootState,
    undefined,
    GetProfile  | ProfileError
> => async dispatch => {

    try {
        const { data } = await axios.get<Profile>(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: data,
        });
    } catch (error: any) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const getGithubRepos = (username: string): ThunkAction<
    void,
    RootState,
    undefined,
    GetRepos  | ProfileError
> => async dispatch => {
    try {
        const { data } = await axios.get<Profile>(`/api/profile/github/${username}`);

        dispatch({
            type: GET_REPOS,
            payload: data,
        });
    } catch (error: any) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const createProfile = (
    formData: CreateProfileProps,
    navigate: NavigateFunction,
    edit = false,
): ThunkAction<void, RootState, undefined, GetProfile | ProfileError> => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: data,
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Prpfile Created', 'success'));

        if (!edit) {
            navigate('/dashboard');
        }
    } catch (error: any) {
        const err = error.response.data.errors;

        if (err) {
            err.forEach((error: any) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const addExperience = (
    formData: Partial<IProfileExperience>,
    navigate: NavigateFunction,
): ThunkAction<void, RootState, undefined, UpdateProfile | ProfileError> => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.put('/api/profile/experience', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: data,
        });

        dispatch(setAlert('Experience Added', 'success'));

        navigate('/dashboard');
    } catch (error: any) {
        const err = error.response.data.errors;

        if (err) {
            err.forEach((error: any) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const addEducation = (
    formData: Partial<IProfileEducation>,
    navigate: NavigateFunction,
): ThunkAction<void, RootState, undefined, UpdateProfile | ProfileError> => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.put('/api/profile/education', formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: data,
        });

        dispatch(setAlert('Education Added', 'success'));

        navigate('/dashboard');
    } catch (error: any) {
        const err = error.response.data.errors;

        if (err) {
            err.forEach((error: any) => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const deleteExperience = (
    id: string,
): ThunkAction<void, RootState, undefined, UpdateProfile | ProfileError> => async dispatch => {
    try {
        const { data } = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: data,
        });

        dispatch(setAlert('Experience Removed', 'success'));
    } catch (error: any) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const deleteEducation = (
    id: string,
): ThunkAction<void, RootState, undefined, UpdateProfile | ProfileError> => async dispatch => {
    try {
        const { data } = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: data,
        });

        dispatch(setAlert('Education Removed', 'success'));
    } catch (error: any) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status },
        });
    }
};

export const deleteAccount = (): ThunkAction<
    void,
    RootState,
    undefined,
    ClearProfile | DeleteAccount | ProfileError
> => async dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            await axios.delete(`/api/profile`);

            dispatch({ type: CLEAR_PROFILE });
            dispatch({ type: DELETE_ACCOUNT });

            dispatch(setAlert('Your account has been permanantly deleted', ''));
        } catch (error: any) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status },
            });
        }
    }
};
