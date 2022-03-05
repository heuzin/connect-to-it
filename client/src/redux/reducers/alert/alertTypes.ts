import { Action } from 'redux';
import { AlertState } from './alertReducers';

export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

export interface SetAlert extends Action<typeof SET_ALERT> {
    payload: AlertState;
}
export interface RemoveAlert extends Action<typeof REMOVE_ALERT> {
    payload: string;
}
