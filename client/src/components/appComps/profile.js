import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CONTRAST_COLOR2, CONTRAST_COLOR1, TERTIARY_COLOR, SECONDARY_COLOR, DARK_COLOR1, PRIMARY_COLOR } from "../../constants/colors";
import { getUserData } from "../api.js/service";
import Post from "./post";





export default function Profile(){


    const container__style={
        display:'flex',
        flexDirection:'column',
        // justifyContent:'center',
        alignItems:'center',
        // width:'85%',
        background:`${DARK_COLOR1}`,
    }

    const create_button_style={
        background:`${PRIMARY_COLOR}`,
        height:'50px',
        border:`solid 5px ${SECONDARY_COLOR}`,
        borderRadius:'10px',
        width:'30vw',
        color:`${DARK_COLOR1}`,
        fontSize:20,
        
    }
    const create__hover={
        background:`${SECONDARY_COLOR}`,
        border:`solid 5px ${PRIMARY_COLOR}`,


    }

    // const [currentUser,setCurrentUser]=useState();
    const [userDetails,setUserDetails]=useState();
    const [userPosts,setUserPosts]=useState();
        const navigate=useNavigate();

        useEffect(async()=>{
            if(!localStorage.getItem('token')){
                // console.log(localStorage.getItem('token'));
                navigate('/');
            }
            const userName=await JSON.parse(localStorage.getItem('user'));
            // console.log(userName._id);
            const userDet=await getUserData(userName._id);
            // console.log(userDet);
            setUserDetails(userDet.data.user);
            setUserPosts(userDet.data.posts);
    },[]);

    function submitHandler(e){
        e.preventDefault();
        navigate('/createPost');

    }
    console.log("details",userDetails);
    console.log("posts",userPosts);
    return(
        <div style={container__style}>
        {userDetails&&<div>
            {userDetails.name}<br></br>
            {userDetails.email}<br></br>
            {userDetails.phone}<br></br>
        </div>}
        <button style={create_button_style} type="submit" onClick={(e)=>{submitHandler(e)}}>CREATE POST</button>

        {/* <hr width="100%"></hr> */}
        {/* <div style={container__style}> */}
        {userPosts&&
            userPosts.map((ele,i)=>{
                return <Post post={ele} user={userDetails.name} key={i}/>
                // <div>
                //     <ul>
                //         <li>{ele.caption}</li>
                //     <li>{userDetails.name}</li>
                // <li><img src={ele.image} alt="phuka" /></li>
                //     <li>{ele.likes}</li>
                //     </ul>
                //     </div>
    } )
}
            {/* </div> */}
        
       {/* <p>{userPosts && <p>{JSON.stringify(userPosts)}</p>}</p> */}
        
        </div>
    )

}