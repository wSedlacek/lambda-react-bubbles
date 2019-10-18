import { combineReducers } from 'redux';

import { authReducer, AuthState } from './auth/auth.reducer';
import { colorsReducer, ColorsState } from './colors/colors.reducer';

export type State = { auth: AuthState; colors: ColorsState };
export const reducer = combineReducers({ auth: authReducer, colors: colorsReducer });
