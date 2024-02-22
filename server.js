/**
 * @summary server use passport express mysql sequelize socket.io
 */
const express = require("express");

const app = express();
const bp = require("body-parser");
const passport = require("passport");
const async = require("async");
const session = require("express-session");
const { user } = require("./db");
const Investment = require("./db").investment;
const spending = require("./db").spendings;
const { reminder } = require("./db");
const response = require("./utils-module/response");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const constants = require("./config/constants.js");

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
    new GoogleStrategy(
        {
            clientID: "CLIENT_ID",
            clientSecret: "CLIENT_SECRET",
            callbackURL: `http://localhost:${
                constants.SERVER_PORT
            }/google/callback`
        },
        function(accessToken, refreshToken, profile, done) {
            user.findOne({ email: profile.email }).then(user => {
                if (!user) {
                    let newUser = {
                        username: profile.displayName,
                        email: profile.emails[0].value
                    };

                    // Creating a new user if not exist
                    user.create(newUser)
                        .then(user => {
                            return done(null, user);
                        })
                        .catch(error => {
                            return done(error, null);
                        });
                } else {
                    return done(null, user);
                }
            });
        }
    )
);

// To locate the config folder by default it searches for .env here it is .env.example

// Sample ENV properties are loaded here in reallife scenario this would be populated by the environment property of machine running the app server

require("dotenv").config({ path: `${process.cwd()}/.env.example` });

app.use("/", express.static(`${__dirname}/Public_static`));
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

app.use(
    session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
); // session secret

// Passport Authentication Implementation

require("./config/passport.js");

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

// Sign up Implementation

app.post("/signup", (req, res, next) => {
    passport.authenticate("local-signup", function(err, user, info) {
        if (err) {
            return response.responseWriter(
                res,
                constants.STATUS_CODE.INTERNAL_SERVER_ERROR,
                info
            );
        }
        if (!user) {
            return response.responseWriter(
                res,
                constants.STATUS_CODE.BAD_REQUEST,
                info
            );
        }

        return response.responseWriter(res, constants.STATUS_CODE.OK, user);
    })(req, res, next);
});

// Login value is sent to

app.post("/login", (req, res, next) => {
    passport.authenticate("local-signin", function(err, user, info) {
        if (err) {
            return response.responseWriter(
                res,
                constants.STATUS_CODE.INTERNAL_SERVER_ERROR,
                info
            );
        }
        if (!user) {
            return response.responseWriter(
                res,
                constants.STATUS_CODE.BAD_REQUEST,
                info
            );
        }

        return response.responseWriter(res, constants.STATUS_CODE.OK, user);
    })(req, res, next);
});

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get("/google", (req, res, next) => {
    passport.authenticate("google", { scope: ["profile", "email"] })(
        req,
        res,
        next
    );
});

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get(
    "/google/callback",
    (req, res, next) => {
        passport.authenticate("google", { failureRedirect: "/login" })(
            req,
            res,
            next
        );
    },
    function(req, res) {
        // Redirecting to /main URL after successful lgon
        res.redirect(`http://localhost:${constants.SERVER_PORT}/main.html `);
    }
);

app.use("/", require("./routes/index"));

app.listen(constants.PORT, function() {
    console.log(`Server started on http://localhost:${constants.SERVER_PORT}`);
});
