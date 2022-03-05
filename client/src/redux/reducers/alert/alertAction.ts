import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { v4 as uuidv4 } from 'uuid';
import { RemoveAlert, REMOVE_ALERT, SetAlert, SET_ALERT } from './alertTypes';

export const setAlert = (
    msg: string,
    alertType: string,
    timeout: number = 5000,
): ThunkAction<void, RootState, undefined, SetAlert | RemoveAlert> => dispatch => {
    const id = uuidv4();

    dispatch({
        type: SET_ALERT,
        payload: { id, msg, alertType },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
