// ACTION DEFINTION
export const REGISTER = 'REGISTER';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const SEARCH_ITEMS = 'SEARCH_ITEMS';
export const LOAD_ITEMS = 'LOAD_ITEMS';
export const LOAD_ALL_ACTIVE_ITEMS = 'LOAD_ALL_ACTIVE_ITEMS';
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
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const ADD_SUBCATEGORY = 'ADD_SUBCATEGORY';

export const GRAB_USER_THREADS = 'GRAB_USER_THREADS';
export const GRAB_THREAD_MESSAGES = 'GRAB_THREADS_MESSAGES';
export const POST_NEW_MESSAGE = 'POST_NEW_MESSAGE';
export const GRAB_ALL_USERS = 'GRAB_ALL_USERS';
export const GRAB_USERNAME = 'GRAB_USERNAME';
export const LOAD_SINGLE_USER = 'LOAD_SINGLE_USER';
export const UPDATE_USER_PASSWORD = 'UPDATE_USER_PASSWORD';
export const UPDATE_USER = 'UPDATE_USER';
export const DEACTIVATE_USER = 'DEACTIVATE_USER';

export const UPDATE_CHOSEN_CATEGORY = 'UPDATE_CHOSEN_CATEGORY';
export const UPDATE_CHOSEN_SUBCATEGORY = 'UPDATE_CHOSEN_SUBCATEGORY';
export const EDIT_ITEM = 'EDIT_ITEM';
export const ADD_THREAD = 'ADD_THREAD';
export const GRAB_USER_CART = 'GRAB_USER_CART';
export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const DELETE_ITEM_FROM_CART = 'DELETE_ITEM_FROM_CART';
export const GRAB_SHIPPING = 'GRAB_SHIPPING';
export const GRAB_PAYMENTS = 'GRAB_PAYMENTS';
export const GRAB_SHIPPING_PRIMARY = 'GRAB_SHIPPING_PRIMARY';
export const GRAB_USER_SALES = 'GRAB_USER_SALES';
export const GRAB_USER_ORDERS = 'GRAB_USER_ORDERS';

export const UPDATE_PRIMARY_ADDRESS = 'UPDATE_PRIMARY_ADDRESS';
export const UPDATE_PRIMARY_PAYMENT = 'UPDATE_PRIMARY_PAYMENT';
export const REMOVE_ADDRESS = 'REMOVE_ADDRESS';
export const ADD_ADDRESS = 'ADD_ADDRESS';

export const ADMIN_USER_EDIT = 'ADMIN_USER_EDIT';
export const ADMIN_ITEM_EDIT = 'ADMIN_ITEM_EDIT';
export const POST_NEW_ORDER = 'POST_NEW_ORDER';
export const UPDATE_SHIPPING_STATUS = 'UPDATE_SHIPPING_STATUS';

export const GRAB_STATES = 'GRAB_STATES';

// ACTION CREATOR
export const searchItems = (searchTerm) => {
  return (dispatch) => {
    return fetch('/api/items/search/' + searchTerm)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return dispatch({
          type: SEARCH_ITEMS,
          payload: data,
        });
      })
      .catch((error) => {
        return { error: error };
      });
  };
};

export const updateShippingStatus = (id) => {
  return (dispatch) => {
    return (
      fetch(`/api/orderStatuses/shipped/${id}`, {
        method: 'PUT',
        // body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        // .then((response) => {
        //   return (dispatch) => {
        //     dispatch({
        //       type: ADD_ITEM_TO_CART,
        //       payload: response,
        //     });
        //   };
        // })
        .catch((error) => {
          console.log('Error in logout: ', error);
        })
    );
  };
};

export const grabUserSales = () => {
  return (dispatch) => {
    return fetch(`/api/orders/sales`)
      .then((response) => {
        return response.json();
      })
      .then((sales) => {
        // console.log('sales', sales);
        return dispatch({
          type: GRAB_USER_SALES,
          payload: sales,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const grabUserOrders = () => {
  return (dispatch) => {
    return fetch(`/api/orders/purchases`)
      .then((response) => {
        return response.json();
      })
      .then((orders) => {
        // console.log('orders', orders);
        return dispatch({
          type: GRAB_USER_ORDERS,
          payload: orders,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

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

export const postNewOrder = (data) => {
  return (dispatch) => {
    return (
      fetch(`/api/orders`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        // .then((response) => {
        //   return (dispatch) => {
        //     dispatch({
        //       type: ADD_ITEM_TO_CART,
        //       payload: response,
        //     });
        //   };
        // })
        .catch((error) => {
          console.log('Error in logout: ', error);
        })
    );
  };
};

export const grabShipping = () => {
  return (dispatch) => {
    return fetch(`/api/shipping`)
      .then((response) => {
        return response.json();
      })
      .then((shipping) => {
        console.log('action returns shipping', shipping);
        return dispatch({
          type: GRAB_SHIPPING,
          payload: shipping,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const grabShippingPrimary = () => {
  return (dispatch) => {
    return fetch(`/api/shipping`)
      .then((response) => {
        return response.json();
      })
      .then((shipping) => {
        // console.log('shipping', shipping);
        let primary = shipping.filter((address) => address.primary === true);
        return dispatch({
          type: GRAB_SHIPPING_PRIMARY,
          payload: primary,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const grabPayments = () => {
  return (dispatch) => {
    return fetch(`/api/payments`)
      .then((response) => {
        return response.json();
      })
      .then((payments) => {
        console.log('payments', payments);
        return dispatch({
          type: GRAB_PAYMENTS,
          payload: payments,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updatePrimaryPayment = (pmtId) => {
  return (dispatch) => {
    return fetch(`/api/payments/${pmtId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((pmt) => {
        return dispatch({
          type: UPDATE_PRIMARY_PAYMENT,
          payload: pmt,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updatePrimaryAdress = (addressId) => {
  return (dispatch) => {
    return fetch(`/api/shipping/${addressId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((address) => {
        return dispatch({
          type: UPDATE_PRIMARY_ADDRESS,
          payload: address,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addAddress = (data) => {
  return (dispatch) => {
    return fetch('/api/shipping', {
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
        console.log(data);
        return dispatch({
          type: ADD_ADDRESS,
          payload: data,
        });
      })
      .catch((error) => {
        console.log('Error in logout: ', error);
      });
  };
};

export const removeAddress = (addressId) => {
  console.log('action id', addressId);
  return (dispatch) => {
    return fetch(`/api/shipping/${addressId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.group('action repsonse', response);
        return response.json();
      })
      .then((address) => {
        console.log('****', address);
        return dispatch({
          type: REMOVE_ADDRESS,
          payload: address,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteItemFromCart = (id) => {
  return (dispatch) => {
    // console.log('action data',);
    return fetch(`/api/carts/${id}`, {
      method: 'DELETE',
      // body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return (dispatch) => {
          dispatch({
            type: DELETE_ITEM_FROM_CART,
            payload: response,
          });
        };
      })
      .catch((error) => {
        console.log('Error in logout: ', error);
      });
  };
};

export const addItemToCart = (data) => {
  return (dispatch) => {
    return (
      fetch(`/api/carts`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        // .then((response) => {
        //   return (dispatch) => {
        //     dispatch({
        //       type: ADD_ITEM_TO_CART,
        //       payload: response,
        //     });
        //   };
        // })
        .catch((error) => {
          console.log('Error in logout: ', error);
        })
    );
  };
};

export const grabUserCart = () => {
  return (dispatch) => {
    return fetch(`/api/carts`)
      .then((response) => {
        return response.json();
      })
      .then((item) => {
        return dispatch({
          type: GRAB_USER_CART,
          payload: item,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addThread = (data) => {
  return (dispatch) => {
    return (
      fetch(`/api/threads`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        // .then((response) => {
        //   return (dispatch) => {
        //     dispatch({
        //       type: ADD_THREAD,
        //       payload: response,
        //     });
        //   };
        // })
        .catch((error) => {
          console.log('Error in logout: ', error);
        })
    );
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
        console.log(data);
      });
  };
};

export const loadAllActiveItems = () => {
  return (dispatch) => {
    return fetch('/api/items/active')
      .then((response) => {
        return response.json();
      })
      .then((items) => {
        return dispatch({
          type: LOAD_ALL_ACTIVE_ITEMS,
          payload: items,
        });
      })
      .catch((err) => console.log('Cant access website' + err));
  };
};

export const updateChosenCategory = (category) => {
  return (dispatch) => {
    return dispatch({
      type: UPDATE_CHOSEN_CATEGORY,
      payload: category,
    });
  };
};

export const updateChosenSubCategory = (category) => {
  return (dispatch) => {
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
        return dispatch({
          type: GRAB_USER_THREADS,
          payload: threads,
        });
      })
      .catch((err) => console.log('Cant access website' + err));
  };
};

export const updateUser = (data) => {
  return (dispatch) => {
    return fetch('/api/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        return dispatch({
          type: UPDATE_USER,
          payload: body,
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const deactivateUser = () => {
  const data = { active: false };
  return (dispatch) => {
    return fetch('/api/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        return dispatch({
          type: DEACTIVATE_USER,
          payload: body,
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
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
        console.log(data);
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
  return (dispatch) => {
    return dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  };
};

export const login = (credentials) => {
  return (dispatch) => {
    return fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return { error: 'Bad Username or Password. Try again!' };
        }
      })
      .then((body) => {
        if (body.error) {
          return dispatch({
            type: LOGIN_FAILURE,
            payload: body,
          });
        } else {
          let userObj = {
            username: body.username,
            id: body.id,
            active: body.active,
            role_id: body.role_id,
            theme_id: body.theme_id,
            name: body.name,
            profile_image_url: body.profile_image_url,
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
  return (dispatch) => {
    return fetch('/api/auth/logout', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        return response.json();
      })
      .then(() => {
        localStorage.removeItem('user');
        return dispatch({
          type: LOGOUT_SUCCESS,
        });
      })
      .catch((error) => {
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

export const adminUserEdit = (data) => {
  return (dispatch) => {
    return fetch('/api/users/admin', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        return dispatch({
          type: ADMIN_USER_EDIT,
          payload: body,
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const adminItemEdit = (data) => {
  return (dispatch) => {
    return fetch('/api/items/admin', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        return dispatch({
          type: ADMIN_ITEM_EDIT,
          payload: body,
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const addCategory = (data) => {
  return (dispatch) => {
    return fetch('/api/categories', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        return dispatch({
          type: ADD_CATEGORY,
          payload: body,
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const addSubcategory = (data) => {
  return (dispatch) => {
    return fetch('/api/categories/subcategories', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        return dispatch({
          type: ADD_SUBCATEGORY,
          payload: body,
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const grabStates = () => {
  return (dispatch) => {
    return fetch(`/api/states`)
      .then((response) => {
        return response.json();
      })
      .then((states) => {
        console.log('states', states);
        return dispatch({
          type: GRAB_STATES,
          payload: states,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
