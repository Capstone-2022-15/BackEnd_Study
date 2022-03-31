// node_modules 에 있는 express 관련 파일 가져오기
const express = require("express");
// cors : cross-origin http 요청
const cors = require("cors");
const app = express();
const https = require("https").createServer(app);
const mysql = require("mysql2/promise");

const db = async () => {
  try {
    // db 연결
    let connection = await mysql.createConnection({
      host: "localhost",
      user: "jeju",
      password: "jeju",
      database: "jejunu",
    });

    //모든 rows 를 SELECT, ***READ***
    let [rows, fields] = await connection.query("SELECT * FROM userinfo");
    console.log(rows);

    // 입력할 데이터
    let data = {
      name: "node",
      password: "express",
    };

    // 데이터 입력 ***CREATE***
    let [results] = await connection.query("INSERT INTO userinfo SET ?", data);
    //입력한 데이터의 id(auto_increment)
    let insertId = results.insertId;

    //모든 rows 를 SELECT
    [rows, fields] = await connection.query("SELECT * FROM userinfo");
    console.log(rows);

    //update row ***UPDATE***
    [results] = await connection.query(
      "UPDATE userinfo SET name=? WHERE id=?",
      ["UPDATED", insertId]
    );

    //모든 rows 를 SELECT
    [rows, fields] = await connection.query("SELECT * FROM userinfo");
    console.log(rows);

    // row를 삭제 ***DELETE***
    [results] = await connection.query("DELETE FROM userinfo WHERE id=?", [
      insertId,
    ]);

    //모든 rows 를 SELECT
    [rows, fields] = await connection.query("SELECT * FROM userinfo");
    console.log(rows);
  } catch (err) {
    console.log(err);
  }
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// public 디렉토리를 static으로 기억한다
// public 내부의 파일들을 localhost:3000/파일명 으로 브라우저에서 불러올 수 있다.
// app.use(express.static('public'))

const port = process.env.PORT || 4000;

let connection = mysql.createConnection({
  host: "localhost",
  user: "jeju",
  password: "jeju",
  database: "jejunu",
});

// GET request 받으면 출력
app.get("/", function (req, res) {
  res.send("server testing OK");
});
app.get("/data/1", function (req, res) {
  res.json({
    id: 1,
    name: "Kim",
    age: 21,
    job: "student",
  });
});
app.get("/data/2", (req, res) => {
  res.json({
    id: 2,
    name: "Lee",
    age: 22,
    job: "accountant",
  });
  app.post("/submit_user", async (req, res) => {
    const data = {
      name: req.body.name,
      password: req.body.password,
    };
    let [results] = await connection.query(
      "INSERT INTO userinfo SET ?",
      {data}
    );
    let insertId = results.insertId;
    [rows, fields] = await connection.query("SELECT * FROM userinfo WHERE id=?", insertId);
    console.log(rows);
  });
});

// port로 서버 오픈
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
