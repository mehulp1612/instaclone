import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "../api.js/service.js";
import ReCAPTCHA from "react-google-recaptcha";



export default function Login() {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [pass, setPass] = useState('');
    const [display, setDisplay] = useState("");

    function mailHandler(e) {
        setId(e.target.value);
    }
    function passHandler(e) {
        setPass(e.target.value);
    }
    async function submitHandler(e) {
        // console.log(id,pass);
        e.preventDefault();
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
        }
        else if (res.status == 293) {
            setDisplay("Incorrect pass");

            setTimeout(() => {
                setDisplay("");

            }, 2500);

        }
        else {

            setDisplay("Incorrect id");

            setTimeout(() => {
                setDisplay("");
            }, 2500);
        }

    }

    function captchaHandler(value){

        console.log(value);

    }

    return (
        <>
            {!display && <>
                <form>
                    <input type="email" placeholder="email" onChange={(e) => mailHandler(e)} />
                    <input type="password" placeholder="password" onChange={(e) => passHandler(e)} />
                    <ReCAPTCHA
                        sitekey="6Lev5KAeAAAAAN6zLaXxpVgXkWiuwhr6w4pGBClu"
                        onChange={captchaHandler}
                    />
                    <button type="submit" onClick={(e) => submitHandler(e)}>Submit</button>
                </form>

                <br></br>

                <Link to="/signup">Sign up</Link>
                <br></br>
                <Link to="/forgot">Forgot Password</Link>
            </>}
            {display && <h2>{display}</h2>}
        </>
    )
}