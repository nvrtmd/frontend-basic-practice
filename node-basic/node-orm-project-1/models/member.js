module.exports = (sequelize, DataTypes) => {
  /*
  함수를 export 하는 것
    - 매개변수: sequelize, DataTypes
    - 반환: sequelize 객체의 define() 메소드 사용 후 결과물

  member 테이블과 맵핑되는 member 모델 정의
    - sequelize.define() 메소드를 통해 물리 테이블과 맵핑되는 모델 클래스를 생성하고 반환
    - 맵핑되는 물리 테이블명은 단수 형태로 정의: 실제 생성되는 물리 테이블은 복수 형태로 생성됨
      - ex. member(모델명) -> members(물리 테이블명)

  sequelize 객체의 define() 메소드 
    - sequelize.define('맵핑되는 물리 테이블명', {테이블의 데이터 구조 정의}, {테이블 생성 옵션 정보});
      - 맵핑되는 물리 테이블명: 회원 정보 테이블과 맵핑되는 실제 회원 정보 모델 모듈을 정의
      - 해당 테이블의 데이터 구조를 정의함: VARCHAR, NOTNULL 등 데이터 타입 정의
      - 테이블 생성 옵션 정보: timestamp, paranoid 설정 제어
*/
  return sequelize.define(
    "member",
    {
      userid: {
        type: DataTypes.STRING(100), // VARCHAR(100)
        allowNull: false, //Null 허용 여부
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      timestamps: true, // 물리적인 테이블의 createdAt(신규 생성 일시), updatedAt(수정 일시) 컬럼이 자동 추가됨
      paranoid: true, // deletedAt 컬럼이 자동 추가되며 데이터 삭제 시, 삭제 일시 정보가 자동 마킹되고 물리적인 데이터는 삭제되지 않되 백엔드에서는 삭제된 것으로 인식
    }
  );
};
