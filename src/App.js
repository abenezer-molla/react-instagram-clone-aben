import React, {useState, useEffect} from 'react';

import './App.css';
import Post from './Post';

import ImageUpload from './ImageUpload';
import { db , auth} from './firebase';
import {makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button, Input } from '@material-ui/core';
import InstagramEmbed from 'react-instagram-embed';





function getModalStyle(){
  const top = 50;
  const left = 50 ;

  return {

    top: `${top}`,
    left: `${left}`,
    transform: `translate(${top}%, ${left}%)`,
  };
}
const useStyle = makeStyles((theme) => ({
  paper: {
    position: 'abosolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2,4,3),

  },
}));

function App() {
  const classes = useStyle();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);



  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>
    {
      if(authUser){
        setUser(authUser);
        if (authUser.displayName) {

        }else {
          return authUser.updateProfile({
            displayName: username,
          });
        }

      }else{
        setUser(null);

      }
    })
    return()=>{
      unsubscribe(); 
    }

  },[user, username]);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc') .onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=> ({
        id:doc.id,
        post:doc.data()
      })));
    }) 


  },[]); 

    const signUp  = (event) => {
      event.preventDefault();
      auth.createUserWithEmailAndPassword(email, password)

      .then((authUser)=>{
        return authUser.user.updateProfile({
          displayName: username
        })
      })


      .catch((error) => alert(error.message) )
      setOpen(false);



    }
  

    const signIn = (event)=>{ 
      event.preventDefault();

      auth
        .signInWithEmailAndPassword(email, password)
        .catch((error) => alert(error.message))
      setOpenSignIn(false);


    
    }






    
  return (
    <div className="app">

          
      {/* I want ot have caption input, File Picker Post Button   */}

        <Modal
          open={openSignIn}
          onClose={()=> setOpenSignIn(false)}
         
        >
          <div style={modalStyle} className={classes.paper}>
            <form className = "app__signUp">
                <center>
                  <img 
                  className = "app__headerImage"
                  src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  />
                  <h2>Made with Love by Abenezer M.</h2> 
                </center>
                <Input
                  placeholder = "email"
                  type = "text" 
                  value = {email}
                  onChange = {(e)=> setEmail(e.target.value)}
                />

                <Input
                  placeholder = "password"
                  type = "password"
                  value = {password}
                  onChange = {(e)=> setPassword(e.target.value)}
                />
                <Button  type = "submit" onClick = {signIn}>Sign In</Button>
              
            </form>  
          </div>
        </Modal>

        
        <Modal
          open={open}
          onClose={()=> setOpen(false)}
         
        >
          <div style={modalStyle} className={classes.paper}>
            <form className = "app__signUp">
                <center>
                  <img 
                  className = "app__headerImage"
                  src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  />
                  <h2>Made with Love by Abenezer M.</h2> 
                </center>

                <Input
                  placeholder = "username"
                  type = "username"
                  value = {username}
                  onChange = {(e)=> setUsername(e.target.value)}
                />  
            
                <Input
                  placeholder = "email"
                  type = "text" 
                  value = {email}
                  onChange = {(e)=> setEmail(e.target.value)}
                />

                <Input
                  placeholder = "password"
                  type = "password"
                  value = {password}
                  onChange = {(e)=> setPassword(e.target.value)}
                />
                <Button  type = "submit" onClick = {signUp}>Sign Up</Button>
              
            </form>  
          </div>
        </Modal>

      <div className = "app__header">

        <img 
        className = "app__headerImage"
        src = "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        />
        <h4>Made with Love by Abenezer M.</h4>
        {user ? (
        <Button onClick= {()=> auth.signOut()}> Logout</Button>

        ):(
        
          <div className ="app__loginContent">

            <Button onClick= {()=> setOpenSignIn(true)}> Sign In</Button>
            <Button onClick= {()=> setOpen(true)}> Sign Up</Button>
          </div>

        
        )}
        
      </div>
      <div className = "app__posts">
        <div className = "app__postLeft">
          {

            posts.map(({id, post})=>(
              <Post key={id} postId= {id} user= {user} username= {post.username} caption= {post.caption} imageUrl= {post.imageUrl}/>

            ))

          }


        </div>

        <div className = "app__postRight">

          <InstagramEmbed
            url = 'https://instagr.am/p/Zw9o4'
            maxWidth ={320}
            hideCaptionTagName = 'div'
            protocol=''
            injectScript
            onLoading={()=>{}}
            onSuccess= {()=>{}}
            onAfterRender={()=>{}}
            onFailure={()=>{}}
          
          
          />
          <InstagramEmbed
            url = 'https://www.instagram.com/p/CDpmyHAHBPi6-QgW6gi07aVX7FrTslVV_Cg53M0/?igshid=iky69rt8fvh4'
            maxWidth ={320}
            hideCaption={false}
            containerTagName = 'div'
            protocol='' 
            injectScript
            onLoading={()=>{}}
            onSuccess= {()=>{}}
            onAfterRender={()=>{}}
            onFailure={()=>{}}
          
          
          />

           <InstagramEmbed
            url = 'https://www.instagram.com/p/B_uf9dmAGPw'
            maxWidth ={320}
            hideCaption={false}
            containerTagName = 'div'
            protocol=''
            injectScript
            onLoading={()=>{}}
            onSuccess= {()=>{}}
            onAfterRender={()=>{}}
            onFailure={()=>{}}
          
          
          />

        </div>
        

    
         

        
      
        </div>

        {  user?.displayName ?(
              <ImageUpload username = {user.displayName}/>

            ):(
               <h3> Sorry, you need to login first to upload pcitures</h3>
            ) }
    
          
    </div>
  ); 
}

export default App;
