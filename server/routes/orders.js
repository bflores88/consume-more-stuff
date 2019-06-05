'use strict';

const express = require('express');
const router = express.Router();
const Transaction = require('../database/models/Transaction');
const Order = require('../database/models/Order');
const Item = require('../database/models/Item');
const CartedItem = require('../database/models/CartedItem');

// const knex = require('../database/knex.js');

router.route('/').post((req, res) => {
  new Transaction()
    .save({
      purchased_by: req.user.id,
      shipping_address_id: parseInt(req.body.shipping_address_id),
      payment_card_id: parseInt(req.body.payment_card_id),
    })
    .then((result) => {
      const orderList = req.body.orders;
      orderList.forEach((order) => {
        (order.transaction_id = result.attributes.id), (order.order_status_id = 1);
      });
      // return posted orders (next: fetch purchased items)
      return Order.collection(orderList).invokeThen('save');
    })
    .then(() => {
      const orderList = req.body.orders;
      let orderedItems = [];
      orderList.forEach((order) => {
        orderedItems.push(order.item_id);
      });
      // return purchased items (next: decrease inventory)
      return Item.where('id', 'IN', orderedItems)
        .orderBy('id', 'ASC')
        .fetchAll();
    })
    .then((result) => {
      const orderedItems = result.toJSON();
      const sortedOrders = req.body.orders.sort((a, b) => {
        return a.item_id - b.item_id;
      });

      let itemList = [];
      orderedItems.forEach((orderedItem, index) => {
        itemList.push({
          id: orderedItem.id,
          inventory: orderedItem.inventory - sortedOrders[index].quantity,
        });
      });
      // return updated inventories on purchased items (next: fetch user's cart)
      return Item.collection(itemList).invokeThen('save');
    })
    .then(() => {
      return CartedItem.where({ carted_by: req.user.id }).fetchAll();
      // return res.json(result);
    })
    .then((result) => {
      const userCart = result.toJSON();
      return CartedItem.collection(userCart).invokeThen('destroy');
    })
    .then(() => {
      return res.send('Order successfully submitted');
    });
});

module.exports = router;
