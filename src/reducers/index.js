import { combineReducers } from 'redux';
import { LOAD_ITEMS, LOAD_SINGLE_USER } from '../actions';

import { LOAD_SPECIFIC_ITEM } from '../actions';

import { GRAB_ITEM_IMAGES } from '../actions';

import { ADD_ITEM } from '../actions';

import { RESET_NEW_ITEM } from '../actions';

import { REGISTER, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT} from '../actions';

import { LOGIN } from '../actions'; // delete
/*
Store is a mess. Have duplicate values, multiple user values so to avoid errors and support a single source
of truth if you need to refer to the user then use state.authorization. Authorization includes user and loggedIn.

These reducer functions return objects that become properties of the global state, named after the name of their
functions and with values of objects. Therefore a clean global state should look like

global state ---> itemReducer ---> item: {}, items: [], images: [], newestItem: []
             ---> authentication ---> user: {} loggedIn: boolean

Also suggest changing the name of itemReducer to something more like 'items'. Therefore the state of the app
reads state.items or state.authorization.
*/


const initialState = {
  // currentUser: JSON.parse(localStorage.getItem('user')),
  item: {},
  items: [],
  images: [],
  
  loggedIn: false, // Remove
  user: {}, // Remove
  newestItem: '',
};

// Use from now on.
const authenticationState = {
  registrationSuccessful: true, 
  loggedIn: false,
  user: null,
}

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
    
    case LOAD_SINGLE_USER:
      return Object.assign({}, state, { user: action.payload })

    default:
      return state;
  }
}

function authentication(state = authenticationState, action) { 
  switch (action.type) {
    case REGISTER:
      return Object.assign({}, state, { registrationSuccessful: true });
    case LOGIN_FAILURE:
      // console.log('4 - Auth Reducer Login Fail');
      return Object.assign({}, state, { loggedIn: false, user: null});
    case LOGIN_SUCCESS:
      // console.log('4 - Auth Reducer Login Success');
      return Object.assign({}, state, { loggedIn: true, user: action.payload});
    default: 
      return state;
  }
}

const savannahApp = combineReducers({
  itemReducer,
  authentication,
})

export default savannahApp;
