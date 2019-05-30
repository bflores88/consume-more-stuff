'use strict';
import { LOAD_ITEMS } from '../actions';
import { LOAD_SPECIFIC_ITEM } from '../actions';

const initialState = {
  item: {},
  items: [],
};

function itemReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ITEMS:
      return Object.assign({}, state, { items: [...action.payload] });
    case LOAD_SPECIFIC_ITEM:
      return Object.assign({}, state, { item: action.payload} );
    default:
      return state;
  }
}

export default itemReducer;
