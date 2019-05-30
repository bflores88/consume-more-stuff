// ACTION DEFINTION
export const LOAD_ITEMS = 'LOAD_ITEMS';
export const GRAB_ITEM_IMAGE = 'GRAB_ITEM_IMAGE';
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

// ACTION CREATOR
export const loadItems = () => {
  return (dispatch) => {
    return fetch('/api/items')
      .then((response) => {
        return response.json();
      })
      .then((items) => {
        console.log(items);
        return dispatch({
          type: LOAD_ITEMS,
          payload: items,
        });
      })
      .catch((err) => console.log('Cant access website' + err));
  };
};

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
    })
    .catch((error) => {
      console.log('Error in login: ', error);
    });
  }
}

export const logout = () => {
  return (dispatch) => {
    // console.log('Actions logout()');
    return fetch('/api/auth/logout', {
      method: 'GET',
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
    })
    .catch((error) => {
      console.log('Error in logout: ', error);
    })
  }
}