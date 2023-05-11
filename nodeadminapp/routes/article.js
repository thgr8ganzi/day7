// 게시글 정보 관리를 위한 웹페이지 요청과 응답을 하기 위한 기본 라우터 파일 정의
// localhost:3000/article
const express = require('express');
const router = express.Router();

// 게실글 정보조회 및 조회결과 웹페이지 요청 및 응답처리 라우팅 메소드
router.get('/list', async (req, res) => {
    let articles = [];
    console.log(articles.length)
    await res.render('article/list',{articles})
});

// 게시글 조회 선택 옵션에 따른 게시글 데이터 조회 처리 요청 및 응답 라우팅 메소드
// 사용자가 조회 옵션 정보를 입력/선택후 조회 버튼을 클릭하면 전달되는 조회옵션 데이터를 추출해 DB 에서
// 데이터를 조회후 다시 list.ejs 조회 목록 데이터를 전달한다.
router.post('/list', async (req, res) => {
    let title = req.body.title;
    let ipadress = req.body.ipadress;
    let displayyn = req.body.displayyn;

    let articles = [
        {
            aid : '1',
            title : '게시글 제목입니다.',
            content : '게시글 내용입니다.',
            ipadress : '111.111.111.111',
            view_cnt : 1,
            display_yn : "N",
            regist_date : Date.now(),
            regist_user : '이지수',
        },
        {
            aid : '2',
            title : '게시글 제목입니다2.',
            content : '게시글 내용입니다2.',
            ipadress : '111.111.111.111',
            view_cnt : 2,
            display_yn : "N",
            regist_date : Date.now(),
            regist_user : '이지수',
        },
        {
            aid : '3',
            title : '게시글 제목입니다3.',
            content : '게시글 내용입니다3.',
            ipadress : '111.111.111.111',
            view_cnt : 100,
            display_yn : "N",
            regist_date : Date.now(),
            regist_user : '이지수',
        },
    ];
    console.log(articles.length)
    res.render('article/list',{articles})
});


// 게시글 등록 웹페이지 요청/응답 처리 라우팅 메소드
router.get('/create', async (req, res) => {
    await res.render('article/create')
});
// 단일 게시글 정보 확인 및 수정 웹 페이지의 요청/응답 라우팅 메소드

router.get('/modify/:aid', async (req, res) => {

    let articleId = req.params.aid;
    let article = {
        aid : '1',
        title : '게시글 제목입니다.',
        content : '게시글 내용입니다.',
        view_cnt : 1,
        display_yn : "N",
        regist_date : Date.now(),
        regist_user : '이지수',
    }
    await res.render('article/modify',{article})
});
// 사용자가 입력한 게시글 등록 데이터 처리 요청 및 응답 라우팅 메소드
router.post('/modify/:aid', async (req, res) => {
//    사용자가 입력한 게시글 정보를 추출
    let aid = req.params.aid;

//     form 태그내 hidden 태그를 이용해 사용자가 수정한 게시글의 aid 정보를 전달받는다.
//     let aid = req.body.aid;

//    사용자가 입력한 게시글 정보를 추출
    let title = req.body.title;
    let content = req.body.content;
    let display_yn = req.body.display_yn;

//     db에 게시글 정보를 수정한다.
    let article = {
        title,
        content,
        display_yn
    }
//     게시글 목록 페이지로 이동
    res.redirect('/article/list')
});

// 사용자가 수정한 게시글 정보처리 요청 및 응답 라우팅 메소드 정의
router.post('/create', async (req, res) => {
    let title = req.body.title;
    let content = req.body.content;
    let display_yn = req.body.display_yn;

//     모든 RDMS 는 테이블에 데이터를 저장하면 실제 저장된 해당 데이터를 백엔드 호출 메소드로 반환해준다
    let article = {
            aid : '1',
            title : '게시글 제목입니다.',
            content : '게시글 내용입니다.',
            ipadress : '111.111.111.111',
            view_cnt : 1,
            display_yn : "N",
            regist_date : Date.now(),
            regist_user : '이지수',
        }


    res.redirect('/article/list')
});

// 선택 게시글 삭제처리 요청 및 라우팅 메소드 정의
router.get('/delete', async (req, res) => {
    let aid = req.query.aid;

    // DB 에서 해당 게시글 정보를 삭제한다.

    // 게시글 목록 페이지로 이동
    res.redirect('/article/list')
});





module.exports = router;