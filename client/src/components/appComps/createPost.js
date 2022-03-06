import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitPost } from "../api.js/service";

const initialValue={
    likes:0,
    caption:'',
    user:''

}
export default function CreatePost() {

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
        navigate('/userProfile');
    }

    return (
        <form>
            <input type="text" name="caption" placeholder="caption" onChange={(e) => changeHandler(e)} />
            <input type="file" name="image" placeholder="caption" onChange={(e) => setImg(e.target.files[0])} />
            <button type="submit" onClick={(e) => submitHandler(e)}>Submit Post</button>
        </form>
    )
}