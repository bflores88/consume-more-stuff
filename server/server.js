const express = require('express');
const passport = require('passport');
const localStrategy = require('passport-local');
const session = require('express-session');
const Redis = require('connect-redis')(session);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); // for encrypting passwords in our database for data security.
const auth = require('./routes/auth.js');
const users = require('./routes/users.js');
const items = require('./routes/items.js');
const itemImages = require('./routes/itemImages.js');
const userImages = require('./routes/userImages.js');
const threads = require('./routes/threads.js');
const categories = require('./routes/categories');
const carts = require('./routes/carts');

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
    // Configuration of session object.
    store: new Redis({ url: process.env.REDIS_URL }), // url of redis server where session object is stored
    secret: process.env.REDIS_SECRET, // encryption password
    resave: false, // dont resave session on each access
    saveUninitialized: false, // don't save session until it is used
  }),
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new localStrategy(function(username, password, done) {
    // method of validating given data.
    console.log('Validating with localStrategy');

    return new User({ username: username })
      .fetch()
      .then((data) => {
        user = data.toJSON();

        if (user === null || user.active === false) {
          return done(null, false, { message: 'bad username or password' });
        } else {
          // console.log('password from credentials: ', password);
          // console.log('password from user model: ', user.password);

          bcrypt.compare(password, user.password).then((res) => {
            // console.log('bcrypt.compare() result, ', res);
            if (res) {
              // bycrypt returns boolean, that if true means user and password match with database entries.
              // console.log('good credentials');
              return done(null, user);
            } else {
              // error route. username exists, pw not matched
              // console.log('password bad');
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

// happens after local strategy is successfully done.
// serialize method tells passport to store session object in redis database
passport.serializeUser(function(user, done) {
  console.log('serializing');
  return done(null, { id: user.id, username: user.username }); //session object is second parameter
});

// will fire if session id/user (in session storage) + cookie (user's) && outside of public route
// called when user enteres any route, cookie comes in from browser and is compared session store.
passport.deserializeUser(function(user, done) {
  console.log('deserializing');
  // console.log(user);

  return new User({ id: user.id }).fetch().then((user) => {
    user = user.toJSON();
    done(null, {
      // gets additional info. attatches this object to every request as req.user.
      id: user.id,
      role_id: user.role_id,
      active: user.active,
      theme_id: user.theme_id,
      username: user.username,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
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

app.listen(port, () => {
  console.log('Server listening on Port ', port);
});
