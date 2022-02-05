import './Home.css';
import {useEffect, useState} from'react';
import {Paper,AppBar,Button,Icon} from '@mui/material';
import { Link ,useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { db,auth} from './firebase';
import firebase from 'firebase/compat/app';
import React from 'react';


export default function Home() {
  const navigatorr=useNavigate();
  useEffect(() => {
    console.log("OK");
    if(auth.currentUser===null){
      console.log("no");
      navigatorr("/login");
    }
  },[])
  return <div id="home">
    <AppBar sx={{
      height:"50px",
      position:"sticky",
      padding:"10px"
    }}
      ><b>Home</b></AppBar>
      <div id="body">
      
        <Paper onClick={()=>navigatorr("/roomlist",{state:{hello:1}})} elevation={10} sx={{
                width:"150px",
                minHeight:"150px",
                backgroundColor:"brown",
                margin:"10px",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column",
                padding:"5px"
      }} >My Rooms
      </Paper>

      <Paper onClick={()=>navigatorr("/addroom")}  elevation={10} sx={{
                width:"150px",
                minHeight:"150px",
                backgroundColor:"brown",
                margin:"10px",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column",
                padding:"5px"
      }} >
       Create Room
        <AddIcon></AddIcon>
      </Paper>
      <Paper onClick={()=>navigatorr("/addexisitngroom")}  elevation={10} sx={{
                width:"150px",
                minHeight:"150px",
                backgroundColor:"brown",
                margin:"10px",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column",
                padding:"5px",
                textAlign:"center"               
      }} >
       Add Exisitng Room 
        <AddIcon></AddIcon>
      </Paper>
    
      </div>
  </div>;
}



