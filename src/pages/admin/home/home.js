import { Button } from "@mui/material";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseDatabase } from "../../../backend/fireHandler";
import './home.css';

const Home = () => {

    const nav = useNavigate();

    const [Flight,setFlight] = useState([]);
    const [ids,setIds] = useState([]);

    useEffect(() => {
       const fref = ref(firebaseDatabase,'Flights-Record')
       onValue(fref,(snapshot) => {
           setFlight(Object.values(snapshot.val()));
           setIds(Object.keys(snapshot.val()));
       },{onlyOnce:true})
    },[])

    return (
        <div style={{backgroundColor:"lightblue" ,height:"100vh"}}>
            <hr/>
            <h1>Flight List</h1>
            <Button sx={{width:'180px', position:'absolute', top:'40px', right:'20px'}} variant="contained" onClick={() => nav("/addflight") }>Add Flight</Button>
            <hr></hr>
          <div className="list-Container">
            {Flight.map((flight,index) => {
                return (
                       <div key={ids[index]} className="Data-Container">
                        <div>
                        <p>Airline</p>
                        <h3>{flight.airline}</h3>
                        </div>
                        <div>
                            <p>Cost</p>
                            <h3>{flight.cost}</h3>
                        </div>
                        <div>
                            <p>Date</p>
                            <h3>{flight.date}</h3>
                        </div>
                        <div>
                            <p>Boarding Point</p>
                            <h3>{flight.boarding}</h3>
                        </div>
                        <div>
                            <p>Destination</p>
                            <h3>{flight.destination}</h3>
                        </div>
                        <div>
                            <p>Arrival Time</p>
                            <h3>{flight.arrivalTime}</h3>    
                        </div>
                        <div>
                            <p>Departure Time</p>
                            <h3>{flight.departureTime}</h3> 
                        </div>
                        <div>
                            <Button variant="contained" onClick={() => nav(`/bookings/${ids[index]}`)} sx={{height:"40px", width:"180px", marginTop:"35px"}}>View Bookings</Button>
                        </div>
                       </div>
                       
                )
                
            })}
          </div>
        </div>
    )
}


export default Home;