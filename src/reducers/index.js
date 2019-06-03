import { combineReducers } from 'redux';

import {
  LOAD_ITEMS,
  LOAD_ITEMS_BY_CATEGORY,
  LOAD_SINGLE_USER,
  POST_NEW_MESSAGE,
  LOAD_INACTIVE_ITEMS,
} from '../actions';
import { LOAD_SPECIFIC_ITEM } from '../actions';
import { GRAB_ITEM_IMAGES } from '../actions';
import { ADD_ITEM } from '../actions';
import { LOAD_CATEGORIES } from '../actions';

import { RESET_NEW_ITEM } from '../actions';
import { INCREMENT_ITEM_VIEWS } from '../actions';
import { UPDATE_USER_PASSWORD } from '../actions';

import { GRAB_USER_THREADS } from '../actions';
import { GRAB_THREAD_MESSAGES } from '../actions';

import { REGISTER, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_FAILURE} from '../actions';
import { GRAB_ALL_USERS } from '../actions';

const initialState = {
  // user: JSON.parse(localStorage.getItem('user')),
  item: {},
  items: [],
  images: [],
  newestItem: '',
  threads: [],
  messages: [],
  categories: [],
  itemsByCategory: {},

  userList: [],

  inactiveItems: [],
};

const userState = {
  registrationSuccessful: false, 
  loggedIn: false,
  user: JSON.parse(localStorage.getItem('user')),
  passwordUpdateStatus: false,
}

function itemReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ITEMS:
      return Object.assign({}, state, { items: [...action.payload] });

    case LOAD_SPECIFIC_ITEM:
      return Object.assign({}, state, { item: action.payload });

    case LOAD_INACTIVE_ITEMS:
      return Object.assign({}, state, { inactiveItems: action.payload });

    case GRAB_ITEM_IMAGES:
      return Object.assign({}, state, { images: [...action.payload] });

    case ADD_ITEM:
      return Object.assign({}, state, { newestItem: action.payload });

    case RESET_NEW_ITEM:
      return Object.assign({}, state, { newestItem: '' });

    case LOAD_CATEGORIES:
      return Object.assign({}, state, { categories: [...action.payload] });

    case LOAD_ITEMS_BY_CATEGORY:
      return Object.assign({}, state, { itemsByCategory: [action.payload] });

    case INCREMENT_ITEM_VIEWS:
      return Object.assign({}, state, { newestItem: '' });

    case UPDATE_USER_PASSWORD:
      return Object.assign({}, state, { passwordUpdateStatus: [action.payload] });

    case GRAB_USER_THREADS:
      return Object.assign({}, state, { threads: [...action.payload] });

    case GRAB_THREAD_MESSAGES:
      return Object.assign({}, state, { messages: [...action.payload] });

    case POST_NEW_MESSAGE:
      return Object.assign({}, state, { messages: [...action.payload] });

    case GRAB_ALL_USERS:
      return Object.assign({}, state, { userList: [...action.payload] });

    default:
      return state;
  }
}

function userReducer(state = userState, action) { 
  switch (action.type) {
    case REGISTER:
      return Object.assign({}, state, { registrationSuccessful: true });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, { loggedIn: true, user: action.payload});

    case LOGIN_FAILURE:
      return Object.assign({}, state, { loggedIn: false, user: null});
    
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, { loggedIn: false, user: null });

    case LOGOUT_FAILURE:
      return Object.assign({}, state);

    case LOAD_SINGLE_USER: 
      return Object.assign({}, state, { user: action.payload })

    default: 
      return state;
  }
}

const savannahApp = combineReducers({
  itemReducer,
  userReducer,
});

export default savannahApp;
