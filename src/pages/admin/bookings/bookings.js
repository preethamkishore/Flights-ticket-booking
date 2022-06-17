import { Button } from "@mui/material";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firebaseDatabase } from "../../../backend/fireHandler";
import './bookings.css';


const BookingList = () => {
    const navigate = useNavigate();
    const [passengers,setPassengers] = useState([]);
    const params = useParams();
    useEffect(() => {
       const fref = ref(firebaseDatabase,`Bookings/${params.id}`)
       onValue(fref,(snapshot) => {
        setPassengers(Object.values(snapshot.val()));
       })
    },[])
    
    return(
        <div style={{backgroundColor:"lightblue" ,height:"100vh"}}>
            <hr/>
            <h1>Booking List</h1>
                <Button variant="contained" onClick={() => navigate("/admin")} sx={{width:'180px', position:'absolute', top:'40px', right:'20px'}}>Back</Button>
                <hr/>
            <div className="list-Container">
                {!passengers ? <div>No Bookings</div> : 
                passengers.map((user,index) => {
                    return (
                        <div className="Data-Container">
                            <div key={index}>
                        <p>Name</p>
                        <h2>{user.name}</h2>
                        </div>
                        <div>
                            <p>Gender</p>
                            <h2>{user.gender}</h2>
                        </div>
                        <div>
                            <p>Phone Number</p>
                            <h2>{user.phoneNo}</h2>
                        </div>
                        <div>
                            <p>Email Id</p>
                            <h2>{user.email}</h2>
                        </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default BookingList;