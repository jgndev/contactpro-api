// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').OAuth2Strategy;
import passport from "passport";
import {Profile, Strategy as GoogleStrategy, VerifyCallback} from "passport-google-oauth20";

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: process.env.GOOGLE_CLIENT_URL || '',
        scope: ['email', 'profile'],
    }, async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
        console.log(`Access Token: ${accessToken}`);
        console.log(`Refresh Token: ${refreshToken}`);
        console.log(profile);
        done(null, undefined);
    }
));
