
import {BrowserRouter ,Routes,Route} from 'react-router-dom';
import AddRoom from './Pages/AddRoom';
import {createContext,useState,useEffect} from 'react';
//https://cloud.google.com/nodejs/docs/reference/firestore/latest
import ChatBox from './Pages/ChatBox';
import { db,auth,authGetter } from './Pages/firebase';
import firebase from 'firebase/compat/app';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import RoomList from './Pages/RoomList';
import AddExistingRoom from './Pages/AddExistingRoom';
export const AuthProvider=createContext();
function App() {
  const [gotUserStatus,setUserStatus]=useState(false);
  useEffect(()=>{
    authGetter(setUserStatus);
  },[])
  if(!gotUserStatus){
    return(<div>Loading....</div>);
  }else{
  return(<div id="Body wrapper" >
    <AuthProvider.Provider value={""}>
    <BrowserRouter>
        <Routes>
          <Route path="/addexisitngroom" element={<AddExistingRoom/>}/>
          <Route path="/addroom" element={<AddRoom/>} />
          <Route path="/chatbox" element={<ChatBox/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/" element={<Home/>} />
          <Route path="" element={<Home/>} />
          <Route path="/roomlist" element={<RoomList/>} />
        </Routes>
    </BrowserRouter>
    </AuthProvider.Provider>
    </div>
  );
}
}

export default App;
