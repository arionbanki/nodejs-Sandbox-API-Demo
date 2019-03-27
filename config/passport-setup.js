const passport = require('passport');
const OidcStrategy = require('passport-openidconnect').Strategy;
const OAuth2Strategy = require('passport-oauth2').Strategy;
const keys = require('./keys');
const host = "https://arionapi-identityserver3-sandbox.azurewebsites.net";

passport.use('oidc', new OidcStrategy({
  issuer: host,
  authorizationURL: host + '/connect/authorize',
  tokenURL: host + '/connect/token',
  userInfoURL: host + '/connect/userinfo',
  clientID: keys.arion.clientID,
  clientSecret: keys.arion.clientSecret,
  callbackURL: 'http://localhost:3000/auth/example/callback',
  scope: 'financial'
}, (issuer, sub, profile, accessToken, refreshToken, done) => {
  console.warn(accessToken);
  return done(null, profile);
}));

passport.use('oauth2', new OAuth2Strategy({
  authorizationURL: 'https://arionapi-identityserver3-sandbox.azurewebsites.net/connect/authorize',
  tokenURL: 'https://arionapi-identityserver3-sandbox.azurewebsites.net/connect/token',
  clientID: keys.arion.clientID,
  clientSecret: keys.arion.clientSecret,
  callbackURL: "http://localhost:3000/auth/example/callback",
  scope: "financial"
},
function(accessToken, refreshToken, results, profile, done) {
  console.warn(accessToken);
  return done(null, {
    accessToken: accessToken
  });
}
));

// serialize and deserialize
passport.serializeUser(function(user, cb) {
  console.log('serializeUser: ' + user._id);
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});