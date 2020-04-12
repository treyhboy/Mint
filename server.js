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
const session = require('express-session');
const response = require('./utils-module/response');

//To locate the config folder by default it searches for .env here it is .env.example

//Sample ENV properties are loaded here in reallife scenario this would be populated by the environment property of machine running the app server

require('dotenv').config({path: process.cwd() + '/.env.example'});


app.use('/', express.static(__dirname + "/Public_static"));
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());


app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })); // session secret

//Passport Authentication Implementation

require('./config/passport.js');

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions



//Sign up Implementation



app.post('/signup',(req,res,next) => {
    passport.authenticate('local-signup', function (err,user,info) {

        if(err)
        {
            return response.responseWriter(res,500,info);
        }
        else if(!user)
        {
            return response.responseWriter(res,400,info);
        }
       else
       {
            return response.responseWriter(res, 200, user);
       }
        
    })(req,res,next);
});




//Login value is sent to 

app.post('/login',(req,res,next) => {
    passport.authenticate('local-signin', function (err,user,info) {

        if(err)
        {
            return response.responseWriter(res,500,info);
        }
        else if(!user)
        {
            return response.responseWriter(res,400,info);
        }
       else
       {
            return response.responseWriter(res, 200, user);
       }
        
    })(req,res,next);
});

app.use('/', require('./routes/index'));

app.listen(3100, function () {
    console.log("Server started on http://localhost:3100");
});
