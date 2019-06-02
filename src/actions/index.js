// ACTION DEFINTION
export const REGISTER = "REGISTER";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";


export const LOAD_ITEMS = 'LOAD_ITEMS';
export const GRAB_ITEM_IMAGE = 'GRAB_ITEM_IMAGE';
export const LOAD_SPECIFIC_ITEM = 'LOAD_SPECIFIC_ITEM';

export const GRAB_ITEM_IMAGES = 'GRAB_ITEM_IMAGE';
export const ADD_IMAGE = 'ADD_IMAGE';

export const ADD_ITEM = 'ADD_ITEM';
export const RESET_NEW_ITEM = 'RESET_NEW_ITEM';

export const LOAD_SINGLE_USER = 'LOAD_SINGLE_USER';

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

export const loadSpecificItem = (id) => {
  return (dispatch) => {
    return fetch(`/api/items/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((item) => {
        return dispatch({
          type: LOAD_SPECIFIC_ITEM,
          payload: item,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const grabItemImages = () => {
  return (dispatch) => {
    return fetch(`/api/images/items`)
      .then((response) => {
        return response.json();
      })
      .then((items) => {
        return dispatch({
          type: GRAB_ITEM_IMAGES,
          payload: items,
        });
      })
      .catch((err) => console.log('Cant access website' + err));
  };
};





export const addItem = (data) => {
  return (dispatch) => {
    return fetch('/api/items', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => {
      console.log('Error in logout: ', error);
    })
  }
}

export const addImage = (id, data) => {
  console.log('actiomndata', data);
  console.log('id', id);
  let formData = new FormData();
  formData.append('image', data);
  return (dispatch) => {
    return (
      fetch(`/api/images/items/upload/${id}`, {
        method: 'POST',
        body: formData,
        // headers: {
        //   'Content-Type': 'application/json',
        // },
      })
        .then((response) => {
          return response.json();
        })
        // .then((item) => {
        //   return dispatch({
        //     type: ADD_IMAGE,
        //     payload: item,
        //   });
        // })
        .catch((err) => {
          console.log('error in image', err);
        })
    );
  };
};

export const resetNewItem = () => {
  // console.log(input);
  // return {
  //   type: SHOW_NEW_CARD,
  //   payload: !input,
  // };
  return (dispatch) => {
    dispatch({
      type: RESET_NEW_ITEM,
      payload: '',
    });
  };
};

export const loadSingleUser = (userID) => {
  return (dispatch) => {
    return fetch(`/api/users/${userID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        return dispatch({
          type: LOAD_SINGLE_USER,
          payload: user,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}







export const register = (accountData) => {
  return (dispatch) => {
     return fetch('api/auth/register', {
      method: 'POST',
      body: JSON.stringify(accountData),
      headers: { 'Content-Type' : 'application/json' }
    })
    .then((response) => {
      return response.json();
    })
    .then((body) => {
      return dispatch({
        type: REGISTER,
        payload: body,
      })
    })
    .catch((error) => {
      console.log('Error in registration: ', error);
    })
  }
}

export const login = (credentials) => {
  return (dispatch) => {
    // console.log('1 - Actions login()');
    return fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => {
      // console.log('2 - Actions login() response', response);
      if (response.status === 200){
        return response.json();
      } else {
        return { error : 'Bad Username or Password. Try again!' }
      }
    })
    .then((body) => { 
      if (body.error){ 
        // console.log('3 - Actions login() error ', body);
        return dispatch ({
          type: LOGIN_FAILURE, 
          payload: body
        })
      } else {
        // console.log('3 - Actions login() ok ', body);
        let userObj = {
          username: body.username,
          id: body.id,
          active: body.active,
          role_id: body.role_id,
          theme_id: body.theme_id,
          name: body.name,
          profileImageUrl: body.profileImageUrl,
          email: body.email,
        }
        localStorage.setItem('user', JSON.stringify(userObj));
        return dispatch({
          type: LOGIN_SUCCESS, 
          payload: userObj,
        });
      }
    })
    .catch((error) => {
      console.log('Error in login: ', error);
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    return fetch('/api/auth/logout', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then(() => {
      return dispatch({
        type: LOGOUT_SUCCESS,
      })
    })
    .catch((error) => {
      console.log('Error in logout: ', error);
      return dispatch({
        type: LOGOUT_FAILURE,
      })
    });
  };
};