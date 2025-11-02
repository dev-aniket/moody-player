import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoute from '../src/routes/user.route.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from './confg/config.js';
import cors from 'cors';

const app = express();

app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
}))

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

app.use(passport.initialize());

passport.use(new GoogleStrategy({
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/api/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Here, you would typically find or create a user in your database
  // For this example, we'll just return the profile
  return done(null, profile);
}));



app.use('/api/auth', authRoute);

export default app;