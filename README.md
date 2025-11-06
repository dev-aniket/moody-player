Moodify — A Full-Stack, Microservice-Based Music Platform
Hey there! Welcome to the repository for Moodify, my passion project and a deep dive into building a scalable, real-world music streaming service from the ground up.

This wasn't just about building another Spotify clone. My goal was to build the architecture behind a platform like Spotify. This project is a complete, end-to-end system built with a MERN-stack (MongoDB, Express.js, React, Node.js) and designed around a microservice architecture.

It features everything from user and artist authentication, music/playlist management, secure file uploads to AWS S3, and even real-time listening synchronization across devices using Socket.io. This was a beast to build, and I'm incredibly proud of how it turned out.

Core Features
1. Authentication Service (auth-service)
This service handles everything related to users.

Dual Role System: Separate sign-up and login flows for "User" and "Artist" roles.

JWT Authentication: Secure, stateless authentication using JSON Web Tokens (JWT).

Google OAuth 2.0: "Continue with Google" for seamless, one-click user registration and login.

Secure Validation: Server-side validation using express-validator to ensure all data is sanitized and correct.

2. Music Service (music-service)
The heart of the platform, this service manages all music, artists, and playlists.

Artist Uploads: Artists can upload their own tracks (MP3) and cover art (JPG/PNG) directly to the platform.

AWS S3 Integration: All media files are uploaded securely from the server to a private Amazon S3 bucket.

Presigned URLs: No public files! All music and art is served to the frontend using secure, temporary presigned URLs from S3.

Playlist Creation: Users can create, update, and manage their own custom playlists.

3. Notification Service (notification-service)
A fully decoupled service built to handle all communications without blocking the main app.

Asynchronous Email: When a user registers, the auth-service publishes a message to a RabbitMQ queue.

Queue Consumer: The notification-service subscribes to this queue, consumes the message, and sends a beautiful "Welcome to Moodify" email using Nodemailer and the Gmail API. This means the user gets their email, and the registration request is lightning-fast.

4. Real-Time Sync Service (socket-service)
This is where the magic happens.

Socket.io: Using Socket.io, this service authenticates a user's WebSocket connection using their JWT.

Cross-Device Sync: When a user is logged in on multiple devices (like their phone and laptop) and hits "play" on one, the "play" event is broadcast only to their other authenticated devices. The music stays perfectly in sync, no matter where they are.

Technical Architecture
This project is built on a microservice architecture. The services are completely independent, containerized, and communicate through a combination of REST APIs (for synchronous requests) and a RabbitMQ message broker (for asynchronous events).

auth: Handles all user identity, roles, and tokens.

music: Manages all song metadata, artist info, playlists, and file uploads to S3.

notification: Listens to RabbitMQ queues (e.g., user_created) and sends emails.

socket: Manages all active WebSocket connections for real-time sync.

frontend: The React single-page application that the user interacts with.

Tech Stack & Tools
This project touches every part of the modern web stack.

Backend: Node.js, Express.js, Mongoose, JWT, Passport.js, bcryptjs

Frontend: React.js, React Router, Axios

Database: MongoDB (deployed on MongoDB Atlas)

Message Broker: RabbitMQ

Real-time: Socket.io

Cloud & DevOps:

AWS: S3 (for file storage), ECR (for Docker images), ECS Fargate (for container orchestration), ALB (for routing), VPC, IAM

Docker: Fully containerized services for development and production.

Email: Nodemailer (with Google OAuth)
