import React, { useState } from "react";
import { findProfile } from "./api.js/service";
import Post from "./appComps/post";


export default function Find(){
const [searchUser,setSearchUser]=useState('');
const [posts,setPosts]=useState();


async function findUser(e){

    e.preventDefault();

    const res=await findProfile({name:searchUser});
    if(res){
        setPosts(res);
    }

    console.log(res);
}

return(
    <>
        <input type="text" placeholder='Search Posts' onChange={(e)=>setSearchUser(e.target.value)} />
        <button type="submit" onClick={(e)=>findUser(e)}>Find USer</button>

        <div>
            {posts?.data.length>0?
                posts.data.map((ele,i)=>{

                    return <Post post={ele} user={ele.user.name} logedIn={false} />
                   
                }
                )
                
            
                // !posts?.data && 
                : <div>No User</div>
            }
        </div>

    </>
)
}
