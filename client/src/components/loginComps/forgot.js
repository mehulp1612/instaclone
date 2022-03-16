import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CONTRAST_COLOR1, CONTRAST_COLOR2, DARK_COLOR1, PRIMARY_COLOR, SECONDARY_COLOR } from "../../constants/colors";
import { checkOtp, passwordChanger, sendOtp } from "../api.js/service";


export default function Forgot(){
    const navigate=useNavigate();

    toast.configure();
    const [mail,setMail]=useState();
    const [disabled,setDisabled]=useState(false);
    const [userOtp,setUserOtp]=useState();
    const [realOtp,setRealOtp]=useState();
    const [passwrd,setPasswrd]=useState(false);
    const [newPass,setNewPass]=useState();

    async function mailSubmit(e){
        e.preventDefault();
        // setDisabled(true);
        const res=await sendOtp({userid:mail});
        // console.log("naya otp",res.data);
        console.log("resr",res);
        
        if(res.status==295){
            // console.log("Invalid email");
            toast.error("Mail not found");
            // setDisabled(true);
        }
        if(res.status==202){
            toast.info("An otp has been sent to the registered mail address");
            setRealOtp(res.data);
            setDisabled(true);
        }
    }

        async function validateOtp(e){
            e.preventDefault();
            console.log("submit mei aaya");
            const otpMatch=await checkOtp({
                userOtp:userOtp,
                realOtp:realOtp
            });
            console.log(otpMatch);
            if(otpMatch.data=='match'){
                console.log("otp match");
                setPasswrd(true);

            }
            else{
                // Window.alert("invalid otp");
                toast.error("Invalid OTP");
                console.log("invalid otp");
            }
        }

        async function updateNewPass(e){
            e.preventDefault();
            // const newPass=newPass;
            const res=await passwordChanger({
                userid:mail,
                pass:newPass
            });
            // console.log(res);
            if(res.status==202){
                // console.log("password changed");
                // alert("pasword updated");
                toast.success("Password Changed");
                setTimeout(navigate('/'),2500);
                
            }
            else{
                console.log("password not changed");
                toast.error("Internal Error");
            }

        }


        function loginHandler(e){
            e.preventDefault();

            navigate('/');
        }

        function signUpHandler(e){
            e.preventDefault();

            navigate('/signup');
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
            <div style={{fontSize:'25px',margin:'20px 0',textAlign:'center'}}>Forgot Password</div>
                <input style={input_Style} type="email" placeholder="Email" disabled={disabled} onChange={(e)=>setMail(e.target.value)} />
                <button style={create_button_style} type="submit" disabled={disabled} onClick={(e)=>mailSubmit(e)}>Send OTP</button>
            <br></br>
            {disabled&&!passwrd&&
                <div>
                    <input style={input_Style} type="number" placeholder="OTP" onChange={(e)=>setUserOtp(e.target.value)} />
                    <button style={create_button_style} type="submit" onClick={(e)=>validateOtp(e)}>Submit OTP </button>
                </div>}
            {passwrd &&
                <div>
                <input style={input_Style} type="password" placeholder="New Password" onChange={(e)=>setNewPass(e.target.value)} />
                <button style={create_button_style} type="submit" onClick={(e)=>updateNewPass(e)}>Update Password</button>
            </div>
            }
            </form>
                <button onClick={(e)=>{signUpHandler(e)}} style={{...create_button_style,width:'35%', margin:'10px 0',background:PRIMARY_COLOR}}>Sign UP</button>
                <button onClick={(e)=>{loginHandler(e)}} style={{...create_button_style,width:'35%', margin:'10px 0',background:PRIMARY_COLOR}}>Back to Login</button>
        </div>
    )
}
