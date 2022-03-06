import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DARK_COLOR1, PRIMARY_COLOR, SECONDARY_COLOR } from "../constants/colors";
import { allPosts } from "./api.js/service";
import Post from "./appComps/post";

export default function Home(){

    // const navigate=useNavigate();
    const pageStyle={
        background:`${DARK_COLOR1}`,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
    }

    const profile_button_style={
        background:`${PRIMARY_COLOR}`,
        height:'50px',
        border:`solid 5px ${SECONDARY_COLOR}`,
        borderRadius:'10px',
        width:'30vw',
        color:`${DARK_COLOR1}`,
        fontSize:18,
        
    }
    const userStyle={

    }
    const [currentUser,setCurrentUser]=useState();
    const [userDisplay,setUserDisplay]=useState();
    const [posts,setPosts]=useState();
    const navigate=useNavigate();
    // let userName;
    useEffect(async()=>{
    if(!localStorage.getItem('token')){
        // console.log(localStorage.getItem('token'));
        navigate('/');
    }
    const userName=await JSON.parse(localStorage.getItem('user'));
    // console.log(userName);
    const allposts=await allPosts();
    // console.log(allposts.data);
    setPosts(allposts.data);
    setCurrentUser(userName);
    setUserDisplay(userName.name);
},[]);

    // console.log(posts);
    function submitHandler(e){
        e.preventDefault();
        navigate('/userProfile');
    }

    // searchHandler(e){

    //     posts.filter(())
    // }
    const [searchKey,setSearchKey]=useState('');
    
    function submitFind(e){
        e.preventDefault();
        console.log("clocked");
        navigate('/find');

    }

    function handleLogout(e){
        e.preventDefault();
        localStorage.clear();
        navigate('/');

    }

    
    return(
        <div style={pageStyle}>
        <p style={userStyle}>Welcome: {userDisplay}</p>
        <button style={profile_button_style} type="submit" onClick={(e)=>submitHandler(e)}>User Profile</button> 
        <input type="text" placeholder='Search Posts' onChange={(e)=>setSearchKey(e.target.value)} />
        <button onClick={(e)=>submitFind(e)}> Find User </button>
        <button onClick={(e)=>handleLogout(e)}>Logout</button>

        {posts&&
            posts.filter((ele)=>(ele.user.name.toLowerCase()).startsWith(searchKey.toLowerCase())||(ele.caption.startsWith(searchKey)))
            .map((ele,i)=>{

                return <Post post={ele} user={ele.user.name} logedIn={currentUser} />
               
            }
            )
        }

        
        </div>
    )
}