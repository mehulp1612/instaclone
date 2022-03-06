const { application } = require('express');
const express=require('express');
const { login, signUp, resetPass, passSet, check, createPost, userDetails, sendAll, addComment, getComments, find } = require('./controllers');

const router=express.Router();

router.post('/login',login);

router.post('/signup',signUp);
router.post('/reset',resetPass)
router.post('/newPass',passSet);
router.post('/check',check);
router.post('/createPost',createPost);
router.post('/profile',userDetails);
router.post('/postCreate',createPost);
router.get('/all',sendAll);
router.post('/comment',addComment);
router.post('/getComment',getComments);
router.post('/find1',find);
module.exports=router;