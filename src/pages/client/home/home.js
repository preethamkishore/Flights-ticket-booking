import { Button, InputLabel, TextField } from "@mui/material";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { onValue, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseAuth, firebaseDatabase } from "../../../backend/fireHandler";
import './home.css';

const Home = () => {
  const navigate = useNavigate();

  const [flightList,setFlightList] = useState([]);
  const [ids,setIds] = useState([]);
  const [date, setDate] = useState(null);
  const [uid, setUid] = useState();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUid(user.uid);
      }else{
        navigate("/login")
      }
    });
    const fref = ref(firebaseDatabase,'Flights-Record')
    onValue(fref,(snapshot) => {
        setFlightList(Object.values(snapshot.val()));
        setIds(Object.keys(snapshot.val()));
    },{onlyOnce:true})
  },[])

  const handleClick = (e) => {
      const fbref = ref(firebaseDatabase,`Client-Record/${uid}`)
      const id = e.target.id;
      onValue(fbref, async (snapshot) => {
      const userref = ref(firebaseDatabase,`Bookings/${id}/${uid}`)
      await set(userref,snapshot.val())
      alert("Ticket Booked!")
      })
  }

  const handleLogout = () => {
    signOut(firebaseAuth);
  }

    return (
        <div style={{backgroundColor:"lightblue" }}>
            <hr/>
            <h1>Welcome</h1>
            <Button variant="contained" onClick={handleLogout} sx={{width:'180px', height:'50px', position:'absolute', top:'125px', right:'20px'}}>Log Out</Button>
            <div style={{height:"40px",  width:"330px",marginBottom:"50px"}}>
                <InputLabel>Select Date</InputLabel>
                <TextField sx={{width:"330px"}} id="outlined-basic" variant="outlined" type={'date'} value={date} onChange={(e) => setDate(e.target.value)}/>
            </div>
          <div className="list-Container">
            {flightList.map((flight,index) => {
               if(date == flight.date){
                return(
                  <div key={ids[index]} className="Data-Container">
                        <div>
                        <p>Airline</p>
                        <h2>{flight.airline}</h2>
                        </div>
                        <div>
                            <p>Date</p>
                            <h2>{flight.date}</h2>
                        </div>
                        <div>
                            <p>Departure Time</p>
                             <h2>{flight.departureTime}</h2>
                        </div>
                        <div>
                            <p>Arrival Time</p>
                            <h2>{flight.arrivalTime}</h2>
                        </div>
                        <div>
                            <p>Boarding Point</p>
                            <h2>{flight.boarding}</h2>
                        </div>
                        <div>
                            <p>Destination</p>
                            <h2>{flight.destination}</h2>
                        </div>
                        <div>
                            <p>Cost</p>
                            <h2>{flight.cost}</h2>
                        </div>
                        <div>
                            <Button variant="contained" onClick={handleClick} id={ids[index]}>Book</Button>
                        </div>
                       </div>
                )
               }
            })}
            </div>
        </div>
    )
}

export default Home;