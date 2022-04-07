// node_modules 에 있는 express 관련 파일 가져오기
// 파일 관련 모듈(.database.json을 불러오기 위한)
const fs = require("fs");
const express = require("express");
// POST req data의 body로 params을 추출하기 위한 모듈
const bodyParser = require("body-parser");
//Cross-Origin Resource Sharing, 서버와 클라의 통신을 위한 모듈
const cors = require("cors");
//환경변수의 PORT나 없으면 4000을 쓰겠다.
const port = process.env.PORT || 4000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//데이터베이스의 로그인 정보를 추출하여 json으로 파싱
const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
//mysql을 사용하고 async를 사용하기 위한 모듈
const mysql = require("mysql2/promise");

//DB와 커넥션을 맺는 함수, connection 변수를 리턴
const getConnection = async () => {
  let connection = await mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    database: conf.database,
  });
  return connection;
};

//고객 정보를 불러오는 get 메소드
app.get("/api/customers", async (req, res) => {
  try {
    //DB와 커넥션을 맺고
    const connection = await getConnection();
    //쿼리 메소드를 통해 SQL문을 실행, isDeleted가 0인 데이터를 가져온다
    let [rows, fields] = await connection.query(
      "SELECT * FROM CUSTOMER WHERE isDeleted = 0"
    );
    res.send(rows);
    console.log(rows);
  } catch (error) {
    console.log(error);
  }
});

//고객 정보를 추가하는 post 메소드
app.post("/api/customers", async (req, res) => {
  console.log(req.body);
  //커넥션을 맺고
  const connection = await getConnection();
  //sql문을 작성한다
  let sql = "INSERT INTO CUSTOMER VALUES (null,?,?,?,?,now(),0)";
  //각 param을 변수에 넣고 사용
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [name, birthday, gender, job];
  await connection.query(sql, params, (error, rows, fields) => {
    res.send(rows);
  });
});

//고객 정보를 삭제하는 delete 메소드
app.delete("/api/customers/:id", async (req, res) => {
  //커넥션을 맺고
  const connection = await getConnection();
  console.log(req.params.id);
  //쿼리 메소드로 sql문 실행하는데 데이터베이스의 정보를 삭제하는게 아닌 isDeleted를 1로 변경하는 것으로 처리
  let sql = "UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params);
});

//port(여기선 4000번)를 통해 듣겠다 라는 메소드
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
