
# Intro
A basic painting demo with the functions below:
- paint
- claer canvas
- download canvas
- change the size and color of the pen 
- Adjust the size of canvas
- Share link to others to draw together

# Data Structure Design
- user data for auth
```
{
    userid:string;
    username:string;
    email:string;
    password:string;
    roomid:string;
}
```
- data when painting with other users
```
{
    hostid:string
    users:[{
        userid:string;
        username:string;
    }]
    paintingInfo:[   //points in the canvas

    ]
}
```

# Project Logic
## Login
- Login by using Google Auth
- Entering a room with roomid(?) especially for the user
## Draw
- paint
- claer canvas
- download canvas
- change the size and color of the pen 
- Adjust the size of canvas
- Share link to others to draw together 

# Install
- Input `npm install` in the terminal to install the dependencies
- Input `npm start` to run project

# Built with
## Frontend
- React
- TypeScript
- react-color
- Antd
- react-google-login
- Websocket
## Backend
- NodeJS
- Mongoose 


# Bugs and Solutions
### "react-google-login" install
- There is a conflict in the peer dependencies required by the packages you are trying to install. 
- Use the --legacy-peer-deps flag, which will allow npm to ignore the peer dependency conflicts and install the packages anyway. This may also cause issues if there are any incompatible dependencies.
```
npm install react-google-login --legacy-peer-deps
```