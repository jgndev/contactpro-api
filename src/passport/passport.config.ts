const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
        },
        (accessToken: any, refreshToken: any, profile: any, done: any) => {
            // Here, you can handle the user's profile data returned from Google
            // and either create a new user or authenticate an existing user.
            // You can use the `done` callback to pass the user to the next middleware.
        }
    )
);
