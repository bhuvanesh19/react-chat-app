import './Register.css';
import {useEffect, useState} from'react';
import { Button, IconButton,InputBase} from '@mui/material';
import { Link ,useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { db,auth } from './firebase';
import firebase from 'firebase/compat/app';
import React from 'react';


export default function Register() {
  const user_ref=db.collection("Users");
  const navigator=useNavigate();
  return <div id="register">
      <form id="registerform">
      <InputBase id="Name" placeholder="Name"
            sx={{width:"85%",
            border:"2px solid black",
            margin:"15px",
            borderRadius:"5px",
            padding:"5px"
            }}></InputBase>
      <InputBase id="Email" placeholder="Email"
            sx={{width:"85%",
            border:"2px solid black",
            margin:"15px",
            borderRadius:"5px",
            padding:"5px"
          }}></InputBase>
      <InputBase id="Password"  placeholder="Password"
          type='password'
            sx={{width:"85%",
            border:"2px solid black",
            margin:"15px",
            borderRadius:"5px",
            padding:"5px"
          }}></InputBase>
      <InputBase id="RePassword"   placeholder="Re-Password"
            type='password'
            sx={{width:"85%",

            border:"2px solid black",
            margin:"15px",
            borderRadius:"5px",
            padding:"5px"
          }}></InputBase>
    </form>
      <Button variant="outlined" 
              sx={{
                margin:"15px",
                width:"50%",
                border:"2px solid black ",
                color:"black",
                ":hover":{color:"blue",
                border:"2px solid blue",}
              }}
              onClick={async ()=>{
                  let formele=document.forms["registerform"];
                  let form={name:formele["Name"].value,
                            email:formele["Email"].value,
                            password:formele["Password"].value,
                            repassword:formele["RePassword"].value   
                        };
                  if(form.password===form.repassword){
                    try{
                        let createRes=await auth.createUserWithEmailAndPassword(form.email,form.password);
                         await user_ref.doc(`${createRes.user.uid}`).set({name:form.name,
                          email:form.email,
                          _id:createRes.user.uid,
                        });
                        navigator("/home");    
                    }
                    catch(e){
                        console.log(e);
                        alert("Check Again Error Occured");
                    }    
                    
                }
                  else{
                      alert("Password and Repassword should be same");
                  }
              }}
              >Register</Button>
  </div>;
}
