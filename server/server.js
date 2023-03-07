

const mysql = require('mysql');
//const bcrtpt = require('bcrypt');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'database'
})

connection.connect();

const checkEmailExists = (email)=>{
    return new Promise((res,rej)=>{
        connection.query(`SELECT * FROM users WHERE email = '${email}'`,(err,result)=>{
            if(err){
                rej(false)
            }
            res(result.length>0)
        })
    })
}

const loginUser = (email,name,password)=>{
    return new Promise((resolve,reject)=>{
        connection.query(`SELECT * FROM users WHERE email = '${email}'`,(err,result)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(result)
            }
        })
    })
}

const register = (email,name,password,avatar)=>{
    const checkEmail = checkEmailExists(email)
    if(checkEmail){
        return new Promise((resolve,reject)=>{
            connection.query(`INSERT INTO users (email,name,password,avatar) VALUES ('${email}','${name}','${password}','${avatar}')`,(err,result)=>{
                if(err){
                    reject(err)
                }
                else{
                    resolve(result)
                }
            })
        })
    }
}

