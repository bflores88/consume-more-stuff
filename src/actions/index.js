export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = (credentials) => {
  return (dispatch) => {
    // console.log('Actions login()');
    return fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type' : 'application/json' }
    })
    .then((response) => {
      // console.log('http response ', response);
      if (response.status === 401){
        return null;
      } else {
        return response.json();
      }
    })
    .then((user) => {
      // console.log('Actions login() user', user);
      localStorage.setItem('user', JSON.stringify(user));
      return dispatch({
        type: LOGIN,
        payload: user
      });
    });
  }
}

export const logout = (storedString) => {
  return (dispatch) => {
    // console.log('Actions logout()');
    return fetch('/api/auth/logout', {
      method: 'POST',
      body: storedString,
      headers: { 'Content-Type' : 'application/json' }
    })
    .then((response) => {
      // console.log('http response ', response);
      return response.json();
    })
    .then((body) => {
      // console.log('Actions login() user', user);
      localStorage.removeItem('user');
      return dispatch({
        type: LOGOUT,
        payload: body
      });
    });
  }
}