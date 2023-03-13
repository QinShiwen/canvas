
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
- Auth user (register and log in)
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
- Websocket
## Backend
- NodeJS
- MySQL