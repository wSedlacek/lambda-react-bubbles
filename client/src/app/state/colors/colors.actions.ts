import { axiosWithAuth } from '../../utils/axiosWithAuth';

import { Color } from '../../models/Color';

type GetColorsStart = { type: 'GET_COLORS_START' };
type GetColorsSuccess = { type: 'GET_COLORS_SUCCESS'; payload: Color[] };
type GetColorsFailure = { type: 'GET_COLORS_FAILURE'; payload: string };

type EditColorStart = { type: 'EDIT_COLOR_START' };
type EditColorSuccess = { type: 'EDIT_COLOR_SUCCESS'; payload: Color };
type EditColorFailure = { type: 'EDIT_COLOR_FAILURE'; payload: string };

type DeleteColorStart = { type: 'DELETE_COLOR_START' };
type DeleteColorSuccess = { type: 'DELETE_COLOR_SUCCESS'; payload: Color };
type DeleteColorFailure = { type: 'DELETE_COLOR_FAILURE'; payload: string };

export type ClearError = { type: 'CLEAR_ERROR' };

export type GetColors = GetColorsStart | GetColorsSuccess | GetColorsFailure;
export type EditColor = EditColorStart | EditColorSuccess | EditColorFailure;
export type DeleteColor = DeleteColorStart | DeleteColorSuccess | DeleteColorFailure;

export type ColorsActions = GetColors | EditColor | DeleteColor | ClearError;

export const getColors = () => async (dispatch: (action: GetColors) => void) => {
  dispatch({ type: 'GET_COLORS_START' });

  try {
    const res = await axiosWithAuth().get<Color[]>('/api/colors');
    dispatch({ type: 'GET_COLORS_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'GET_COLORS_FAILURE', payload: err.toString() });
  }
};

export const editColor = (color: Color) => async (dispatch: (action: EditColor) => void) => {
  dispatch({ type: 'EDIT_COLOR_START' });

  try {
    const res = await axiosWithAuth().put(`/api/colors/${color.id}`, color);
    dispatch({ type: 'EDIT_COLOR_SUCCESS', payload: color });
  } catch (err) {
    dispatch({ type: 'EDIT_COLOR_FAILURE', payload: err.toString() });
  }
};

export const deleteColor = (color: Color) => async (dispatch: (action: DeleteColor) => void) => {
  dispatch({ type: 'DELETE_COLOR_START' });

  try {
    const res = await axiosWithAuth().delete(`/api/colors/${color.id}`);
    dispatch({ type: 'DELETE_COLOR_SUCCESS', payload: color });
  } catch (err) {
    dispatch({ type: 'DELETE_COLOR_FAILURE', payload: err.toString() });
  }
};
