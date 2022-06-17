import { TextField  , Button, Select, InputLabel, FormControl, MenuItem } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { ref,set } from "firebase/database";
import { async } from "@firebase/util";
import { firebaseAuth, firebaseDatabase } from "../../../backend/fireHandler";
import { textAlign } from "@mui/system";

const SignIn =() => {
    const nav = useNavigate();
    const [load, setLoad] = useState(false)

    const [userData , setuserData] = useState({
        name:'',
        gender:'',
        phoneNo:'',
        email:'',
        password:'',
        confirmPass:''
     })
    
    const HandleChange = (e) => {
        const {name, value} = e.target;
        setuserData({ ...userData,
            [name]:value
        })
    }

    const HandleClick = async() => {
        setLoad(true)
        if(userData.name == ''){
            setLoad(false)
            alert('Enter Name')
        }
        else if(userData.gender == ''){
            setLoad(false)
            alert('Enter Gender')
        }
        else if(userData.phoneNo == '') {
            setLoad(false)
            alert('Enter Phone No')
        }
        else if(userData.email == ''){
            setLoad(false)
            alert('Enter Email')
        }
        else if(userData.password == ''){
            setLoad(false)
            alert('Enter Password')
        }
        else if(userData.confirmPass == ''){
            setLoad(false)
            alert('Enter Confirm Password')
        }
        else if(userData.password == userData.confirmPass) {

            try {
                await createUserWithEmailAndPassword( firebaseAuth, userData.email, userData.password)
                onAuthStateChanged(firebaseAuth, async(user) => {
                    if(user){
                        const uid = user.uid;
                        const fref = ref(firebaseDatabase, `Client-Record/${uid}`)
                        set(fref,{
                            name:userData.name,
                            gender:userData.gender,
                            phoneNo:userData.phoneNo,
                            email:userData.email
                        })
                        }
                        nav('/client')
                })
                
            }
            catch (err) {
                setLoad(false)
                alert(err)
            }
        }
        else {
            alert('Password and Confirm Password do not match')
            setLoad(false)
        }
    }

    useEffect( ()=> {
        onAuthStateChanged(firebaseAuth, (user) => {
            if(user) {
                nav('/client')
            }
        });
    },[])

    
    
    return(
        <div style={{backgroundColor:"lightblue" ,height:"200vh"}}>
        <div style={{marginLeft:"450px"}}>
        <br/>
            <h1>Here you go!</h1>
            <br/><br/>
        </div>
        <div style={{position:"absolute" , left:"50%", right:"50%", transform:"translate(-50%)", width:"400px"}}>
            <p><b> Enter your credentials to create an account</b></p>
            <TextField name="name" value={userData.name} onChange={HandleChange} variant="outlined" id="outlined-basic" label="Name" sx={{height:"40px", marginRight:"40px", width:"330px", marginTop:"30px",marginBottom:"20px"}}/>
            <FormControl sx={{height:"40px",  width:"330px", marginTop:"30px",marginBottom:"20px"}}>
                <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
                <Select  name="gender" value={userData.gender} onChange={HandleChange} variant="outlined" id="outlined-basic" label="Gender" >
                    <MenuItem value = {'Male'}>Male</MenuItem>
                    <MenuItem value = {'Female'}>Female</MenuItem>
                    <MenuItem value = {'Others'}>Others</MenuItem>
                </Select>
            </FormControl>
            <TextField name="phoneNo" value={userData.phoneNo} onChange={HandleChange} variant="outlined" id="outlined-basic" type={"number"} label="Phone No" sx={{height:"40px", marginRight:"40px", width:"330px", marginTop:"30px",marginBottom:"20px"}}/>
            <TextField name="email" value={userData.email} onChange={HandleChange} variant="outlined" id="outlined-basic" type={"email"} label="Email"  sx={{height:"40px", width:"330px", marginTop:"30px",marginBottom:"20px"}}/>
            <TextField name="password" value={userData.password} onChange={HandleChange} variant="outlined" id="outlined-basic" type={"password"} label="Password"  sx={{height:"40px", marginRight:"40px", width:"330px", marginTop:"30px",marginBottom:"20px"}}/>
            <TextField name="confirmPass" value={userData.confirmPass} onChange={HandleChange} variant="outlined" id="outlined-basic" type={"password"} label="Confirm Password"  sx={{height:"40px",  width:"330px", marginTop:"30px",marginBottom:"20px"}}/>
            <Button disabled={load} onClick={HandleClick} variant="contained" sx={{height:"50px", marginLeft:"40px", width:"250px", marginTop:"30px", marginBottom:"10px"}}>Sign In</Button>
            <p style={{marginLeft:"40px"}}>Already have an Account? <a href={"/login"}> Log in</a></p>
        </div>
        
    </div>
    )
}

export default SignIn;