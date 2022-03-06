const mongoose=require('mongoose');
const postSchema=mongoose.Schema({

    caption:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    likes:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // comment:{
    //     userid:{
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:'User',
    //     },
    //     data:{
    //         type:String,
    //     }
    // }

},

{
    timestamps:true,
}
);


const Post=mongoose.model('Post',postSchema);
module.exports=Post;
