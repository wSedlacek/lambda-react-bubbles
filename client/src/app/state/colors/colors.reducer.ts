import { Color } from '../../models/Color';
import { ColorsActions } from './colors.actions';

export type ColorsState = {
  list: Color[];
  loading: boolean;
  error: string;
};

const initialState: ColorsState = {
  list: [],
  loading: false,
  error: '',
};

export const colorsReducer = (state = initialState, action: ColorsActions) => {
  switch (action.type) {
    case 'GET_COLORS_START':
      return { ...state, loading: true, error: '' };
    case 'GET_COLORS_SUCCESS':
      return { ...state, list: action.payload, loading: false, error: '' };
    case 'GET_COLORS_FAILURE':
      return { ...state, list: [], loading: false, error: action.payload };

    case 'EDIT_COLOR_START':
      return { ...state, loading: true, error: '' };
    case 'EDIT_COLOR_SUCCESS':
      const editedColor = action.payload;
      const editedColorList = state.list.map((color) =>
        color.id === editedColor.id ? editedColor : color
      );
      return { ...state, list: editedColorList, loading: false, error: '' };
    case 'EDIT_COLOR_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'DELETE_COLOR_START':
      return { ...state, loading: true, error: '' };
    case 'DELETE_COLOR_SUCCESS':
      const deletedColor = action.payload;
      const otherColors = state.list.filter((color) => color.id !== deletedColor.id);
      return { ...state, list: otherColors, loading: false, error: '' };
    case 'DELETE_COLOR_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'CLEAR_ERROR':
      return { ...state, error: '' };
    default:
      return state;
  }
};
