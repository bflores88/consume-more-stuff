import { combineReducers } from 'redux';
import { LOAD_ITEMS, LOAD_SINGLE_USER } from '../actions';

import { LOAD_SPECIFIC_ITEM } from '../actions';

import { GRAB_ITEM_IMAGES } from '../actions';

import { ADD_ITEM } from '../actions';

import { RESET_NEW_ITEM } from '../actions';

import { REGISTER, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_FAILURE} from '../actions';

const initialState = {
  item: {},
  items: [],
  images: [],
  newestItem: '',
};

const authenticationState = {
  registrationSuccessful: false, 
  loggedIn: false,
  user: JSON.parse(localStorage.getItem('user')),
}

function itemReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ITEMS:
      return Object.assign({}, state, { items: [...action.payload] });

    case LOAD_SPECIFIC_ITEM:
      return Object.assign({}, state, { item: action.payload });

    case GRAB_ITEM_IMAGES:
      return Object.assign({}, state, { images: [...action.payload] });

    case ADD_ITEM:
      return Object.assign({}, state, { newestItem: action.payload });

    case RESET_NEW_ITEM:
      return Object.assign({}, state, { newestItem: '' });
    
    case LOAD_SINGLE_USER: // <----- If you're accessing users then this should go under authentication, (94)
      return Object.assign({}, state, { user: action.payload })

    default:
      return state;
  }
}

function authentication(state = authenticationState, action) { 
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

    case LOAD_SINGLE_USER: // <---- Like so
      return Object.assign({}, state, { user: action.payload });

    default: 
      return state;
  }
}

const savannahApp = combineReducers({
  itemReducer, 
  authentication,
})

export default savannahApp;
