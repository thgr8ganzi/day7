var express = require('express');
var router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');
const {isLoggedIn} = require('./authorizeMiddleware');

/* GET home page. */
router.get('/', isLoggedIn,function(req, res, next) {
      res.render('index', { title: 'Express' });
});

router.get('/login', async function(req, res, next) {
    res.render('login.ejs',{layout:'loginLayout.ejs',message:''});
});

router.post('/login', async (req, res, next) => {
    const {admin_id, admin_password} = req.body;
    const admin = await db.Admin.findOne({
        where: {
          admin_id,
        }
    });
    console.log(admin)
    if(admin == null) {
        res.render('login.ejs',{layout:'loginLayout.ejs',message:'존재하지 않는 관리자 계정입니다.'});
        return
    }
    const result = await bcrypt.compare(admin_password, admin.admin_password);
    if(!result) {
        res.render('/login.ejs',{layout:'loginLayout.ejs',message:'비밀번호가 일치하지 않습니다.'});
        return
    }
    /*
    * 서버 세션에 로그인한 사용자 정보를 저장한다.
    * 로그인한 사용자 정보 중 중요 정보를 서버 세션으로 저장하고
    * 세션 아이디 값을 쿠키에 담아 브라우저에 전달한다.
    * 브라우저는 인증시 발급한 쿠키를 가지고 다시 로그인 없이 서버에서 사용자를 인식한다.
    * 브라우저는 서버에 서비스를 요청시마다 발급된쿠키를 서버에 전달하고 서버는 쿠키안에 있는 세션 아이디 값을
    * 기준으로 서버 메모리에 저장된 세션목록에서 사용자 정보를 인식한다
    *
    * 세션이란 사용자 단위로 각각의 사용자 정보를 관리하는 단위
    * */
    //세션에 추가한 동적속성과 값을 최종 저장한다.
    req.session.isLogin = true;

    req.session.loginUser ={
        userSeq:admin.admin_member_id,
        userId:admin.admin_id,
        userName:admin.admin_name
    };

    req.session.save(function(){
        res.redirect('/');
    });

});
// 로그인한 사용자의 프로필 소개 페이지
router.get('/profile', isLoggedIn, async (req,res,next)=>{
    res.render('profile.ejs',{userData : req.session.loginUser})
});
router.get('/logout', isLoggedIn, async (req,res,next)=>{
    req.session.destroy(function(err){
        res.redirect('/login');
    });
})

module.exports = router;
