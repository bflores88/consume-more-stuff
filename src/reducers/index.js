import { LOAD_ITEMS } from '../actions';

import { LOAD_SPECIFIC_ITEM } from '../actions';

import { GRAB_ITEM_IMAGES } from '../actions';

import { LOGIN } from '../actions';

import { LOGOUT } from '../actions';

import { ADD_ITEM } from '../actions';

import { RESET_NEW_ITEM } from '../actions';

import { INCREMENT_ITEM_VIEWS } from '../actions';

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('user')),
  item: {},
  items: [],
  images: [],

  loggedIn: false,

  newestItem: '',
};

function itemReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ITEMS:
      return Object.assign({}, state, { items: [...action.payload] });

    case LOAD_SPECIFIC_ITEM:
      return Object.assign({}, state, { item: action.payload });

    case GRAB_ITEM_IMAGES:
      return Object.assign({}, state, { images: [...action.payload] });

    case LOGIN:
      initialState.loggedIn = true;
      return Object.assign({}, state, { currentUser: action.payload });

    case LOGOUT:
      initialState.loggedIn = false;
      return Object.assign({}, state, { currentUser: action.payload });

    case ADD_ITEM:
      return Object.assign({}, state, { newestItem: action.payload });

    case RESET_NEW_ITEM:
      return Object.assign({}, state, { newestItem: '' });

    case INCREMENT_ITEM_VIEWS:
      return Object.assign({}, state, { newestItem: '' });

    default:
      return state;
  }
}

export default itemReducer;
