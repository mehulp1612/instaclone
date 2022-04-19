import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api.js/service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CONTRAST_COLOR1, CONTRAST_COLOR2, DARK_COLOR1, PRIMARY_COLOR, SECONDARY_COLOR } from "../../constants/colors";
import Footer from "../footer/footer";



export default function SignUp(){
    const navigate=useNavigate();
    toast.configure()

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
        toast.loading("Creating User");

        const res=await createUser(user);
        if(res.status==202){
            toast.dismiss();
            setTimeout(navigate('/'),2500);
            toast.success("User Created");

        }
        else{
            // console.log("ye waala",res.data);
            toast.dismiss();
            toast.error(res.data);
            // setTimeout(navigate('/'),2500);
            console.log("duplicate");

        }
    }

    function loginHandler(e){
        e.preventDefault();

        navigate('/');
    }
    
    const container__style={
        display:'flex',
        flexDirection:'column',
        // justifyContent:'center',
        alignItems:'center',
        // width:'85%',
        background:`${DARK_COLOR1}`,
        minHeight:'100vh',
        
    }

    const form_container={
        display:'flex',
        flexDirection:'column',
        width:'50%',
        // alignItems:'',
        justifyContent:'center',
        marginTop:'10%',
        // marginLeft:'25%',
        background:PRIMARY_COLOR,
        padding:'50px',
        border:`ridge 10px ${SECONDARY_COLOR}`
    }

    const create_button_style={
        // background:`${PRIMARY_COLOR}`,
        background:`radial-gradient(circle, ${PRIMARY_COLOR} 40%,${SECONDARY_COLOR})`,
        height:'50px',
        border:`solid 5px ${SECONDARY_COLOR}`,
        borderRadius:'10px',
        width:'50%',
        marginLeft:'25%',
        color:`${DARK_COLOR1}`,
        fontSize:18,
        cursor:'pointer',
        textAlign:'center',
        textDecoration:'none',
        lineHeight:2.5,
        
    }
    const input_Style={
        width:'58%',
        fontSize:'20px',
        background:CONTRAST_COLOR2,
        border:`solid 2px ${CONTRAST_COLOR1}`,
        textAlign:'center',
        marginLeft:'21%',
        marginBottom:'10px',
        height:'30px',
    }
   

    return(
        <div style={container__style}>
        <form style={form_container}>
            <div style={{textAlign:'center',fontSize:'25px',marginBottom:'10px'}}>CREATE ACCOUNT</div> 
            <input style={input_Style} type='email' name="email" placeholder="Email" onChange={(e)=>changeHandler(e)} />
            <input style={input_Style} type='text' name="name" placeholder="Name" onChange={(e)=>changeHandler(e)} />
            <input style={input_Style} type='number' name="phone" placeholder="Phone Number" onChange={(e)=>changeHandler(e)} />
            <input style={input_Style} type='password' name="pass" placeholder="Password" onChange={(e)=>changeHandler(e)} />
            <button style={create_button_style} type="submit" onClick={(e)=>submitHandler(e)}>Submit</button>
        </form>
        <button onClick={(e)=>{loginHandler(e)}} style={{...create_button_style,width:'35%', margin:'10px 0',background:PRIMARY_COLOR}}>Back to Login</button>
        <Footer></Footer>
        </div>
    )
}