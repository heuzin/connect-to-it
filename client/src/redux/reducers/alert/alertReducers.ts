import { RemoveAlert, REMOVE_ALERT, SetAlert, SET_ALERT } from './alertTypes';

export interface AlertState {
    id: string;
    msg: string;
    alertType: string;
}

const ALERT_INITIAL_STATE: AlertState[] = [];

export const alertReducer = (state: AlertState[] = ALERT_INITIAL_STATE, action: SetAlert | RemoveAlert) => {
    switch (action.type) {
        case SET_ALERT:
            return [...state, action.payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payload);
        default:
            return state;
    }
};
