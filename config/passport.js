//For Better Understanding of defined the all the induvidual Attributes Seperately


const passport = require('passport');
const LocalStatergy = require('passport-local').Strategy;
const User = require('../db').user;
const jwt = require('jsonwebtoken');



//Instead of typing request.body every time making use of load dash to ease the process

const _ = require('lodash');

//load bcrypt
const bCrypt = require('bcrypt-nodejs');

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

//To overide the default username and password field used by passport

const customFields = {
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback: true  //Send the entire request to the callback function
};


// Generate Hash function

let generateHash = function (password) {

    return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

};


//Added Async and Await for async calls
//Note : DB calls are blocking hence they have to implemented as async and await

async function callback (req,email,password,done) {


    console.log("Inside call back");
   

   await User.findOne({
        where: {
            email: email
        }
    }).then( async function (user) {

        if (user) {


            //Returning the request to the call back

            return done(null, false, {
                message: 'That email is already taken'
            });

        } else {

            let userPassword = generateHash(password);

            let data =

            {
                email: email,

                password: userPassword,

                firstname: req.body.firstname,

                lastname: req.body.lastname,

                mobile: req.body.mobile,

                username : req.body.username

            };


           await User.create(data).then(function (newUser, created) {

                if (!newUser) {

                    return done(true, false, { message : "Couldn't create user try again later "});

                }

                if (newUser) {
                    return done(null, generateSignedToken(_.pick(newUser,["username","email","id"])));

                }

            });

        }

    });

}

const statergy = new LocalStatergy(customFields,callback);

passport.use("local-signup",statergy);

let isValidPassword = function (userpass, password) {

    return bCrypt.compareSync(password, userpass);
}

//Function used to generate the 

let generateSignedToken = (user) => {

      const token =  jwt.sign(user,process.env.PRIVATE_KEY);
      user.token = token;
      return user;
}


//Nested Call Back for signin


passport.use("local-signin",new LocalStatergy(

    {
        usernameField : "email",
        passwordField : "password"
    },

    async function login(email,password,done) {

        await User.findOne({
            where: {
                email: email
            }
        }).then(function (user) {
    
            if (user) {

                if(!isValidPassword(user.password,password))
                {
                    return done(null,false,{message : "Invalid user name or password"});
                }
                //Return a signed JWT Token upon login which will be sent in the header for future request
                return done(null, generateSignedToken(_.pick(user,["username","email","id"]) , {
                        message: 'User is present'
                    }));
            
    
            } else { 
                return done(null,user);
            }
        }).catch(err => {

            return done(err,false, {
                message : err.message
            });

        });

    }));




