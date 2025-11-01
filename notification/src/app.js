import express from 'express';
import sendEmail from './utils/email.js';

const app = express();

sendEmail("aniketmallick0007@gmail.com", "Test Email", "This is a test email from moodify", "<h1> This is a test email from Moodify</h1>")

export default app;