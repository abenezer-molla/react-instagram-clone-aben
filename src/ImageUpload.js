import React, {useState} from 'react';
import {Button, Input } from '@material-ui/core';

import {storage, db} from "./firebase";
import firebase from "firebase"; 
import './ImageUpload.css';

function ImageUpload({username}) {

    const [image , setImage] = useState('');
    const [progress , setProgress] = useState('');
    const [caption , setCaption] = useState('');

    const handleUpload = ()=>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                //progress function goes here...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error)=>{
                alert(error.message);
            },
            ()=> {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url =>{
                        db.collection("posts").add({
                            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption, 
                            imageUrl: url,
                            username: username
                    });

                    setProgress(0);
                    setCaption("");
                    setImage(null);
                })
            }
        )
    }

    const handleChange  = e => {
        if (e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };
    return (
        <div className = "imageupload" >

            <progress className = "imageupload__progress" value ={progress} max= "100"/>
            <input type = "text" placeholder = "Enter a Caption..." onChange = {event => setCaption(event.target.value)} />
            <input type = "file" onChange = {handleChange}/>

            <Button onClick= {handleUpload}> Upload</Button>

            
        </div>
    )
}

export default ImageUpload
