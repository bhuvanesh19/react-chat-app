import * as react from 'react';
import React from 'react';
import { Paper } from '@mui/material';
import { auth } from '../Pages/firebase';
export default function Message(props) {
  return <div id="message" style={{width:"100%",
                                display:"flex",
                                flexDirection:(props.message.who===auth.currentUser.uid)?"row-reverse":"row",                                
                                }}>
      <Paper  sx={{
                maxWidth:"50%",
                minWidth:"30%",
                overflowWrap:"anywhere",
                paddingTop:"3px",
                paddingBottom:"3px",
                paddingLeft:"15px",
                paddingRight:"15px",
                marginRight:"8px",
                marginLeft:"8px",
                marginTop:"5px",
                backgroundColor:(props.message.who===auth.currentUser.uid)?"#004f2b":"#4a4a4a",
                color:"white",
                display:"flex",
                fontSize:"18px",
                flexDirection:"column"
                }}>
        <div style={{
                    fontSize:"13px",
                    right:0,
                    display:"flex",
         
                    flexDirection:(props.message.who===auth.currentUser.uid)?"row-reverse":"row"}}>
                        {(props.message.who===auth.currentUser.uid)?"me":props.message.name}
        </div>
          <div style={{display:"flex",
                    flexDirection:"row",
                    justifyContent:"space-between",
                    fontSize:"18px",
                   
                    alignItems:"baseline"}} >
                    {props.message.message}
                    </div>
          <div style={{
                    
                    height:"auto",
                    fontSize:"10px",
                    display:"flex",
                    flexDirection:"row-reverse",
                   }}>{props.message.time}</div>
          
      </Paper>
  </div>;
}
