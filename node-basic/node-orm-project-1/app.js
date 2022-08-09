var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

/*
  require("./models/index.js"): DB 객체
*/
var sequelize = require("./models/index.js").sequelize;

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// 동기 처리 방식의 회원 정보 관리 routing 파일 등록
var membersSyncRouter = require("./routes/members-sync");

// 비동기 처리 방식의 회원 정보 관리 routing 파일 등록
var membersAsyncRouter = require("./routes/members-async");

// 회원 정보 관리 api routing 파일 등록
var membersApiRouter = require("./routes/members-api");

var app = express();

// MySQL DB 서버와 동기화 처리 및 모델 기반 물리 테이블 생성 처리 제공 - 서버 실행 시 테이블 생성됨
sequelize.sync();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// 동기 처리 방식의 회원 정보 관리 routing 파일 기본 url 주소 설정
app.use("/members-sync", membersSyncRouter);

// 비동기 처리 방식의 회원 정보 관리 routing 파일 기본 url 주소 설정
app.use("/members-async", membersAsyncRouter);

// 회원 정보 관리 api routing 파일 기본 url 주소 설정
app.use("/members-api", membersApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
