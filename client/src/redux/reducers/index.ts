import { combineReducers } from 'redux';
import store from '../store';
import { alertReducer } from './alert/alertReducers';
import { authReducer } from './auth/authReducers';
import { postReducer } from './post/postReducer';
import { profileReducer } from './profile/profileReducer';

const rootReducer = combineReducers({
    alert: alertReducer,
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default rootReducer;
