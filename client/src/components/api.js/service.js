import axios from 'axios';

export async function validate(userDetail){

    const res=await axios.post('/login',userDetail);
    // console.log(res);
    return res;


}

export async function sendOtp(userid){
    // console.log(userid);
    const res=await axios.post('/reset',userid);
    console.log("service mei",res);
    
    return res;
}

export async function passwordChanger(user){
    const res=await axios.post('/newPass',user);
    return res;
}

export async function createUser(userData){
    const res=await axios.post('/signUp',userData);
    return res;
}

export async function checkOtp(userData){
    const res=await axios.post('/check',userData);
    return res;
}
export async function getUserData(userId){
    // console.log(userId);
    const res=await axios.post('/profile',{userId});
    // console.log(res);
    return res;
}

export async function submitPost(post,img){
    const res=await axios.post('/postCreate',{post,img});
    // console.log("res",res);
    return res;
}
export async function allPosts(){
    const res=await axios.get('/all');
    // console.log(res);
    return res;
}
export async function createComment(data){
    const res=await axios.post('/comment',data);
    return res;
}
export async function getComments(data){
    // console.log(data);
    const res=await axios.post('/getComment',data);
    return res;

}

export async function findProfile(data){
    const res=axios.post('/find1',data);
    return res;
}