'use strict';
import { LOAD_ITEMS } from '../actions';

const initialState = {
  items: [],
};

function itemReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ITEMS:
      return Object.assign({}, state, { items: [...action.payload] });
    default:
      return state;
  }
}

export default itemReducer;
