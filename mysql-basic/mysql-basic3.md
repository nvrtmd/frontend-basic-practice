# MySQL

## 숫자와 문자열을 다루는 함수들

### 내용 정리
- 숫자 관련 함수들
  - ROUND: 반올림
  - CEIL: 올림
  - FLOOR: 내림
  - ABS: 절대값
  ```sql
  SELECT 
    Price,
    ROUND(price),
    CEIL(price),
    FLOOR(price)
  FROM Products;  
  -- Products 테이블의 모든 행의 Price, price열의 값을 반올림한 ROUND(price)열, 올림한 CEIL(price)열, 내림한 FLOOR(price)열을 가져오기

  SELECT * FROM OrderDetails
  WHERE ABS(Quantity - 10) < 5;
  -- OrderDetails 테이블의 행들 중 Quantity열의 값 - 10을 한 결과값의 절대값이 5보다 작은 행들의 모든 열을 가져오기
  ```

  - GREATEST: (괄호 안에서) 가장 큰 값
  - LEAST: (괄호 안에서) 가장 작은 값
  ```sql
  SELECT
    OrderDetailID, ProductID, Quantity,
    GREATEST(OrderDetailID, ProductID, Quantity),
    LEAST(OrderDetailID, ProductID, Quantity)
  FROM OrderDetails;  
  -- OrderDetails 테이블의 모든 행의 OrderDetailID, ProductID, Quantity열과, 세 열의 값들 중 가장 큰 값이 들어간 열과 가장 작은 값이 들어간 열을 가져오기
  ```

  - MAX: 가장 큰 값
  - MIN: 가장 작은 값
  - COUNT: 갯수 (NULL값 제외)
  - SUM: 총합
  - AVG: 평균 값
  ```sql
  SELECT
    MAX(Quantity),
    MIN(Quantity),
    COUNT(Quantity),
    SUM(Quantity),
    AVG(Quantity)
  FROM OrderDetails
  WHERE OrderDetailID BETWEEN 20 AND 30;
  -- OrderDetails 테이블의 OrderDetailID열 값이 20과 30 사이인 모든 행들의 Quantity열의 값들 중 가장 큰 값, 가장 작은 값, Quantity값들의 총 개수(조건에 해당하는 행의 개수와 같음), 총합, 평균 값을 가져오기
  ```

  - POW(A, B), POWER(A, B): A를 B만큼 제곱
  - SQRT: 제곱근
  ```sql
  SELECT Price, POW(Price, 1/2)
  FROM Products
  WHERE SQRT(Price) < 4;
  -- Products 테이블의 Price열과 Price를 1/2승한 값이 담긴 열을 Price의 제곱근이 4보다 작을 경우에만 가져오기
  ```

  - TRUNCATE(N, n): N을 소숫점 n자리까지 선택
  ```sql
  SELECT Price FROM Products
  WHERE TRUNCATE(Price, 0) = 12;
  -- Products 테이블의 Price를 0의 자리까지 표시한 수가 12인 모든 행의 Price열을 가져오기
  ```

- 문자 관련 함수들
  - UCASE, UPPER: 모두 대문자로
  - LCASE, LOWER: 모두 소문자로
  ```sql
  SELECT
    UCASE(CustomerName),
    LCASE(ContactName)
  FROM Customers;  
  -- Customers 테이블의 값을 모두 대문자로 만든 CustomerName열과 값을 모두 소문자로 만든 ContactName열을 가져오기
  ```

  - CONCAT(...): 괄호 안의 내용 이어붙임
  - CONCAT_WS(S, ...): 괄호 안의 내용 S로 이어붙임
  ```sql
  SELECT
  CONCAT_WS(' ', FirstName, LastName) AS FullName
  FROM Employees;
  -- Employees 테이블의 FirstName열의 값과 LastName열의 값을 ' '로 이어붙여 FullName이라는 열로 가져오기
  ```

  - SUBSTR, SUBSTRING: 주어진 값에 따라 문자열 자름
  - LEFT: 왼쪽부터 N글자
  - RIGHT: 오른쪽부터 N글자
  ```sql
  SELECT
    OrderDate,
    LEFT(OrderDate, 4) AS Year,
    SUBSTR(OrderDate, 6, 2) AS Month,
    RIGHT(OrderDate, 2) AS Day
  FROM Orders;
  -- Orders 테이블의 모든 행의 OrderDate열, OrderDate열의 값을 왼쪽부터 4글자 자른 값이 담긴 Year라는 열, OrderDate를 6번째 글자부터 2개만 자른 값이 담긴 Month라는 열, OrderDate열의 값을 오른쪽부터 2글자 자른 값이 담긴 Day라는 열을 가져오기
  ```

  - LENGTH: 문자열의 바이트 길이
  - CHAR_LENGTH, CHARACTER_LEGNTH: 문자열의 문자 길이

  - TRIM: 양쪽 공백 제거
  - LTRIM: 왼쪽 공백 제거
  - RTRIM: 오른쪽 공백 제거

  - REPLACE(S, A, B): S중 A를 B로 변경
  ```sql
  SELECT
    REPLACE(Description, ', ', ' and ')
  FROM Categories;  
  -- Categories 테이블의 모든 행의 Description열의 값의 ,를 모두 ' and '로 바꿔서 가져오기
  ```****

  - INSTR(S, s): S중 s의 첫 위치 반환, 없을 시 0
  ```sql
  SELECT * FROM Customers
  WHERE INSTR(CustomerName, ' ') BETWEEN 1 AND 6;
  -- Customers 테이블의 모든 행의 CustomerName열의 값의 첫 위치,를 모두 ' and '로 바꿔서 가져오기
  ```