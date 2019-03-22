const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;
const keys = require('./keys');

passport.use(new OAuth2Strategy({
    authorizationURL: 'https://arionapi-identityserver3-sandbox.azurewebsites.net/connect/authorize',
    tokenURL: 'https://arionapi-identityserver3-sandbox.azurewebsites.net/connect/token',
    clientID: keys.arion.clientID,
    clientSecret: keys.arion.clientSecret,
    callbackURL: "http://localhost:3000/auth/example/callback",
    scope: "financial"
  },
  function(accessToken) {
    console.warn(accessToken);
  }
));

// serialize and deserialize
passport.serializeUser(function(user, done) {
  console.log('serializeUser: ' + user._id);
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {

  var newUser = new User();
  newUser.username = id;

  console.log(newUser);
  done(null, newUser);
});

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  var newUser = new User();
  newUser.username = id;
  done(err, newUser);
});