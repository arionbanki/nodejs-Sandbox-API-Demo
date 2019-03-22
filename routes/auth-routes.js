const router = require('express').Router();
const passport = require('passport');




// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// auth with oauth2

router.get('/arion',
  passport.authenticate('oauth2'));


router.get('/example/callback',
  passport.authenticate('oauth2', { failureRedirect: '/' }),
  function(req, res) {

    // Successful authentication, redirect home.
    res.redirect('/protected');
  });
 

module.exports = router;