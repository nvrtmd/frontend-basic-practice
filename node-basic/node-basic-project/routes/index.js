var express = require("express");
/*
    express 객체의 Router() 메소드를 호출하여 사용자의 요청과 응답을 관리해주는 router 객체 생성
        - 사용자가 호출하는 url에 대한 요청과 응답을 router 객체가 처리
*/
var router = express.Router();
/* 
  router.get()
    - 사용자의 요청에 대해 응답(json 데이터, view 파일 등)을 제공
    - 주로 데이터를 조회하여 결과물을 전달하는 용도로 사용
    - router.get(기본 호출 경로 아래 호출 하위 주소, 요청에 대한 응답 콜백 함수)
    - 콜백 함수의 인자 
      - req 객체 (HTTP request)
        - 사용자 요청 시 웹 브라우저에서 전달되는 각종 요청 정보를 추출할 수 있음
      - res 객체 (HTTP response)
        - 웹 서버에서 웹 브라우저로 전달하고자 하는 응답 정보를 제어하는 객체
      - next 객체
        - 요청과 응답 사이에서 특정 기능을 미들웨어 형태로 제어하는 기능
    - render() 메소드
      - res.render(view 파일의 경로와 이름, 해당 view 파일에 전달할 json 데이터)
      - 지정된 view 파일(html 페이지)을 웹 브라우저로 전달
      - 특정 view 파일을 호출 -> 호출 시 json 데이터를 전달하며 최종 view의 결과값을 웹 브라우저에 반환
*/
router.get("/", function (req, res, next) {
  // index.ejs view 파일에 json 데이터 전달하여 render
  res.render("index", {
    title: "INDEX",
    name: "Kate",
    email: "kate1234@test.com",
  });
});

router.get("/test", function (req, res, next) {
  // path가 /test일 때에도 index.ejs를 render (path가 /일 때와는 다른 json 데이터를 전달)
  res.render("index", {
    title: "TEST",
    name: "David",
    email: "david1234@test.com",
  });
});

router.get("/sample", function (req, res, next) {
  /*
    sample.ejs view 파일에 product json 데이터를 전달아여 render
    - 사용자가 웹 브라우저를 통해 http://localhost:3000/sample 경로를 호출하면 
      해당 url의 기본 라우팅 주소가 일치하는 라우팅 파일(이 경우엔 index.js)이 관련 요청 받고 
      호출 방식(get)과 호출 path(/sample)가 동일한 라우팅 메소드가 해당 사용자의 요청을 처리
  */
  var product = {
    pno: 1000,
    productName: "notebook",
    brand: "LG",
    price: 12000,
  };
  res.render("sample", { product });
});

module.exports = router;
