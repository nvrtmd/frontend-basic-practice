// 동기 처리

var express = require("express");
var router = express.Router();

/* 
    models/index.js DB 객체 참조

    db 객체는 sequelize, Sequelize, Member 속성을 가진 객체
      
    Member는 member.js의 내용을 참조
*/
var db = require("../models/index");

/* 
    회원 목록 전체 조회
        - 호출 주소: http://localhost:3000/members/list
*/
router.get("/list", function (req, res, next) {
  /* 
      DB에서 데이터 목록 조회
        - DB에서 모든 데이터 불러오기 -> then 내 콜백 함수로 받아줌
        - 에러 발생 시 catch에서 잡힘 -> next()로 에러 객체 넘겨서 처리
  */
  db.Member.findAll()
    .then((result) => {
      console.log("전체 회원 목록: ", result);
      res.render("members/list", { members: result });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
