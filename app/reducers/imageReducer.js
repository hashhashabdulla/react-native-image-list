/* eslint-disable prettier/prettier */

import {
  LOAD_IMAGE_FAILURE,
  LOAD_IMAGE_START,
  LOAD_IMAGE_SUCCESS,
} from '../constants';

let initialState = {
  isLoading: false,
  imageList: [],
  error: null,
};

export default function imageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_IMAGE_START:
      console.log('Load start');
      return {...state, isLoading: true};
    case LOAD_IMAGE_SUCCESS:
      return {...state, imageList: action.payload, isLoading: false};
    case LOAD_IMAGE_FAILURE:
      return {...state, error: action.payload, isLoading: false};
    default:
      return state;
  }
}
