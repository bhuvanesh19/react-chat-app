import './ChatBox.css';
import {useEffect, useState} from'react';
import { AppBar, Button, IconButton,InputBase,Menu,MenuItem, } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Message from '../components/Message';
import { db,auth} from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Link ,useNavigate,useLocation } from 'react-router-dom';
import React from 'react';

export default function ChatBox() {
  
  const navigatorr=useNavigate();
  const location=useLocation();
  const [isOpen,setIsOpen]=useState(false);
  useEffect(() => {if(auth.currentUser===null){
    navigatorr("/login");
    
  } 
  console.log(1);
  db.collection("rooms").doc(location.state.roomData.roomid).collection("messages").orderBy("serverTime","asc").onSnapshot((qsp)=>{setChat(qsp.docs.map((qds)=>qds.data()));});
},[]);
    const [chat,setChat]=useState([]);
  async function addMessage (message) {
    let collection_ref=db.collection("rooms").doc(location.state.roomData.roomid).collection("messages");
    let date= new Date();

    message={...message,time:date.getHours().toString()+":"+date.getMinutes().toString(),
    serverTime:firebase.firestore.FieldValue.serverTimestamp(),
    name:localStorage.getItem("currentName")};
    collection_ref.add(message);
    setChat([...chat,message])
  }
  async function fetchMessages(){
    let chats=await db.collection("rooms").doc(location.state.roomData.roomid).collection("messages").orderBy("serverTime","asc").get();
    setChat(chats.docs.map((qds)=>qds.data()));
    
  }
  useEffect(()=>{
    fetchMessages();
  },[]);
  return <div id="app">
  <AppBar sx={{
      height:"50px",
      position:"sticky",
      padding:"10px",
      display:"flex",
      justifyContent:"space-between",
      flexDirection:"row",
    }}
      ><b>{location.state.roomData.roomName}</b>
  <div>
  <IconButton id="ibutton" onClick={()=>{
    
    setIsOpen(!isOpen)}}>
        <MoreVertIcon />
  </IconButton>
  <Menu 
      sx={{
      }}
      anchorEl={document.getElementById("ibutton")}
      PaperProps={{
        style: {
          width: '20ch',
        },
      }}
      open={isOpen}
      onSelect={(event)=>{console.log(event)}}
      onAbort={()=>{setIsOpen(!isOpen)}}
      onClose={()=>{setIsOpen(!isOpen)}}
  >
    
  <MenuItem onClick={()=>{
    navigator.clipboard.writeText(`${location.state.roomData.roomid}`);
    setIsOpen(!isOpen);
                    }}
  >{"Copy Room ID"}</MenuItem>
  <MenuItem onClick={()=>{
    navigatorr("/home");
  }}
  >{"Go Home"}</MenuItem>
  <MenuItem onClick={async ()=>{
    await auth.signOut();
    navigatorr("/login");
}}
>{"Log Out"}</MenuItem>
  </Menu>

  </div>
  </AppBar>
  <div id="chatblock">
  <div id="messages">{chat.map((val)=><div id="messagewrap"><Message message={val} ></Message></div>)}</div>
  <div id="chat-in" >
  <InputBase autoComplete='off' autoFocus={true} id="chatinput" sx={{width:"85%",
                  autoComplete:"off",
                  caretColor:"#2ba650" ,
                  caretShape:"underscore",
                  padding:"10px",
                  height:"50px",
                  backgroundColor: "#4a4a4a",
                  borderRadius: "18px",
                  color: "white"}} 
              placeholder='Message'>
  </InputBase> 
  <IconButton onClick={()=>{
    var x=document.getElementById("chatinput");
   if(x.value!=="")
   { 
     x.focus()
     addMessage({who:auth.currentUser.uid,message:x.value});
      x.value="";
    }}}
              sx={{backgroundColor:"#004f2b",
                  height:"50px",
                  width:"50px",
                  ":hover":{backgroundColor:"#004f2b"}}} 
              children={<SendIcon 
                            style={{color:"white"}}>
                        </SendIcon>}>
  </IconButton>
  </div>
  </div>
  
  </div>;
}
