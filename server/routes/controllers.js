const User=require('../models/user.js');
const Post=require('../models/posts.js');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
var nodemailer = require('nodemailer');
const Comment = require('../models/comment.js');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'instagramclone0201@gmail.com',
      pass: 'fjdklahntkkfsdwm'
    }
  });

async function login(req,res){
    const email=req.body.email;
    const pass=req.body.pass;
    // console.log(email,pass);

    if(!email||!pass){
        res.status(491).json("data not sent");
        return ;
    }
    
   const userPresent=await User.findOne({email:email});
//    console.log("userpresnt",userPresent);
   if(userPresent){
       const token=jwt.sign(email,"f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829");
    //    console.log(userPresent.password);
       const passFound=await bcrypt.compare(pass,userPresent.password);    

       if(passFound){
           res.status(292).json({token,userPresent});
           return {userPresent};
       }
       else{
           res.status(293).json("incorrect password");
           return;
       }
   }
   else{
       res.status(295).json("user not found");
       return ;
   }
}

async function signUp(req,res){
    const name=req.body.name;
    const email=req.body.email;
    const pass=req.body.pass;
    const phone=req.body.phone;
    // console.log(name,email,pass,phone);


    if(!name||!email||!pass||!phone)
    {
        res.status(491).json("data not sent");
        return ;
    }
    const duplicate=await User.findOne({email:email});
    // console.log("dup",duplicate.email);
    const duplicate1=await User.findOne({phone:phone});

    if(duplicate||duplicate1){    
        res.status(296).json("user already exists");
    }
    else{
        const newPass=await bcrypt.hash(pass,12);
        const newUser=new User({
            name,
            email,
            phone,
            password:newPass

        });
        newUser.save().then(()=>res.status(202).json("user added")).catch(err=> res.status(500).json(err));
    }
}

async function resetPass(req,res){
    const email=req.body.userid;
    // console.log(email);

    if(!email){
        res.status(491).json("data not sent");
        return;
    }
    const userPresent=await User.findOne({email:email});

    if(!userPresent){
        res.status(295).json("user not found");
        return ;
    }
    else{
        const otp=Math.random().toString().substring(2,8);
        var mailOptions = {
            from: 'youremail@gmail.com',
            to: email,
            subject: `OTP for resetting passwordfor ${email}`,
            text: `Your OTP is: ${otp}`
          };
          var stat=202;
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              stat=496;
            } else {
            //   console.log('Email sent: ' + info.response);
              stat=202;
            }
          });
          const newOtp=await bcrypt.hash(otp,12);
          res.status(stat).json(newOtp);


        //yaha pe otp bana ke mail krna hai
    }

    // const phone=await userPresent.phone;
    // console.log(phone);

    // if(!phone){
    //     res.status(297).json("invalid phone number");
    //     return;
    // }
    // else{
    //     res.status(202).json(otp);
    //     // console.log(otp);
    //     return otp;

    // }



}

async function passSet(req,res){
    const email=req.body.userid;
    const newPass=await bcrypt.hash(req.body.pass,12);
    // console.log(email,newPass,req.body);
    if(!email)
    {
        res.status(491).json("email not sent");
        return;
    }
    
    const user=await User.findOneAndUpdate({email:email},{password:newPass});
    if(!user){
        res.status(295).json("user not found");
        return;
    }
    else{
        res.status(202).json('password updated');
        return true;

    }

}

async function check(req,res){
    const userOtp=await req.body.userOtp;
    const realOtp=await req.body.realOtp;

    // console.log(userOtp,realOtp);
    const ret=await bcrypt.compare(userOtp,realOtp);
    // console.log(ret);
    if(ret){
        res.status(202).json("match");
        return true;
    }
    else{
        res.status(295).json("not match");
        return false;
    }

}
//repeatedfunc 
// async function createPost(req,res){
//     const caption=req.body.caption;
//     const image=req.body.image;
//     const likes=req.body.likes;
//     const user=req.body.user;

//     // console.log(Post.getIndexes());
//     const newPost=new Post({
//         caption,
//         image,
//         likes,
//         user
//     })

//     newPost.save().then(()=>res.json("added"));

//     const user1=await Post.findOne({user:user}).populate("user");
//     // console.log(user1);
// }

async function userDetails(req,res){
    const userid=req.body.userId;
    // console.log(req.body);

    const userDet=await User.findOne({_id:userid});
    const userPost=await Post.find({user:userid});

    // console.log(userDet);
    // console.log(userPost);
    
    res.status(202).json({
        user:{
            name:userDet.name,
            email:userDet.email,
            phone:userDet.phone
        },
        posts:userPost
    });

    return 
}

async function createPost(req,res){

    const post=await req.body.post;
    const img=await req.body.img;
    // console.log("chala",post);
    // console.log(post,img);
    const temp={...post,image:img};
    // console.log(temp);
    const newPost=new Post(temp);

    newPost.save().then(()=>res.json("chala").status(202)).catch(err=> res.json("eror").status(505));
}

async function sendAll(req,res){
    const posts=await Post.find().populate("user");

    if(!posts){
        res.status(402).json("no post");
    }
    // console.log(posts);
    res.status(202).json(posts);
    // console.log(posts);
    // return posts;
}

async function addComment(req,res){
    const poster=await req.body.poster;
    const data=await req.body.data;
    const post=await req.body.post;

    newComment=new Comment({
        poster,
        post,
        data
    });

    newComment.save().then(()=>res.json("chala"));


}

async function getComments(req,res){
    const post=await req.body.post;
    if(post){
    const comments=await Comment.find({post:post}).populate("poster");

    // console.log(comments);
    // console.log(post);
    res.json(comments);
    return comments;
    }


}

async function find(req,res){
    const name=await req.body.name;
    if(name){
    const resp=await User.findOne({name:name});
    // console.log(resp);
    if(resp){
        const res2=await Post.find({user:resp._id}).populate("user");
        // console.log(res2);
        res.json(res2);
        return res;
    }    
    else {
        res.json(false);
        return false;
    }
}
    res.json(false);
    return false;
}



module.exports={login,signUp,resetPass,passSet,check,createPost,userDetails,createPost,sendAll,addComment,getComments,find};