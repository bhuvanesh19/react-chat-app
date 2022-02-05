import './Home.css';
import {useEffect, useState} from'react';
import {Paper,AppBar,Button,Icon} from '@mui/material';
import { Link ,useNavigate,useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { db,auth} from './firebase';
import firebase from 'firebase/compat/app';
import React from 'react';

export default function RoomList(){
  let location=useLocation();
  let roomRef=db.collection("rooms");
  let [qds,setQDS]=useState([]);
  const navigator=useNavigate();
  async function getRooms(){
    let qs=await db.collection(`Users`).doc(`${auth.currentUser.uid}`).collection("subrooms").get();
    let userdetails=await db.collection(`Users`).doc(`${auth.currentUser.uid}`).get();
    localStorage.setItem("currentName", userdetails.data().name);
    setQDS(qs.docs.map((q)=>q.data()));
  }
  useEffect(() => {
    if(auth.currentUser===null){
    navigator("/login");
  }
  else{
    getRooms();
  }
},[])

  return <div id="roomlist">
            <AppBar sx={{
      height:"50px",
      position:"sticky",
      padding:"10px"
    }}
      ><b>Rooms</b></AppBar>
      <div id="roomlistbody"
            style={{
                  display:"flex",
                  flexDirection:"row",
                  }}
      >
        {qds.map((qds)=><Paper sx={{
                                    width:"150px",
                                    height:"150px",
                                    backgroundColor:"brown",
                                    margin:"10px",
                                    display:"flex",
                                    justifyContent:"center",
                                    alignItems:"center",
                                    }}
                              onClick={()=>navigator("/chatbox",{state:{roomData:qds}})}
                      >
                        {qds.roomName}
                        
                      </Paper>
        )}
      </div>
        </div>;
}
