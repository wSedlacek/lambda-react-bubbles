import { User } from '../../models/User';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

type CheckTokenStart = { type: 'CHECK_TOKEN_START' };
type CheckTokenSuccess = { type: 'CHECK_TOKEN_SUCCESS'; payload: string };
type CheckTokenFailure = { type: 'CHECK_TOKEN_FAILURE'; payload: string };

type LoginStart = { type: 'LOGIN_START' };
type LoginSuccess = { type: 'LOGIN_SUCCESS'; payload: string };
type LoginFailure = { type: 'LOGIN_FAILURE'; payload: string };

type SignOutStart = { type: 'SIGN_OUT_START' };
type SignOutSuccess = { type: 'SIGN_OUT_SUCCESS' };
type SignOutFailure = { type: 'SIGN_OUT_FAILURE'; payload: string };

type ClearError = { type: 'CLEAR_ERROR' };

export type CheckToken = CheckTokenStart | CheckTokenSuccess | CheckTokenFailure;
export type Login = LoginStart | LoginSuccess | LoginFailure;
export type SignOut = SignOutStart | SignOutSuccess | SignOutFailure;

export type AuthActions = CheckToken | Login | SignOut | ClearError;

export const checkToken = () => (dispatch: (action: CheckToken) => void) => {
  dispatch({ type: 'CHECK_TOKEN_START' });

  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token could not be fetched');
    dispatch({ type: 'CHECK_TOKEN_SUCCESS', payload: token });
  } catch (err) {
    dispatch({ type: 'CHECK_TOKEN_FAILURE', payload: err.response });
  }
};

export const login = (credentials: User) => async (dispatch: (action: Login) => void) => {
  dispatch({ type: 'LOGIN_START' });

  try {
    const res = await axiosWithAuth().post(`/api/login`, credentials);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.payload });
  } catch (err) {
    dispatch({ type: 'LOGIN_FAILURE', payload: err.toString() });
  }
};

export const signOut = () => (dispatch: (action: SignOut) => void) => {
  dispatch({ type: 'SIGN_OUT_START' });

  try {
    dispatch({ type: 'SIGN_OUT_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'SIGN_OUT_FAILURE', payload: err.response });
  }
};
