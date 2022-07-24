var express = require("express");
var router = express.Router();
var path = require("path");

/*
    각종 라우팅 메소드를 정의
        - articles.js 라우팅 파일의 기본 호출 주소는 app.js에서 localhost:3000/articles로 설정
        - 실제 사용자가 호출할 주소: http://localhost:3000/articles/path
          - ex) http://localhost:3000/articles/list, http://localhost:3000/articles/create
*/

// 게시글 목록 페이지 호출 라우팅 메소드 - GET
router.get("/list", function (req, res) {
  const articleList = [
    {
      idx: 1,
      title: "게시글 제목 1",
      viewCnt: 100,
      ip: "111.111.111.111",
      displayYn: true,
      register: "David",
      registDate: "2022.02.02",
    },
    {
      idx: 2,
      title: "게시글 제목 2",
      viewCnt: 100,
      ip: "222.111.222.111",
      displayYn: false,
      register: "Kate",
      registDate: "2022.02.02",
    },
    {
      idx: 3,
      title: "게시글 제목 3",
      viewCnt: 300,
      ip: "333.111.333.111",
      displayYn: true,
      register: "Joan",
      registDate: "2022.02.02",
    },
  ];

  // render할 view 파일 전달 시 파일 확장자 생략 가능
  res.render("articles/list", { articleList });

  // 다른 레이아웃으로 렌더링되도록 설정하는 방법
  // res.render("articles/list", { layout: "myLayoutPage" });
});

// 게시글 등록 페이지 호출 라우팅 메소드 - GET
router.get("/create", function (req, res) {
  res.render("articles/create");
});

// 게시글 등록 처리 라우팅 메소드 - POST
router.post("/create", function (req, res) {
  /*
    게시글 등록 처리 과정
      - 웹 브라우저의 form tag로 전달되는 데이터 추출
      - 추출된 사용자 입력값을 DB에 저장
      - 등록 완료 시 특정 화면(view)을 전달 또는 특정 페이지로 이동
  */
  const title = req.body.title;
  const contents = req.body.contents;

  const articleData = {
    title,
    contents,
  };

  res.render("articles/create");
});

// 게시글 수정 페이지 라우팅 메소드 - GET - query string 방식
router.get("/update", function (req, res) {
  /*
    /update로 이동 시 요청되는 GET request의 query string을 key(idx, stock)로 접근하여 추출 
    
    query string으로 전달되는 값 추출
    - query string으로 전달되는 값은 req.query를 통해 추출 가능
  */
  const queryStringIdx = req.query.idx;
  // const queryStringStock = req.query.stock;

  const article = {
    idx: 1,
    title: "title 1",
    contents: "contents 1",
    viewCnt: 100,
    ip: "111.111.111.111",
    register: "Tom",
    registDate: "2022.02.01",
  };

  res.render("articles/modify", { article });
});

router.get("/update/test", function (req, res) {
  /*
    기타 res 객체 메소드 테스트
      - res.render();
      - res.redirect();
      - res.json(): 호출 결과를 json 데이터로 웹 브라우저에 전달
      - res.send(): 만능 메소드, 어떤 값이든 서버에서 웹 브라우저로 전달 가능
      - res.sendFile(): 서버 상에 존재하는 파일을 웹 브라우저에서 다운로드 가능하도록 함
  */

  const product = {
    idx: 1,
    productName: "LG notebook",
    stock: 100,
    price: 12000000,
  };

  // res.json(product);

  // res.send(product);

  // res.sendFile(path.join(__dirname, "testImage.jpg"));
});

// 게시글 수정 페이지 라우팅 메소드 - GET - parameter 방식
router.get("/update/:idx", function (req, res) {
  /*
    parameter로 전달되는 값 추출
    - query string으로 전달되는 값은 wild card에서 지정한 키값을 통해 추출 가능
    - wild card 방식으로 호출하는 라우팅 메소드는 라우팅 파일 내 최하단에 배치해야 함
      - /update/test에 GET 요청 보낼 때 처리해주는 라우팅 메소드가 wild card 방식으로 호출하는 라우팅 메소드 하단에 정의되어 있을 때 문제 발생
      - http://localhost:3000/articles/test로 GET 요청 보냈을 때 의도치 않게 해당 라우팅 메소드가 해당 요청을 처리하게 될 수도 있기 때문
  */
  const parameterIdx = req.params.idx;

  console.log(parameterIdx);

  const article = {
    idx: 1,
    title: "title 1",
    contents: "contents 1",
    viewCnt: 100,
    ip: "111.111.111.111",
    register: "Tom",
    registDate: "2022.02.01",
  };
  res.render("articles/modify", { article });
});

// 게시글 수정 처리 라우팅 메소드 - POST
router.post("/update", function (req, res) {
  /*
    게시글 수정 처리 과정
      - 웹 브라우저의 form tag로 전달되는 데이터 추출
      - 추출된 사용자 입력값을 DB에 저장
      - 수정 완료 시 특정 페이지로 이동
  */
  const title = req.body.title;
  console.log(title);

  // redirect('실제 서비스 되는 url 주소')
  res.redirect("/articles/list");
});

// 게시글 삭제 처리 라우팅 메소드 - GET
router.get("/delete", function (req, res) {
  /*
    게시글 삭제 처리 과정
      - 삭제하고자 하는 게시글 idx 추출
      - 해당 게시글 idx 기준으로 DB에서 게시글 삭제
      - 삭제 완료 시 특정 페이지로 이동
  */
  const articleIdx = req.query.idx;
  console.log(articleIdx);

  res.redirect("/articles/list");
});

// 해당 articles.js 모듈의 라우터 객체를 외부에 노출
module.exports = router;
