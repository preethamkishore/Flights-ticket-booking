import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { push, ref } from "firebase/database";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { firebaseDatabase } from "../../../backend/fireHandler";


const AddFlight = () => {
     
    const navigate = useNavigate();

    const [UserData,setUserData] = useState({
        airline:'',
        date:'',
        departureTime:'',
        arrivalTime:'',
        boarding:'',
        destination:'',
        cost:''
    })

    const [Load,setLoad] = useState(false);

    const handleChange = (e) => {
        const {name,value} = e.target;
        setUserData({
            ...UserData,
            [name]:value
        })
    }

    const handleClick = async () => {
        setLoad(true);
        if(UserData.airline == ''){
            alert("Please select the airline");
            setLoad(false)
        }
        else if(UserData.date == ''){
            alert("Please enter date");
            setLoad(false)
        }
        else if(UserData.departureTime == ''){
            alert("Please enter departure time");
            setLoad(false)
        }
        else if(UserData.arrivalTime == ''){
            alert("Please enter arrival time");
            setLoad(false)
        }
        else if(UserData.boarding == ''){
            alert("Please enter boarding point");
            setLoad(false)
        }
        else if(UserData.destination == ''){
            alert("Please enter destination");
            setLoad(false)
        }
        else if(UserData.cost == ''){
            alert("Please enter the cost");
            setLoad(false)
        }
        else{
            const fref = ref(firebaseDatabase,'Flights-Record');
            await push(fref , UserData);
            alert("Added Succesfully!");
            setLoad(false);
            navigate("/admin");
        }
    }

    return (
        <div style={{backgroundColor:"lightblue" ,height:"200vh"}} >
        <div style={{textAlign: "center"}}>
            <br/>
            <h1>Add Flight Details</h1>
            <br/>
        </div>
            <div style={{position:"absolute" , left:"50%", right:"50%", transform:"translate(-50%)", width:"400px"}}>
                <FormControl sx={{height:"40px", width:"700px", marginTop:"30px",marginBottom:"20px"}}>
                    <InputLabel id="demo-simple-select-helper-label">Airline</InputLabel>
                    <Select label="Airline" name="airline" value={UserData.airline} onChange={handleChange}>
                        <MenuItem value={'Indigo'}>Indigo</MenuItem>
                        <MenuItem value={'SpiceJet'}>SpiceJet</MenuItem>
                        <MenuItem value={'TruJet'}>TruJet</MenuItem>
                        <MenuItem value={'Air India'}>Air India</MenuItem>
                        <MenuItem value={'vistara'}>vistara</MenuItem>
                    </Select>
                </FormControl>
                <TextField onChange={handleChange} id="outlined-basic" variant="outlined" type={'date'} name="date" value={UserData.date} sx={{height:"40px", marginRight:"40px", width:"330px", marginTop:"30px",marginBottom:"20px"}}/>
                <TextField onChange={handleChange} id="outlined-basic" label="Cost" variant="outlined" type={'number'} name="cost" value={UserData.cost} sx={{height:"40px",  width:"330px", marginTop:"30px",marginBottom:"20px"}}/>
                <TextField onChange={handleChange} id="outlined-basic" label="Boarding Point" variant="outlined" name="boarding" value={UserData.boarding} sx={{height:"40px", marginRight:"40px", width:"330px", marginTop:"30px",marginBottom:"20px"}}/>
                <TextField onChange={handleChange} id="outlined-basic" label="Destination" variant="outlined" name="destination" value={UserData.destination} sx={{height:"40px", width:"330px", marginTop:"30px",marginBottom:"20px"}}/>
                <TextField onChange={handleChange} id="outlined-basic" label="Arrival Time" variant="outlined" type={'time'} name="arrivalTime" value={UserData.arrivalTime} sx={{height:"40px", width:"330px", marginTop:"30px", marginRight:"40px"}}/>
                <TextField onChange={handleChange} id="outlined-basic" label="Departure Time" variant="outlined" name="departureTime" type={'time'} value={UserData.departureTime} sx={{height:"40px", width:"330px", marginTop:"30px",marginBottom:"20px"}}/>
                <Button variant="contained" onClick={handleClick} disabled={Load} sx={{height:"50px", width:"250px", marginTop:"30px", marginBottom:"40px", marginLeft:"45px"}}>Add</Button>
            </div>
        </div>
    )
}

export default AddFlight;