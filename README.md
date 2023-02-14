</br>
<p align="center">
<img width='800' src='https://i.imgur.com/pDTzZ5U.jpg'></img>
</p>

<div align="center">
  
[![see live](https://img.shields.io/badge/SEE%20LIVE-8C7225?style=for-the-badge&logo=github)](https://laynesquare.github.io/share_your_memories)
 
#### -- Slow loading will occur because the back-end server is deployed on a free hosting service --

</div>
  
<br/>

## Overview

#### Project Purpose

- Create a platform where people could share treasured memories in their lives with anyone out there throughout the globe.

#### Feature Highlight

- Each user can register a whole new account to enable full functionality coming with the application, or just simply log in via Google Oauth 2.0 to enjoy full access.

- With the account, you can create, delete, edit your posts, and bookmark, comment on, or give a thumbs-up to other users' posts.

- Each post delivers Youtube video recommendations based on respective content. You can venture around further if any posts pique your interest.

<br/>

## Tech Stack

- Language:<br/>

  ![Javascript](https://img.shields.io/badge/Javascript-8C7225?style=for-the-badge)
  ![HTML](https://img.shields.io/badge/HTML-8C7225?style=for-the-badge)
  ![CSS](https://img.shields.io/badge/CSS-8C7225?style=for-the-badge)

- Frontend: <br/>

  ![React (hooks)](<https://img.shields.io/badge/React%20(Hooks)-8C7225?style=for-the-badge>)
  ![React Router Dom](https://img.shields.io/badge/React%20Router%20Dom-8C7225?style=for-the-badge)
  ![React Redux](https://img.shields.io/badge/React%20Redux-8C7225?style=for-the-badge)
  ![Material UI](https://img.shields.io/badge/Material%20UI-8C7225?style=for-the-badge)

- Backend: <br/>

  ![Node.js](https://img.shields.io/badge/Node.js-8C7225?style=for-the-badge)
  ![Express](https://img.shields.io/badge/Express-8C7225?style=for-the-badge)
  ![Mongoose](https://img.shields.io/badge/Mongoose-8C7225?style=for-the-badge)
  ![MongoDB](https://img.shields.io/badge/MongoDB-8C7225?style=for-the-badge)
  ![RESTful API](https://img.shields.io/badge/REST%20API-8C7225?style=for-the-badge)

- Tool & Platfrom: <br/>

  ![Axios](https://img.shields.io/badge/Axios-8C7225?style=for-the-badge)
  ![Render](https://img.shields.io/badge/Render-8C7225?style=for-the-badge)
  ![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-8C7225?style=for-the-badge)
  ![bcryptjs](https://img.shields.io/badge/bcryptjs-8C7225?style=for-the-badge)

<br/>

## Dive into the Workings Deeper

1. Account registration data will be sent to the backend via the HTTP POST request method with the REST API routes.

2. Upon receiving, the password will be hashed using the bcryptjs library and then, along with other account info, stored in the non-relational database MongoDB.

3. The server will proceed to generate a token for the given user through the jsonwebtoken library to allow for later-on verification, sending the package afterward, in JSON form, that includes the account data and the token to the client side.

4. On the frontend, the processed user info and the token will be stored in the DOM storage (local storage mechanism), enabling a persistent logged-in state.

5. CRUD operations (Create, Read, Update, Delete) on the given posts are therefore allowed for the user via the REST API routes, with a token included in the HTTP request header of authorization.

6. The server will decode the included token and go on to validation and expiration check (an hour, in this case), leading up to the permission on the intended operations.

7. The updated data from the backend will be handled in the Redux's state container and mainly with destructuring assignment, after which, dependent upon different scenarios, respective React components are allowed to make use of the handled data.

<br/>

## Let's Get Started

### On Backend

- #### Clone the project

```
git clone https://github.com/laynesquare/share_your_memories.git
```

- #### Specify the port number on which the back-end server running on

```
PORT
```

- #### Register a MongoDB database and set the connection URL ( [![Register a MongoDB database](https://img.shields.io/badge/Register%20a%20MongoDB%20database-8C7225?style=flat-square)](https://account.mongodb.com/account/register?_ga=2.108235841.2141323915.1651933622-544584807.1637152216) )

```
CONNECTION_URL
```

- #### Set your JWT secret to the process environment variable

```
JWT_SECRET
```

- #### Specify cors origin to permit access from the frontend

```
CORS_ORIGIN
```

### On Frontend

- #### Register a Youtube API on Google Cloud Console to make queries and fetch data ( [![Google Cloud Console](https://img.shields.io/badge/Register%20a%20Youtube%20API-8C7225?style=flat-square)](https://console.cloud.google.com/) )

```
REACT_APP_YOUTUBE_API_KEY
```

- #### Create a Google OAuth 2.0 client ID on the cloud console to allow Google login ( [![Google Cloud Console](https://img.shields.io/badge/Register%20a%20client%20ID-8C7225?style=flat-square)](https://console.cloud.google.com/) )

```
REACT_APP_GOOGLE_LOGIN_CLIENT_ID
```

- #### Your memory-sharing platform's back-end API

```
REACT_APP_SHARE_MEMORIES_API
```

### Start Development

- #### Under the respective client/server folder

```
npm install
npm run start
```
