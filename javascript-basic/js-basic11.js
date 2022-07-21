const odd = "홀수입니다.";
const even = "짝수입니다.";

function test() {
  console.log("var1 모듈에서 제공하는 test 함수입니다.");
}

// 해당 js-basic11.js 모듈의 변수/함수를 외부 모듈에서 참조하여 사용하기 위해 해당 변수/함수를 export 키워드를 통해 노출
module.exports = {
  odd,
  even,
  test,
};
