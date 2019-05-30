'use strict';

// ACTION DEFINTION

export const LOAD_ITEMS = 'LOAD_ITEMS';
export const GRAB_ITEM_IMAGES = 'GRAB_ITEM_IMAGE';

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

export const grabItemImages = () => {
  return (dispatch) => {
    return fetch(`/api/images`)
      .then((response) => {
        return response.json();
      })
      .then((items) => {
        console.log(items);
        return dispatch({
          type: GRAB_ITEM_IMAGES,
          payload: items,
        });
      })
      .catch((err) => console.log('Cant access website' + err));
  };
};
