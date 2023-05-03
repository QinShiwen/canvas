# Intro
A basic painting demo with the functions below:
- Paint
- Clear canvas
- Download canvas
- Change the size and color of the pen
- Adjust the size of canvas
- Share link to others to draw together
- Enter & Leave room
- Chat 


# Project Logic
## Router Setting
- Login
- Canvas
## Login
- Google login
  - If its the first time for player to use, then register then login
    - ifEmailExist
    - setCookie
  - Else:
    - Record the name, email, googleId, roomid to the session
    - Open Websocket for the room.
- autoLogin
  - Check cookies
- Entering a room with roomid(?) especially for the user
## Canvas
### Paint
- states
    - startDraw
    - drawing
    - finishDraw
- canvas data
```
[
    {
        color:string;
        size:number;
        start:{ x:number; y:number }
        end:{ x:number; y:number }
    }
]
```
- Claer canvas
- Download canvas
- Change the size and color of the pen
- Adjust the size of canvas
- Share link to others to draw together

### others
- Player list
- Chat

### When to use Websocket?
- Enter room & Leave room
    - updatePlayers
- Paint
- Chat


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
- useWebsocket

## Backend
- NodeJS
- ws module
- Mongoose

# Bugs and Solutions
### "react-google-login" install
- There is a conflict in the peer dependencies required by the packages you are trying to install.
- Use the --legacy-peer-deps flag, which will allow npm to ignore the peer dependency conflicts and install the packages anyway. This may also cause issues if there are any incompatible dependencies.
```
npm install react-google-login --legacy-peer-deps
```
