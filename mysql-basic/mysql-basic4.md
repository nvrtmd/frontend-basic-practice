# MySQL

## 시간/날짜 관련 및 기타 함수들

### 내용 정리
- 시간/날짜 관련 함수들
  - CURRENT_DATE, CURDATE: 현재 날짜 반환
  - CURRENT_TIME, CURTIME: 현재 시간 반환
  - CURRENT_TIMESTAMP, NOW: 현재 시간과 날짜 반환
  - DATE: 문자열에 따라 날짜 생성
  - TIME: 문자열에 따라 시간 생성
  ```sql
  SELECT * FROM Orders
  WHERE
  OrderDate BETWEEN DATE('1997-1-1') AND DATE('1997-1-31');
  -- Orders 테이블의 OrderDate열의 값이 1997-1-1과 1997-1-31의 사이인 모든 행의 모든 열을 가져오기
  ```

  - YEAR: 주어진 DATETIME값의 년도 반환
  - MONTHNAME: 주어진 DATETIME값의 월(영문) 반환
  - MONTH: 주어진 DATETIME값의 월 반환
  - WEEKDAY: 주어진 DATETIME값의 요일값 반환(월요일: 0)
  - DAYNAME: 주어진 DATETIME값의 요일명 반환
  - DAYOFMONTH, DAY: 주어진 DATETIME값의 날짜(일) 반환
  ```sql
  SELECT * FROM Orders
  WHERE WEEKDAY(OrderDate) = 0;
  -- Orders 테이블의 OrderDate열의 값이 0인 (=월요일) 모든 행의 모든 열을 가져오기
  ```

- 기타 함수들
  - IF(조건, T, F): 조건이 참이라면 T, 거짓이면 F 반환
  - CASE: 복잡한 조건문
  ```sql
  SELECT IF (1 > 2, '1는 2보다 크다.', '1은 2보다 작다.');
  -- 결과: 1은 2보다 작다.

  SELECT
  Price,
  IF (Price > 30, 'Expensive', 'Cheap'),
  CASE
    WHEN Price < 20 THEN '저가'
    WHEN Price BETWEEN 20 AND 30 THEN '일반'
    ELSE '고가'
  END
  FROM Products;
  -- Products 테이블의 Price열과, 만약 Price열의 값이 30보다 크면 Expensive를, 그렇지 않으면 Cheap을 담은 열과, Price가 20보다 작으면 저가, 20과 30 사이이면 일반, 그 이상이면 고가를 담은 열을 가져오기  
  ```

  - IFNULL(A, B): A가 NULL일 시 B 출력
  ```sql
  SELECT
  IFNULL('A', 'B'),
  IFNULL(NULL, 'B');
  -- 결과: A, B
  ```