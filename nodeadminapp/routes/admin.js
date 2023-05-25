var express = require('express');
var router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');

/* 관리자 */
router.get('/list', async function(req, res, next) {
    res.render('admin/list.ejs');
});

router.get('/create', async function(req, res, next) {
    res.render('admin/create.ejs');
});
router.post('/create', async (req, res, next) => {
    const {admin_id, admin_password, admin_name} = req.body;
    const encryptedPassword = await bcrypt.hash(admin_password, parseInt(process.env.ENCRYPT_COUNT));
    await db.Admin.create({
        admin_id ,
        admin_name,
        admin_password : encryptedPassword,
        reg_date: new Date(),
        reg_member_id: 1,
    });
    res.redirect('/admin/list');
});

module.exports = router;
