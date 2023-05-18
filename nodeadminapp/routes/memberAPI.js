var express = require('express');
var router = express.Router();

// DRM DB 프로그램을 위한 모델 객체 참조
const db = require('../models/index');

// 모든 회원목록 조회 요청 및 반환 라우팅메소드
router.get('/', async (req, res, next) => {
    // 모든 회원목록 조회 요청 및 반환
    const members = await db.Member.findAll({});
    res.json(members);
});
// 신규회원 정보등록 요청 및 응답 라우팅 메소드
router.post('/create', async (req, res, next) => {
    // 신규회원 정보등록 요청 및 응답
    const member = await db.Member.create({
        email: req.body.email,
    });
    res.json(member);
});

// 기존 회원 정보 수정 요청 및 응답 라우팅 메소드
router.post('/update', async (req, res, next) => {
    // 기존 회원 정보 수정 요청 및 응답
    const member = await db.Member.update({
        email: req.body.email,
    }, {
        where: {
            member_id: req.body.memberId,
        }
    });
    let result = {
        code: 200,
        message: '정상적으로 수정되었습니다.',
        data: member,
    }
    res.json(result);
});

// 기존 단일 회원 정보 삭제처리 요청 및 응답 라우팅 메소드
router.post('/delete', async (req, res, next) => {
    // 기존 단일 회원 정보 삭제처리 요청 및 응답
    const member = await db.Member.destroy({
        where: {
            member_id: req.body.memberId,
        }
    });
    let result = {
        code: 200,
        message: '정상적으로 삭제되었습니다.',
        data: member,
    }
    res.json(result);
});

// 특정 단일 회원 정보 조회 요청 및 응답 라우팅 메소드
// 쿼리스트링 방식으로 호출시
router.get('/detail', async (req, res, next) => {
    // 특정 단일 회원 정보 조회 요청 및 응답
    const member = await db.Member.findOne({
        where: {
            member_id: req.query.memberId,
        }
    });
    res.json(member);
});

// 특정 단일 회원 정보 조회 요청 및 응답 라우팅 메소드
// URL 파라미터 방식으로 호출시
router.get('/:memberId', async (req, res, next) => {
    // 특정 단일 회원 정보 조회 요청 및 응답
    const member = await db.Member.findOne({
        where: {
            member_id: req.params.memberId,
        }
    });
    res.json(member);
});
module.exports = router;
