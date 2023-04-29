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
    hostid:string;
    roomid:string;
    users:[{
        userid:string;
        username:string;
    }]
    paintingInfo:[   //lines in the canvas
        [{
            color:string;
            size:number;
            start:{ x:number; y:number }
            end:{ x:number; y:number }
        },{...},{..}],
        [{
            color:string;
            size:number;
            start:{ x:number; y:number }
            end:{ x:number; y:number }
        }]
    ]
}
```

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
- canvas data:
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
### others
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
- ws module
- Mongoose

# Bugs and Solutions
### "react-google-login" install
- There is a conflict in the peer dependencies required by the packages you are trying to install.
- Use the --legacy-peer-deps flag, which will allow npm to ignore the peer dependency conflicts and install the packages anyway. This may also cause issues if there are any incompatible dependencies.
```
npm install react-google-login --legacy-peer-deps
```

你好，我先做一款多人绘画游戏，只要有人进入我的网站URL即可一起画画，包含功能有：绘制，调整画笔颜色和大小等。
前端用React和TypeScript实现，后端用Node.Js实现，要开启Websocket的服务，请写出代码