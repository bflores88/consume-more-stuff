'use strict';
import { combineReducers } from 'redux';
import { LOAD_ITEMS } from '../actions';
import { GRAB_ITEM_IMAGES } from '../actions';
import { REGISTER } from '../actions';

const initialState = {
  items: [],
  images: [],
  registrationSuccessful: true,
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

function registerReducer(state = initialState, action) {
  console.log('register reducer');
  switch (action.type) {
    case REGISTER:
      return Object.assign({}, state, { registrationSuccessful: true });
    default: 
      return state;
  }
}

const savannahApp = combineReducers({
  itemReducer,
  registerReducer,
})

export default savannahApp;
