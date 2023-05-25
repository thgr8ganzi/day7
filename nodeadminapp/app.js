var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require('./models/index').sequelize; // 시퀄라이즈 ORM 객체

// ejs 레이아웃 모듈 추가
const expressLayouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const articleRouter = require('./routes/article');
const memberAPIRouter = require('./routes/memberAPI');
const adminRouter = require('./routes/admin');
require('dotenv').config(); // .env 파일의 환경변수를 process.env 객체에 추가

var app = express();
sequelize.sync(); // DB 연결

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 레이아웃 설정
app.set('layout', 'layout.ejs'); // 모든 ejs 파일의 기본 레이아웃 ejs 파일명을 지정한다.
app.set("layout extractScripts", true); // 오리지날 컨텐츠 ejs 파일내의 스크립트 태그를 추출하여 레이아웃 ejs 파일에 여부
app.set("layout extractStyles", true);
app.set("layout extractMetas", true);
app.use(expressLayouts);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 어플리케이션 미들웨어 호출1
app.use((req, res, next) => {
  console.log('미들웨어 호출', Date.now())
  next();
})

// 어플리케이션 미들웨어 호출2
app.use('/user/:id',(req, res, next) => {
  const aid = req.params.id;
  console.log('미들웨어 호출2', req.method)
  res.send('사용자 정보' + aid)
})


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/article', articleRouter);
app.use('/api/members', memberAPIRouter);
app.use('/admin', adminRouter); // 관리자 라우터 추가

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
