const express = require('express');
const passport = require('passport');
const localStrategy = require('passport-local');
const session = require('express-session');
const Redis = require('connect-redis')(session);
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); // for encrypting passwords in our database for data security.
require('dotenv').config();

const port = process.env.EXPRESS_CONTAINER_PORT;
const saltRounds = 12;

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({ // Configuration of session object.
  store: new Redis({url: process.env.REDIS_URL}), // url of redis server where session object is stored
  secret: process.env.REDIS_SECRET, // encryption password
  resave: false, // dont resave session on each access
  saveUninitialized: false // don't save session until it is used
}));
app.use(passport.initialize()); 
app.use(passport.session());

passport.use(
  new localStrategy(function(username, password, done) { // method of validating given data.
    console.log('Validating with localStrategy');
    
    return new User({ username: username })
    .fetch()
    .then((user) => {
      console.log('Attempting to login with ', user);

      if (user === null || user.active === false) {
        return done(null, false, { message: 'bad username or password' });
      } else {
        user = user.toJSON();
        bcrypt.compare(password, user.password)
        .then((res) => {
          if (res) { 
            // bycrypt returns boolean, that if true means user and password match with database entries.
            return done(null, user);
          } else {
            // error route. username exists, pw not matched
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
  console.log(user);

  return new User({ id: user.id }).fetch().then((user) => { 
    user = user.toJSON();
    done(null, {  // gets additional info. attatches this object to every request as req.user.
      id: user.id,
      role_id: user.role_id,
      active: user.active,
      theme_id: theme_id,
      username: user.username,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
    });
  });
});

app.post('/api/register', (req, res) => {

  console.log('/register post request, ', req.body);
  bcrypt.genSalt(saltRounds, (error, salt) => {
    if (error) { console.log('genSalt error ', error); } //return 500

    bcrypt.hash(req.body.password, salt, (error, hash) => {
      if (error) { console.log('hash error ', error); } //return 500

      return new User({ // If no errors were encountered salting and hashing the password then create a new model.
        
        role_id: 3, // Basic User
        active: true,
        theme_id: 1,
        username: req.body.username,
        profileImageUrl: user.profileImageUrl,
        name: req.body.name,
        email: req.body.email,
        password: hash,
      })
      .save() // Save model to database
      .then((newUser) => {
        return res.json(newUser); // Valid user data sends a response with no body.
      })
      .catch((error) => { 
        if (error.constraint === "users_username_unique"){ // identify what caused error during save attempt
          return res.json({ // create an object that only informs of error and doesnt expose database details
            // element : 'username',
            // errorMessage : 'username taken'
          });
        } else {
          console.log('error ', error);
          return res.json({ 
            // message: 'error' 
          });
        }
      });
    });
  });
});

app.post('/api/login', passport.authenticate('local'), (req, res) => { // req res function only happens if authenication suceeded
  // console.log(req.user);
  // window.localStorage.setItem('user', JSON.stringify(req.user));
  res.json(req.user); // successful login attaches the user property to the req.
});

app.post('/api/logout', (req, res) => {
  req.logout(); // if a user is logged in, req.logout will remove the user property from the req and terminate the session if there is one
  res.json(null);
});

app.listen(port, () => {
  console.log('Server listening on Port ', port);
})