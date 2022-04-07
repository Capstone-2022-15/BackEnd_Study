// node_modules 에 있는 express 관련 파일 가져오기
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql2/promise");

// const db = async () => {
//   try {
//     let connection = await mysql.createConnection({
//       host: conf.host,
//       user: conf.user,
//       password: conf.password,
//       database: conf.database,
//     });

//     //모든 rows 를 SELECT, ***READ***
//     let [rows, fields] = await connection.query("SELECT * FROM CUSTOMER");
//     console.log(rows);
//   } catch (error) {
//     console.log(error);
//   }
// };
// db();

const getConnection = async () => {
  let connection = await mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    database: conf.database,
  });
  return connection;
};

app.get("/api/customers", async (req, res) => {
  try {
    const connection = await getConnection();
    let [rows, fields] = await connection.query(
      "SELECT * FROM CUSTOMER WHERE isDeleted = 0"
    );
    res.send(rows);
    console.log(rows);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/customers", async (req, res) => {
  console.log(req.body);
  const connection = await getConnection();
  let sql = "INSERT INTO CUSTOMER VALUES (null,?,?,?,?,now(),0)";
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [name, birthday, gender, job];
  await connection.query(sql, params, (error, rows, fields) => {
    res.send(rows);
  });
});

app.delete("/api/customers/:id", async (req, res) => {
  const connection = await getConnection();
  console.log(req.params.id);
  let sql = "UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql, params);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
