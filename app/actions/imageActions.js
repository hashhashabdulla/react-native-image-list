import axios from 'axios';
import {
  LOAD_IMAGE_FAILURE,
  LOAD_IMAGE_START,
  LOAD_IMAGE_SUCCESS,
} from '../constants';

export const getImageList = () => {
  return (dispatch, getState) => {
    dispatch({type: LOAD_IMAGE_START});
    axios
      .get('https://jsonplaceholder.typicode.com/photos')
      .then((response) => {
        dispatch({type: LOAD_IMAGE_SUCCESS, payload: response.data});
      })
      .catch((err) => {
        console.log('Error', err);
        dispatch({type: LOAD_IMAGE_FAILURE, payload: err});
      });
  };
};
