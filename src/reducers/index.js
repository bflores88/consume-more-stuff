'use strict';
import { LOAD_ITEMS } from '../actions';
import { GRAB_ITEM_IMAGES } from '../actions';

const initialState = {
  items: [],
  images: [],
};

function itemReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ITEMS:
      return Object.assign({}, state, { items: [...action.payload] });
    case GRAB_ITEM_IMAGES:
      return Object.assign({}, state, { images: [...action.payload] });
    default:
      return state;
  }
}

export default itemReducer;
