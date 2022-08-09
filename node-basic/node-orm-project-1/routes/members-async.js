// 비동기 처리

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
        - 호출 주소: http://localhost:3000/members-async/list
*/
router.get("/list", async (req, res, next) => {
  /* 
      DB에서 데이터 목록 조회
        - DB에서 모든 데이터 불러오기 -> then 내 콜백 함수로 받아줌
        - 에러 발생 시 catch에서 잡힘 -> next()로 에러 객체 넘겨서 처리
  */
  const membersData = await db.Member.findAll();
  res.render("members-async/list", { members: membersData });
});

/* 
    회원 신규 등록 페이지 조회
        - 호출 주소: http://localhost:3000/members-async/create
*/
router.get("/create", async (req, res, next) => {
  res.render("members-async/create");
});

/* 
    회원 신규 등록 처리
        - 호출 주소: http://localhost:3000/members-async/create
*/
router.post("/create", async (req, res, next) => {
  const userid = req.body.userid;
  const username = req.body.username;

  /*
    DB에 입력할 json 데이터 생성
      - 등록할 데이터의 속성은 해당 member 모델의 속성명과 동일해야 함
  */
  const memberData = {
    userid,
    username,
  };

  /*
    신규 회원 DB 등록 처리
  */
  await db.Member.create(memberData);
  res.redirect("/members-async/list");
});

/* 
    회원 정보 수정/삭제 페이지 조회
        - 호출 주소: http://localhost:3000/members-async/modify/:id
*/
router.get("/modify/:id", async (req, res, next) => {
  /*
    와일드카드 방식으로 전달된 사용자 고유 번호 정보 수집
      - 해당 번호로 단일 사용자 정보 불러오기 -> findOne() 메소드 사용
  */
  const id = req.params.id;

  const memberData = await db.Member.findOne({ where: { id: id } });
  res.render("members-async/modify", { member: memberData });
});

/* 
    회원 정보 수정 처리
        - 호출 주소: http://localhost:3000/members-async/modify/:id
*/
router.post("/modify/:id", async (req, res, next) => {
  const id = req.params.id;
  const updateMemberData = {
    userid: req.body.userId,
    username: req.body.userName,
  };

  await db.Member.update(updateMemberData, { where: { id: id } });
  res.redirect("/members-async/list");
});

/* 
    회원 정보 삭제 처리
        - 호출 주소: http://localhost:3000/members-async/delete?id=1
*/
router.get("/delete", async (req, res, next) => {
  const id = req.query.id;
  await db.Member.destroy({ where: { id: id } });
  res.redirect("/members-async/list");
});

module.exports = router;
