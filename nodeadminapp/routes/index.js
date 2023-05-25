var express = require('express');
var router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', async function(req, res, next) {
  res.render('login.ejs',{layout:'loginLayout.ejs'});
});

router.post('/login', async (req, res, next) => {
    const {admin_id, admin_password} = req.body;
    const admin = await db.Admin.findOne({
        where: {
          admin_id,
        }
    });
    if(!admin) {
        res.redirect('/login',{message:'존재하지 않는 관리자 계정입니다.'});
    }
    const result = await bcrypt.compare(admin_password, admin.admin_password);
    if(!result) {
        res.redirect('/login',{message:'비밀번호가 일치하지 않습니다.'});
    }
  res.redirect('/')

});

module.exports = router;
