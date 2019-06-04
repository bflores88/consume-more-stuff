// ACTION DEFINTION
export const REGISTER = 'REGISTER';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const LOAD_ITEMS = 'LOAD_ITEMS';
export const LOAD_ACTIVE_ITEMS = 'LOAD_ACTIVE_ITEMS';
export const LOAD_INACTIVE_ITEMS = 'LOAD_INACTIVE_ITEMS';
export const GRAB_ITEM_IMAGE = 'GRAB_ITEM_IMAGE';
export const LOAD_SPECIFIC_ITEM = 'LOAD_SPECIFIC_ITEM';
export const GRAB_ITEM_IMAGES = 'GRAB_ITEM_IMAGE';
export const ADD_IMAGE = 'ADD_IMAGE';
export const ADD_ITEM = 'ADD_ITEM';
export const RESET_NEW_ITEM = 'RESET_NEW_ITEM';
export const INCREMENT_ITEM_VIEWS = 'INCREMENT_ITEM_VIEWS';
export const LOAD_ITEMS_BY_CATEGORY = 'LOAD_ITEMS_BY_CATEGORY';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

export const GRAB_USER_THREADS = 'GRAB_USER_THREADS';
export const GRAB_THREAD_MESSAGES = 'GRAB_THREADS_MESSAGES';
export const POST_NEW_MESSAGE = 'POST_NEW_MESSAGE';
export const GRAB_ALL_USERS = 'GRAB_ALL_USERS';
export const GRAB_USERNAME = 'GRAB_USERNAME';
export const LOAD_SINGLE_USER = 'LOAD_SINGLE_USER';
export const UPDATE_USER_PASSWORD = 'UPDATE_USER_PASSWORD';

export const UPDATE_CHOSEN_CATEGORY = 'UPDATE_CHOSEN_CATEGORY';
export const UPDATE_CHOSEN_SUBCATEGORY = 'UPDATE_CHOSEN_SUBCATEGORY';
export const EDIT_ITEM = 'EDIT_ITEM';

// ACTION CREATOR
export const loadItems = () => {
  return (dispatch) => {
    return fetch('/api/items')
      .then((response) => {
        return response.json();
      })
      .then((items) => {
        return dispatch({
          type: LOAD_ITEMS,
          payload: items,
        });
      })
      .catch((err) => console.log('Cant access website' + err));
  };
};

export const editItem = (id, data) => {
  return (dispatch) => {
    return fetch(`/api/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })

      .then((data) => {
        console.log('data', data);
        // return dispatch({
        //   type: EDIT_ITEM,
        //   payload: data,
        // });
      })
      .catch((error) => {
        console.log('Error in logout: ', error);
      });
  };
};

export const updateChosenCategory = (category) => {
  return (dispatch) => {
    console.log('action update', category);
    return dispatch({
      type: UPDATE_CHOSEN_CATEGORY,
      payload: category,
    });
  };
};

export const updateChosenSubCategory = (category) => {
  return (dispatch) => {
    console.log('action update sub', category);
    return dispatch({
      type: UPDATE_CHOSEN_SUBCATEGORY,
      payload: category,
    });
  };
};

export const grabAllUsers = () => {
  return (dispatch) => {
    return fetch('/api/users/all')
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        return dispatch({
          type: GRAB_ALL_USERS,
          payload: users,
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
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('data', data);
        return dispatch({
          type: ADD_ITEM,
          payload: data,
        });
      })
      .catch((error) => {
        console.log('Error in logout: ', error);
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

export const setExistingUser = (data) => {
  console.log('setExistingUser data');
  return (dispatch) => {
    return dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  };
};

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
        if (response.status === 200) {
          return response.json();
        } else {
          return { error: 'Bad Username or Password. Try again!' };
        }
      })
      .then((body) => {
        if (body.error) {
          // console.log('3 - Actions login() error ', body);
          return dispatch({
            type: LOGIN_FAILURE,
            payload: body,
          });
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
          };
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
  console.log('logout action');
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
        localStorage.removeItem('user');
        return dispatch({
          type: LOGOUT_SUCCESS,
        });
      })
      .catch((error) => {
        console.log('Error in logout: ', error);
        return dispatch({
          type: LOGOUT_FAILURE,
        });
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
};

export const loadActiveItems = (userID) => {
  return (dispatch) => {
    console.log(userID);
    return fetch(`/api/users/items/${userID}/active`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((items) => {
        console.log(items);
        return dispatch({
          type: LOAD_ACTIVE_ITEMS,
          payload: items,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

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
        console.log(items);
        return dispatch({
          type: LOAD_INACTIVE_ITEMS,
          payload: items,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const grabUsername = (userID) => {
  return (dispatch) => {
    return fetch(`/api/users/${userID}/username`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((username) => {
        return dispatch({
          type: GRAB_USERNAME,
          payload: username,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
