import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CONTRAST_COLOR1, CONTRAST_COLOR2, DARK_COLOR1, DARK_COLOR2, PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR } from "../../constants/colors";
import { submitPost } from "../api.js/service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialValue={
    likes:0,
    caption:'',
    user:''

}
export default function CreatePost() {

    toast.configure();

    const [post, setPost] = useState(initialValue);
    const navigate = useNavigate();
    useEffect(async () => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (!token || !user) {
            navigate('/');
        }
        console.log("name", user._id);
        setPost({
            ...post,
            likes: 0,
            user: user._id
        })
    }, []);

    async function changeHandler(e) {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })


    }
    const [img, setImg] = useState();
    // const [url, setUrl] = useState();

    async function submitHandler(e) {
        e.preventDefault();
        toast.info("Creating Post");

        const data = new FormData();
        // var URL;
        data.append("file", img);
        data.append('upload_preset', 'insta-clone');
        data.append("cloud_name", "mehulp1612");
        const options = {
            method: "POST",
            body: data,
        };
        const res=await fetch('https://api.Cloudinary.com/v1_1/mehulp1612/image/upload', options)
        // .then((resp) => resp.json())
        // .then((data) => { URL=data.url })
        // .catch(err => console.log(err));
        const resp1=await res.json();

        // console.log(resp);
        // console.log(data);
        
        // console.log(URL);
        // setPost({
        //     ...post,
        //     image:resp1.url
        // });
        console.log(post);

        const sent=await submitPost(post,resp1.url);
        toast.success("Post Created");
        navigate('/userProfile');
    }

    function homeHandler(e){
        e.preventDefault();
        navigate('/userProfile');
    }

    const form_container={
        display:'flex',
        flexDirection:'column',
        width:'50%',
        // alignItems:'',
        justifyContent:'center',
        // marginTop:'25vw',
        // marginLeft:'25%',
        background:PRIMARY_COLOR,
        padding:'50px',
        border:`ridge 10px ${SECONDARY_COLOR}`
    }
    const page_container={
        background:`${DARK_COLOR1}`,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        minHeight:'100vh',
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

    const button_style={
        background:`radial-gradient(circle, ${PRIMARY_COLOR} 40%,${SECONDARY_COLOR})`,
        height:'50px',
        border:`solid 5px ${SECONDARY_COLOR}`,
        borderRadius:'10px',
        width:'50%',
        color:`${DARK_COLOR1}`,
        fontSize:18,
        cursor:'pointer',
        marginLeft:'25%',
        marginTop:'10px',
    }
    const create_Heading={
        fontSize:'30px',
        color:SECONDARY_COLOR,
        marginBottom:'10px',
        background:PRIMARY_COLOR,
        width:'57.5%',
        textAlign:'center',
        borderRadius:'5px',
    }

    const button_style1={
        background:`${PRIMARY_COLOR}`,
        height:'50px',
        border:`solid 5px ${SECONDARY_COLOR}`,
        borderRadius:'10px',
        width:'30%',
        color:`${DARK_COLOR1}`,
        fontSize:18,
        cursor:'pointer',
        // marginLeft:'25%',
        marginTop:'50px',
    }

    return (
        <div style={page_container}>
            <div style={create_Heading}>CREATE POST</div>
        <form style={form_container}>
            <input style={input_Style} type="text" name="caption" placeholder="Caption" onChange={(e) => changeHandler(e)} />
            <input style={input_Style} type="file" name="image" onChange={(e) => setImg(e.target.files[0])} />
            <button style={button_style} type="submit" onClick={(e) => submitHandler(e)}>Submit Post</button>
        </form>
        <button style={button_style1} onClick={(e)=>{homeHandler(e)}}>Back to Profile</button>
        </div>
    )
}