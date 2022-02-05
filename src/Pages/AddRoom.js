import React,{useEffect} from 'react';
import { Button, Slider,InputBase} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { db,auth } from './firebase';
import firebase from 'firebase/compat/app';
import { Link ,useNavigate } from 'react-router-dom';
export default function AddRoom() {
    const roomsRef=db.collection("rooms");
    const userRef=db.collection("Users");
    const navigator=useNavigate();
    useEffect(() => {if(auth.currentUser===null){
      console.log("OK");
      navigator("/login");
    }},[]);
  return (<div>
      <form id="RoomForm">
      <InputBase id="RoomName"   placeholder="Room Name"
            sx={{width:"85%",
            border:"2px solid black",
            margin:"15px",
            borderRadius:"5px",
            padding:"5px"
          }}></InputBase>
          <InputBase id="Note"   placeholder="Note"
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
         <Slider name="Slider"
            valueLabelDisplay="auto"
            placeholder="Slider"
            step={5}
            min={2}
            sx={{width:"90%",
                marginLeft:"20px",
                color: "black"
                }}
         >
         </Slider>
    </form>
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
                  let form_ref=document.forms["RoomForm"];
                  let doc=await roomsRef.add({roomName:form_ref["RoomName"].value,
                                      People:form_ref["Slider"].value,
                                      Note:form_ref["Note"].value,
                                      Password:  form_ref["Password"].value
                                    });
                  await userRef.doc(auth.currentUser.uid).collection("subrooms").add({roomid:doc.id,roomName:form_ref["RoomName"].value,});
                  navigator("/roomlist");
              }}
              >Create</Button>
  </div>);
}
