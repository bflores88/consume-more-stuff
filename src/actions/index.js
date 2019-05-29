'use strict';

export const LOGIN = "LOGIN";

export const login = (credentials) => {
  return (dispatch) => {
    return fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type' : 'application/json' }
    })
    .then((response) => {
      console.log('http response ', response);
      return response.json();
    })
    .then((body) => {
      return dispatch({
        type: LOGIN,
        payload: body
      });
    });
  }
}