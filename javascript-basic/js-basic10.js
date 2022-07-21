// REPL(Read Eval Print Loop)
// 변수에 설정된 값을 읽어옴 -> 계산함 -> 그 값을 출력하거나 전달하는 과정이 반복적으로 발생하며 프로그래밍하는 패턴, 방식
const strHello = "Hello world";

let a, b, c;
a = 1;
b = 2;
c = a + b;

// 하기 console.log()는 노드 프레임워크에서 제공해주는 서버측 로깅(테스트) 기능이며, 웹 브라우저의 콘솔이 아님
console.log(strHello);
console.log("계산 결과값을 출력: ", c);
