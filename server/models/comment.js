const mongoose=require('mongoose');
const commentSchema=mongoose.Schema({

    poster:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },

    data:{
        type:String
    }
},
    {
        timestamps:true,
    },
);
const Comment=mongoose.model('Comments',commentSchema);
module.exports=Comment;
