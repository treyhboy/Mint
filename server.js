/**
 * @summary server use passport express mysql sequelize socket.io
 */
const express = require('express');
const app = express();
const bp = require('body-parser');
const user = require('./db').user;
const Investment = require('./db').investment;
const spending = require('./db').spendings;
const reminder = require('./db').reminder;
const passport = require('passport');
const session = require('express-session')

require('./Public_static/js/passport.js')(passport, user);

app.use('/', express.static(__dirname + "/Public_static"))
app.use(bp.urlencoded({ extended: true }))
app.use(bp.json())

//Passport Authentication Implementation
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

// app.post('/signup',(req,res) => {
//     user.create({
//         name:req.body.fname+req.body.lname,
//         mob:req.body.mob,
//         username:req.body.em,
//         pass:req.body.pass
//         }).then(function () {
//             res.send({success:true})
//         }).catch(function(err)
//         {
//             throw err;
//         });
// });

app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
}

));


// app.post('/login',(req,res)=> {
//     user.findAll({where: {username: req.body.user, pass: req.body.pass}}).then(
//         function (db) {
//             if(db[0]) {
//                 console.log('found')
//                 res.send({status: 'found',name:db[0].name})
//             }else {
//                 console.log('not');
//                 res.send({status: 'not found'})

//             }
//         }).catch(function (err) {
//         console.log('err');
//             res.send(err)
//     })
// });

app.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}

));

app.use('/', require('./routes/index'));

app.listen(3100, function () {
    console.log("Server started on http://localhost:3100");
});
