import './Home.css';
import {useEffect, useState} from'react';
import {Paper,AppBar,Button,Icon,InputBase} from '@mui/material';
import { Link ,useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { db,auth} from './firebase';
import firebase from 'firebase/compat/app';
import React from 'react';


export default function AddExistingRoom() {
    const roomsRef=db.collection("rooms");
    const userRef=db.collection("Users");
    const navigator=useNavigate();
    useEffect(() => {if(auth.currentUser===null){
      console.log("OK");
      navigator("/login");
    }},[]);
  return <div>
      <form id="RoomExistForm">
      <InputBase id="RoomName"   placeholder="Room Name"
            sx={{width:"85%",
            border:"2px solid black",
            margin:"15px",
            borderRadius:"5px",
            padding:"5px"
          }}></InputBase>
          <InputBase id="Password"   placeholder="Password"
            sx={{width:"85%",
            border:"2px solid black",
            margin:"15px",
            borderRadius:"5px",
            padding:"5px"
          }}></InputBase>
          <Button variant="outlined" 
              sx={{
                margin:"15px",
                width:"50%",
                border:"2px solid black ",
                color:"black",
                ":hover":{
                  color:"blue",
                  border:"2px solid blue",
                }
              }}
              onClick={async ()=>{
                let form_ref=document.forms["RoomExistForm"];
                let doc=await roomsRef.doc(form_ref["RoomName"].value,).get();
                if(doc)
                {
                    if(form_ref["Password"].value===doc.data().Password)
                    {
                        if(!(await userRef.doc(auth.currentUser.uid).collection("subrooms").where("roomid","==",form_ref["RoomName"].value).get()).empty){
                            navigator("/roomlist");
                        }else{
                        await userRef.doc(auth.currentUser.uid).collection("subrooms").add({roomid:form_ref["RoomName"].value,roomName:doc.data().roomName,});
                        navigator("/roomlist");
                    }
                    }
                    else{
                        alert("Password Wrong");
                    }
                }
            else{
                alert("Check Again");
                }
        }}
              >Join</Button>
          </form>
  </div>;
}
