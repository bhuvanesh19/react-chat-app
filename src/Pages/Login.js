import './Login.css';
import {useEffect, useState} from'react';
import { Button, IconButton,InputBase} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { db,auth } from './firebase';
import firebase from 'firebase/compat/app';
import React from 'react';
import { Link ,useNavigate } from 'react-router-dom';
export default function Login() {
  const navigator=useNavigate();
  return (<div id="login">
    <form id="loginform">
      <InputBase placeholder="Email"
                  id="Email"
              sx={{width:"85%",
                    border:"2px solid black",
                    margin:"5px",
                    borderRadius:"5px",
                    padding:"5px"
                  }}></InputBase>
      <InputBase placeholder="Password" 
                type='password'
                id="Password"
                sx={{width:"85%",
                    border:"2px solid black",
                    margin:"5px",
                    borderRadius:"5px",
                    padding:"5px"
                  }}></InputBase>
      </form>
      <Link to="/register">register</Link>
      <Button variant="outlined" 
              sx={{
                margin:"5px",
                border:"2px solid black ",
                color:"black",
                ":hover":{color:"blue",
                border:"2px solid blue",}
              }}
              onClick={async ()=>{
               let form_ref=document.forms["loginform"];
               await auth.setPersistence("session")
               await auth.signInWithEmailAndPassword(form_ref["Email"].value,form_ref["Password"].value);
               navigator({pathname:"/home",state:{hello:1}});
              }}
              >Login</Button>
  </div>);
}
