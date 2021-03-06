var User     = require('../app/models/user');
module.exports = function(app, passport) {

    // route for home page
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });
    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
     app.get('/generalInfo', function(req, res) {
        //req.logout();
        res.render('generalInfo.ejs');
    });
    app.get('/bookingInfo', function(req, res) {
        //req.logout();
        res.render('bookingInfo.ejs');
    });

   app.post("/addRequirements", (req, res) => {
  var newUser = new User(req.body);
 newUser.openingHour = req.body.openingHour;
 newUser.closingHour = req.body.closingHour;
 newUser.closingHour = req.body.closingHour;
newUser.day=req.body.closingHour;
newUser.MaximumPerson=req.body.MaximumPerson;

  newUser.save()
    .then(item => {
      res.render('thanks.ejs');
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
