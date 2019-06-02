// ACTION DEFINTION
export const LOAD_ITEMS = 'LOAD_ITEMS';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const GRAB_ITEM_IMAGE = 'GRAB_ITEM_IMAGE';
export const LOAD_SPECIFIC_ITEM = 'LOAD_SPECIFIC_ITEM';
export const GRAB_ITEM_IMAGES = 'GRAB_ITEM_IMAGE';
export const ADD_IMAGE = 'ADD_IMAGE';
export const ADD_ITEM = 'ADD_ITEM';
export const RESET_NEW_ITEM = 'RESET_NEW_ITEM';
export const INCREMENT_ITEM_VIEWS = 'INCREMENT_ITEM_VIEWS';
export const LOAD_SINGLE_USER = 'LOAD_SINGLE_USER';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_ITEMS_BY_CATEGORY = "LOAD_ITEMS_BY_CATEGORY";
export const UPDATE_USER_PASSWORD = "UPDATE_USER_PASSWORD";
export const LOAD_INACTIVE_ITEMS = "LOAD_INACTIVE_ITEMS";
export const LOAD_ITEMS_BY_CATEGORY = 'LOAD_ITEMS_BY_CATEGORY';
export const UPDATE_USER_PASSWORD = 'UPDATE_USER_PASSWORD';
export const GRAB_USER_THREADS = 'GRAB_USER_THREADS';
export const GRAB_THREAD_MESSAGES = 'GRAB_THREADS_MESSAGES';
export const POST_NEW_MESSAGE = 'POST_NEW_MESSAGE';

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

export const postNewMessage = (data, threadID) => {
  return (dispatch) => {
    return fetch(`/api/threads/${threadID}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return (dispatch) => {
          dispatch({
            type: POST_NEW_MESSAGE,
            payload: response,
          });
        };
      })
      .catch((error) => {
        console.log('Error in logout: ', error);
      });
  };
};

export const grabThreadMessages = (threadId) => {
  return (dispatch) => {
    return fetch(`/api/threads/${threadId}`)
      .then((response) => {
        return response.json();
      })
      .then((messages) => {
        // console.log(messages);

        return dispatch({
          type: GRAB_THREAD_MESSAGES,
          payload: messages,
        });
      })
      .catch((err) => console.log('Cant access website' + err));
  };
};

export const grabUserThreads = () => {
  return (dispatch) => {
    return fetch('/api/threads')
      .then((response) => {
        return response.json();
      })
      .then((threads) => {
        console.log(threads);

        return dispatch({
          type: GRAB_USER_THREADS,
          payload: threads,
        });
      })
      .catch((err) => console.log('Cant access website' + err));
  };
};

export const loadSpecificItem = (id) => {
  return (dispatch) => {
    return fetch(`/api/items/${id}`)
      .then((response) => {
        console.log('action', response);
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

export const login = (credentials) => {
  return (dispatch) => {
    // console.log('Actions login()');
    return fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        // console.log('http response ', response);
        if (response.status === 401) {
          return null;
        } else {
          return response.json();
        }
      })
      .then((user) => {
        // console.log('Actions login() user', user);
        let userJSON = JSON.stringify(user);
        // console.log('USERJSON', userJSON);
        let userObj = {
          username: user.username,
          id: user.id,
          active: user.active,
          role_id: user.role_id,
          theme_id: user.theme_id,
          name: user.name,
          profileImageUrl: user.profileImageUrl,
          email: user.email,
        };
        console.log('USEROBJ', userObj);
        localStorage.setItem('user', JSON.stringify(userObj));
        return dispatch({
          type: LOGIN,
          payload: userObj,
        });
      })
      .catch((error) => {
        console.log('Error in login: ', error);
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    // console.log('Actions logout()');
    return fetch('/api/auth/logout', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
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
          payload: body,
        });
      })
      .catch((error) => {
        console.log('Error in logout: ', error);
      });
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
    }).catch((error) => {
      console.log('Error in logout: ', error);
    });
  };
};

export const register = (accountData) => {
  return (dispatch) => {
    return fetch('api/auth/register', {
      method: 'POST',
      body: JSON.stringify(accountData),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        return dispatch({
          type: REGISTER,
          payload: body,
        });
      })
      .catch((error) => {
        console.log('Error in registration: ', error);
      });
  };
};

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

export const incrementViews = (id) => {
  return () => {
    return fetch(`/api/items/${id}/views`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
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
};

export const loadCategories = () => {
  return (dispatch) => {
    return fetch(`/api/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((categories) => {
        return dispatch({
          type: LOAD_CATEGORIES,
          payload: categories,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const loadItemsByCategory = (category) => {
  return (dispatch) => {
    return fetch(`/api/categories/${category}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((items) => {
        return dispatch({
          type: LOAD_ITEMS_BY_CATEGORY,
          payload: items,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updatePassword = (data) => {
  return (dispatch) => {
    return fetch('/api/users/password', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        return dispatch({
          type: UPDATE_USER_PASSWORD,
          payload: body,
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
}

export const loadInactiveItems = (userID) => {
  return (dispatch) => {
    console.log(userID);
    return fetch(`/api/users/items/${userID}/inactive`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((items) => {
        console.log(items)
        return dispatch({
          type: LOAD_INACTIVE_ITEMS,
          payload: items,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
