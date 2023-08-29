/* eslint-disable no-undef */
const admin = require('firebase-admin')
const express = require('express')
const app = express()
const cors = require("cors");
var serviceAccount = require("./final-year-project-72979-firebase-adminsdk-bzl1x-a79ee63537.json")

//THE REQUEST THAT WE WILL SEND FROM FRONTEND NEEDS TO BE PARSED BEFORE PASSED TO THE API so we will parse it by creating a middleware
app.use(express.json())
//cors
app.use(cors());

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

//1ST ITERATION
// const message = {
//     notification: {
//         title:"new ad",
//         body:"new ad posted click to open"
//     },
//     token : "dTdI4cexSjKY-g57VNvp-h:APA91bH_t4uGHzDHgxIs003Nqs7eny5pi95qTQPU76PrvpQgY8Vj2CqYEayUICBJsQC2dNmUSdp8Po31pBJ0ehRTdnQ1ycwKkmQWcZUqKc9GtkUGjX74wW7GK2FzS66PKQ4c5PoNKTEl"
// }

// admin.messaging().send(message).then(res=>{
//    console.log('send success')
// }).catch(err=>{
//     console.log(err)
// }) 

//2ND ITERATION
// app.post('/send-noti',(req,res)=>{
//     console.log("TOKENS:",req.body)
//    const message = {
//     notification:{
//         title:"new ad",
//         body:"new ad posted click to open"
//     },
//     tokens:"dTdI4cexSjKY-g57VNvp-h:APA91bH_t4uGHzDHgxIs003Nqs7eny5pi95qTQPU76PrvpQgY8Vj2CqYEayUICBJsQC2dNmUSdp8Po31pBJ0ehRTdnQ1ycwKkmQWcZUqKc9GtkUGjX74wW7GK2FzS66PKQ4c5PoNKTEl"
// }

// admin.messaging().send(message).then(res=>{
//    console.log('send success')
// }).catch(err=>{
//     console.log(err)
// }) 
//})

//3RD ITERATION
//We will first create an api here that will be then used to push notification. we will pass data to it from frontend that is the create ad screen.array of token will be passed to the api

app.post('/send-noti', (req, res) => {
    console.log(req.body)
    const message = {
        notification: {
            title: "route 8",
            body: req.body.message
        },
        tokens: req.body.tokens

    }

    admin.messaging().sendMulticast(message).then(res => {
        console.log('send success')
    }).catch(err => {
        console.log(err)
    })
})




app.listen(5000, () => {
    console.log('surver running')
})