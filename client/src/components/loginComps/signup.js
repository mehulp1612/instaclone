import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api.js/service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function SignUp(){
    const navigate=useNavigate();

    const [user,setUser]=useState({
        name:'',
        email:'',
        phone:'',
        pass:''
    })
    function changeHandler(e){
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
        // console.log(user);
    }

    async function submitHandler(e){
        e.preventDefault();

        const res=await createUser(user);
        if(res.status==202){
            toast.success("User Created");
            setTimeout(navigate('/'),2500);
        }
        if(res.status==296){
            toast.error("Credentials already in use");
            // setTimeout(navigate('/'),2500);
            console.log("duplicate");

        }
    }


    return(
        <form>
            <input type='email' name="email" placeholder="email" onChange={(e)=>changeHandler(e)} />
            <input type='number' name="phone" placeholder="Phone Number" onChange={(e)=>changeHandler(e)} />
            <input type='text' name="name" placeholder="Name" onChange={(e)=>changeHandler(e)} />
            <input type='password' name="pass" placeholder="Password" onChange={(e)=>changeHandler(e)} />
            <ToastContainer />
            <button type="submit" onClick={(e)=>submitHandler(e)}>Submit</button>

        </form>
    )
}