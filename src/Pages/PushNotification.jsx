/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import PersonIcon from '@mui/icons-material/Person';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
// import {db} from "../firebase-config";
// import {collection, getDocs} from "firebase/firestore"




import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from 'firebase/app';
import SideBar from "../components/Sidebar";




firebase.initializeApp({
    apiKey: "AIzaSyBvfVUNnYLDgGpn5ZJeWRhOIcvbq-IkB3U",
    authDomain: "final-year-project-72979.firebaseapp.com",
    projectId: "final-year-project-72979",
    storageBucket: "final-year-project-72979.appspot.com",
    messagingSenderId: "380508928272",
    appId: "1:380508928272:web:f977f116e59405ca0c8d95",
    measurementId: "G-R46DC2W3HS"

})



const PushNotification = (props) => {

    console.log(props)
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const sendNoti = () => {


        const tokenCollectionRef = firebase.firestore().collection("usertoken");
        console.log(tokenCollectionRef)
        tokenCollectionRef.get().then((querySnapshot) => {
            // Map the documents to an array of data objects
            const data = querySnapshot.docs.map((doc) => {
                return doc.data().token
            });
            console.log(data)

            fetch('http://localhost:5000/send-noti', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({
                    tokens: data,
                    message
                })
            })


        })


    }


    return (
        <>
            <SideBar />
            <Container sx={{ display: 'flex', flexDirection: 'column', marginTop: '7%', height: '400px', width: '40%', backgroundColor: '#770043' }}>

                <Typography variant="h5" gutterBottom
                    sx={{ color: 'white', marginTop: '3%' }}>
                    Push Notification
                </Typography>

                <Typography variant="body1" gutterBottom
                    sx={{ color: 'white', marginTop: '3%' }}>
                    Enter a message to push
                </Typography>

                <TextField id="outlined-basic"
                    onChange={(event) => setMessage(event.target.value)}
                    label={<> <PersonIcon /> Enter message </>}
                    variant="outlined"
                    sx={{ backgroundColor: "white", marginTop: '3%' }}
                />


                <Button variant="contained"
                    onClick={() => sendNoti()}
                    sx={{ color: '#770043', backgroundColor: 'white', marginTop: '3%', fontWeight: '500', textTransform: 'capitalize', fontSize: '20px' }}>
                    Send
                </Button>


            </Container>
        </>

    )

}

export default PushNotification;