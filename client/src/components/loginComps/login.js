import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CONTRAST_COLOR1, CONTRAST_COLOR2, DARK_COLOR1, PRIMARY_COLOR, SECONDARY_COLOR } from "../../constants/colors.js";
import { validate } from "../api.js/service.js";
// import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Login() {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [pass, setPass] = useState('');
    const [display, setDisplay] = useState("");
    toast.configure();

    function mailHandler(e) {
        setId(e.target.value);
    }
    function passHandler(e) {
        setPass(e.target.value);
    }
    async function submitHandler(e) {
        // console.log(id,pass);
        e.preventDefault();
        toast.loading("Signing in");
        const sendRes = {
            email: id,
            pass: pass
        };
        console.log(sendRes);
        const res = await validate(sendRes);
        console.log("response", res);
        if (res.status === 292) {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.userPresent));
            navigate('/home');
            toast.dismiss();
            toast.success("Sign in Successful");
        }
        else if (res.status == 293) {
            toast.dismiss();
            toast.error("Incorrect Password");

        }
        else {
            toast.dismiss();
            toast.error("Incorrect ID");
    }
}

    function captchaHandler(value){

        console.log(value);

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
        background:`${PRIMARY_COLOR}`,
        height:'50px',
        border:`solid 5px ${SECONDARY_COLOR}`,
        borderRadius:'10px',
        width:'35%',
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
   

    return (
        <div style={container__style}>
            
                <form style={form_container}>
                    <div style={{fontSize:'25px', textAlign:'center', marginBottom:'5px'}}>LOGIN</div>
                    <input style={input_Style} type="email" placeholder="Email" onChange={(e) => mailHandler(e)} />
                    <input style={input_Style} type="password" placeholder="Password" onChange={(e) => passHandler(e)} />
                    <button style={{...create_button_style,width:'50%',marginLeft:'25%',background:`radial-gradient(circle, ${PRIMARY_COLOR} 40%,${SECONDARY_COLOR})`}} type="submit" onClick={(e) => submitHandler(e)}>SUBMIT</button>
                </form>

                <br></br>

                <Link style={create_button_style} to="/signup">Sign up</Link>
                <br></br>
                <Link style={create_button_style} to="/forgot">Forgot Password</Link>

        </div>
    )
}