import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkOtp, passwordChanger, sendOtp } from "../api.js/service";


export default function Forgot(){
    const navigate=useNavigate();

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
            console.log("Invalid email");
            toast.error("Mail not found");
            // setDisabled(true);
        }
        if(res.status==202){
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
            if(otpMatch==true){
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
    return(
        <>
            <form>
                <input type="email" placeholder="email" disabled={disabled} onChange={(e)=>setMail(e.target.value)} />
                <button type="submit" disabled={disabled} onClick={(e)=>mailSubmit(e)}>Send OTP</button>
            </form>
            <br></br>
            {disabled&&!passwrd&&
                <form>
                    <input type="number" placeholder="OTP" onChange={(e)=>setUserOtp(e.target.value)} />
                    <button type="submit" onClick={(e)=>validateOtp(e)}>Submit OTP </button>
                </form>}
            {passwrd &&
                <form>
                <input type="password" placeholder="New Password" onChange={(e)=>setNewPass(e.target.value)} />
                <button type="submit" onClick={(e)=>updateNewPass(e)}>Update Password</button>
            </form>
            }
            <ToastContainer />
        </>
    )
}