import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CONTRAST_COLOR1, CONTRAST_COLOR2, DARK_COLOR1, PRIMARY_COLOR, SECONDARY_COLOR } from "../constants/colors";
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
        width:'30%',
        color:`${DARK_COLOR1}`,
        fontSize:18,
        cursor:'pointer',
        
    }

    const two_button_style={
        display:'flex',
        flexDirection:'row',
        width:'75%',
        margin:'10px 0',
        justifyContent:'space-around',
    }
    const userStyle={
        margin:'10px',
        fontSize:20
    }

    const search_style={
        width:'60%',
        fontSize:'20px',
        background:CONTRAST_COLOR2,
        border:`solid 2px ${CONTRAST_COLOR1}`,
        textAlign:'center',
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
        <p style={userStyle}>Welcome to InstaClone</p>
        <div style={two_button_style}>
            <button style={profile_button_style} onClick={(e)=>submitFind(e)}> Find User </button>
            <button style={profile_button_style} type="submit" onClick={(e)=>submitHandler(e)}>{userDisplay}</button> 
            <button style={profile_button_style} onClick={(e)=>handleLogout(e)}>Logout</button>
        </div>
        
        <input style={search_style} type="text" placeholder='Search Posts by Username or Caption' onChange={(e)=>setSearchKey(e.target.value)} />        
        

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