import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CONTRAST_COLOR1, CONTRAST_COLOR2, DARK_COLOR1, PRIMARY_COLOR, SECONDARY_COLOR } from "../constants/colors";
import { findProfile } from "./api.js/service";
import Post from "./appComps/post";
import Footer from "./footer/footer";


export default function Find(){
const [searchUser,setSearchUser]=useState('');
const [posts,setPosts]=useState();
const navigate=useNavigate();
toast.configure();

const pageStyle={
    background:`${DARK_COLOR1}`,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    minHeight:'100vh',
}

const button_Style={
    background:`${PRIMARY_COLOR}`,
        height:'50px',
        border:`solid 5px ${SECONDARY_COLOR}`,
        borderRadius:'10px',
        width:'35%',
        color:`${DARK_COLOR1}`,
        fontSize:18,
        cursor:'pointer',
        marginTop:'10px',
        marginBottom:'10px',
}

const search_style={
        width:'60%',
        fontSize:'20px',
        background:CONTRAST_COLOR2,
        border:`solid 2px ${CONTRAST_COLOR1}`,
        textAlign:'center',
        marginRight:'10px',
}

const search_Container={
    display:'flex',
    flexDirection:'row',
    width:'65vw',
    flexWrap:'wrap',
    alignItems:'baseline',
    justifyContent:'center',

}


const [loggedIn,setLoggedIn]=useState(false);

useEffect(async()=>{
    if(localStorage.getItem('token')){
        // console.log(localStorage.getItem('token'));
        setLoggedIn(true);
    }},[]);

async function findUser(e){

    e.preventDefault();
    toast.info("searching",750);

    const res=await findProfile({email:searchUser});
    console.log(res);
    if(res){
        setPosts(res);
        toast.dismiss();
        res.data?toast.success("User Found"):toast.error("Username not found");
    }

    console.log(res);
}

function backHandler(e){
    e.preventDefault();
    navigate('/home');
}

return(
    <div style={pageStyle}>
        <div style={search_Container}>
            <input type="text" style={search_style} placeholder='Search Posts by Email' onChange={(e)=>setSearchUser(e.target.value)} />
            <button type="submit" style={button_Style} onClick={(e)=>findUser(e)}>Find User</button>
        </div>
        <div>
            {posts?.data.length>0?
                posts.data.map((ele,i)=>{

                    return <Post post={ele} user={ele.user.name} logedIn={loggedIn} />
                    
                }
                )
                
            
                // !posts?.data && 
                : <div>No User Found</div>
            }
        </div>

        <button style={button_Style} onClick={(e)=>{backHandler(e)}}>Back To Home</button>
        <div style={{marginBottom:'50px'}}></div>

        <Footer></Footer>

    </div>
)
}
