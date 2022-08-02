const path = require("path");
const Sequelize = require("sequelize");

/*
  개발 모드 환경 설정
    - 환경 변수
    - 실배포 시 'production'으로 변경
*/
const env = process.env.NODE_ENV || "development";

// db 연결 환경 설정 정보
const config = require(path.join(__dirname, "..", "config", "config.js"))[env];

// db 객체 생성
const db = {};

// db 연결 정보로 시퀄라이즈 ORM 객체 생성
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

/*
  db 처리 객체에 시퀄라이즈 정보 맵핑 처리
    - 이후 db 객체를 통해 데이터 관리 가능
    - sequelize: db 연결 정보를 포함한 db 제어 객체 속성 (CRUD)
    - Sequelize: Sequelize 패키지에서 제공하는 각종 데이터 타입 및 관련 객체 정보
*/
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 회원 모델 모듈 파일 참조 및 db 속성 정의
db.Member = require("./member.js")(sequelize, Sequelize);

// db 객체 외부로 노출
module.exports = db;
