import { useEffect, useState } from "react"
import { PRIMARY_COLOR,SECONDARY_COLOR, CONTRAST_COLOR1, CONTRAST_COLOR2, TERTIARY_COLOR, DARK_COLOR1, DARK_COLOR2 } from "../../constants/colors"
import { createComment, getComments } from "../api.js/service"

export default function Post(props){


    const parent__container={
        display:'flex',
        flexDirection:'column',
        margin:'18px 13vw',
        width:'75%',
        justifyContent:'center',
        alignItems:'left',
        border:`10px groove ${PRIMARY_COLOR}`,
        borderRadius:'15px',
        background:`${CONTRAST_COLOR1}`
    }

    const image__style={
        objectFit:'contain',
        width:'100%',
        height:'100%',
        // alignItems:'center',
        // alignSelf:'center'
        // position:'relative',
        // transform:'translate(-50%,0)',
        // // top:'50%',
        // left:'65%'


    }
    const image__container={
        alignItems:'center',
        alignSelf:'center'
    }
    const caption__container={
        fontSize:'25px',
        fontWeight:'bold',
        textAlign:'center',
        color:`${SECONDARY_COLOR}`,
        background:`linear-gradient(to right, ${PRIMARY_COLOR} 50%, ${SECONDARY_COLOR} 100%)`,
        padding:'5px',

    }

    const user__container={
        fontSize:'17.5px',
        fontStyle:'italic',
        // padding:'10px',
        textAlign:'left',
        color:`${PRIMARY_COLOR}`,
        background:`linear-gradient(to right, ${SECONDARY_COLOR} 50%, ${PRIMARY_COLOR} 100%)`,
        // borderBottom:`5px solid ${CONTRAST_COLOR1}`,
        padding:'5px',

    }
    const add__comment__container={
        display:'flex',
        // width:'100%',
        flexDirection:'row',
        marginRight:'5px',
        marginLeft:'5px',
        marginTop:'5px',
    }

    const add_comment_input={
        width:'78%', 
        background:'',
        marginRight:'5px',
        height:'20px',
        fontSize:'15px',
        border:`5px solid ${PRIMARY_COLOR}`,
        background:CONTRAST_COLOR2,
        
    }

    const add_comment_button={
        width:'22%',
        textAlign:'center',
        // height:'32px',
        border:`4px solid ${SECONDARY_COLOR}`,
        background:PRIMARY_COLOR,
        fontSize:'15px',
        fontWeight:'bold',
        color:SECONDARY_COLOR,
        cursor:'pointer',
    }

    const show__comment__container={

        display:'flex',
        width:'100%',
        flexDirection:'row',
        borderBottom:`1.5px solid ${CONTRAST_COLOR2}`,
        
    }
    const like__container={
        fontSize:'18px',
        fontStyle:'oblique',
        // padding:'10px',
        color:`${SECONDARY_COLOR}`,
        background:`linear-gradient(to left, ${SECONDARY_COLOR} 0%, ${PRIMARY_COLOR} 100%)`,
    }


    const [comment,setComment]=useState('');
    const [comments,setComments]=useState();
    const [commentOpen,setCommentOpen]=useState(false);

    async function commentHandler(e){
        e.preventDefault(); 
        console.log(comment);
        const newComment={
            post:props.post._id,
            data:comment,
            poster:props.logedIn._id
        };
        const res=await createComment(newComment);
        // const res=await createComment({
        //     post:props.post._id,
        //     data:comment,
        //     poster:props.logedIn._id
        // })
        setCommentOpen(!commentOpen);
        console.log(comments);
        // setComments({
        //     ...comments,
        //     data:comments.data.push(newComment)
        // })
    }
    // console.log(props);
    useEffect(async()=>{
        const res=await getComments({
            post:props.post._id
        });
        setComments(res);
    
    },[commentOpen]);

    // async function showCommentHandler(e){
    //     e.preventDefault();
    //     if(!commentOpen){
    //     const res=await getComments({
    //         post:props.post._id
    //     });
    //     setComments(res);
    //     console.log(res);
    //     setCommentOpen(true);
    // }
    // else{
    //     setCommentOpen(false);
    // }

    // }
    console.log(comments);  
    return(
        <div style={parent__container}>
            <div style={caption__container}>{props.user}</div>
            <div style={user__container}>{props.post.caption}</div>
            <div style={image__container}>
                <img  style= {image__style} src={props.post.image} alt="post"></img>
            </div>
            <div style={like__container}>Likes: {props.post.likes}</div>
            {props.logedIn && <div style={add__comment__container}>
                <input type="text" placeholder="Comment"  style={add_comment_input} onChange={(e)=>setComment(e.target.value)}/>
                <button type='submit' style={add_comment_button} onClick={(e)=>commentHandler(e)}>Add</button>
            </div>}
            <div>
                {!comments ? <div>No Comments</div> :
                    comments?.data?.map((ele)=>{
                        return <div style={show__comment__container}> 
                            <div>{ele.poster.name}</div>
                            <div>: {ele.data}</div>
                        </div>
                    
                    }
                )}
            </div>

        </div>

    )

};