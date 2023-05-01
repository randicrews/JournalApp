module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // app.get('/styles.css', (req, res) => {
    //   res.sendFile(__dirname + '/public/styles.css');
    // })

    

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('entries').find({user: req.user.local.email}).toArray((err, result) => {
          if (err) return console.log(err)
          res.render('profile.ejs', {
            user : req.user,
            entries: ''
          })
        })
    });
    app.get('/entries', isLoggedIn, function(req, res) {
      db.collection('entries').find({user: req.user.local.email}).toArray((err, result) => {
        if (err) return console.log(err)
        res.render('entries.ejs', {
          user : req.user,
          entries: result
        })
      })
  });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout(() => {
          console.log('User has logged out!')
        });
        res.redirect('/');
    });

// interact with movies ===============================================================

    app.post('/entry/new', (req, res) => {
      db.collection('users').find({user: req.user.local.email}, (err, result) =>{
        if (err) return console.log(err)
        //if it is
        if (result) {
          db.collection('entries').insertOne({user: req.user.local.email, password:req.user.local.password, date: req.body.date, inspo: req.body.inspo, title: req.body.title, body: req.body.body}, (err, result) => {
            if (err) return console.log(err)
          console.log(req.body)
          res.redirect('/profile')
        })
        //if it's a new word
      }
      })
    })

    // app.get('/entries/', (req, res) => {
    //   db.collection('entries').find({user: req.user.local.user}).toArray((err, result) => {
    //     if (err) return console.log(err)
    //     res.render('profile.ejs', {
    //       user : req.user,
    //       myEntries: res,
    //     })
    //   })
    // })

 

    // app.delete('/movies', (req, res) => {
    //   db.collection('movies').findOneAndDelete({user: req.user.local.email, movie: req.body.movie}, (err, result) => {
    //     if (err) return res.send(500, err)
    //     res.send('Message deleted!')
    //   })
    // })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash movies
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash movies
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
