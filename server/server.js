const express = require('express');
const passport = require('passport');
const localStrategy = require('passport-local');
const session = require('express-session');
const Redis = require('connect-redis')(session);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const auth = require('./routes/auth.js');
const users = require('./routes/users.js');
const items = require('./routes/items.js');
const itemImages = require('./routes/itemImages.js');
const userImages = require('./routes/userImages.js');
const threads = require('./routes/threads.js');
const categories = require('./routes/categories');
const carts = require('./routes/carts');
const checkout = require('./routes/checkout');

require('dotenv').config();

const User = require('./database/models/User');

const port = process.env.EXPRESS_CONTAINER_PORT;

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(express.static('public'));
app.use(
  session({
    store: new Redis({ url: process.env.REDIS_URL }), 
    secret: process.env.REDIS_SECRET, 
    resave: false, 
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new localStrategy(function(username, password, done) {
    return new User({ username: username })
      .fetch()
      .then((data) => {
        user = data.toJSON();

        if (user === null || user.active === false) {
          return done(null, false, { message: 'bad username or password' });
        } else {
          bcrypt.compare(password, user.password).then((res) => {
            if (res) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'bad username or password' });
            }
          });
        }
      })
      .catch((err) => {
        console.log('error:', err);
        return done(err);
      });
  }),
);

passport.serializeUser(function(user, done) {
  console.log('serializing');
  return done(null, { id: user.id, username: user.username });
});

passport.deserializeUser(function(user, done) {
  console.log('deserializing');

  return new User({ id: user.id }).fetch().then((user) => {
    user = user.toJSON();
    done(null, {
      id: user.id,
      role_id: user.role_id,
      active: user.active,
      theme_id: user.theme_id,
      username: user.username,
      name: user.name,
      email: user.email,
      profile_image_url: user.profile_image_url,
    });
  });
});

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/items', items);
app.use('/api/images/items', itemImages);
app.use('/api/images/users', userImages);
app.use('/api/threads', threads);
app.use('/api/categories', categories);
app.use('/api/carts', carts);
app.use('/api/checkout', checkout);

app.listen(port, () => {
  console.log('Server listening on Port ', port);
});
