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

app.get("/api/customers", async (req, res) => {
  try {
    let connection = await mysql.createConnection({
      host: conf.host,
      user: conf.user,
      password: conf.password,
      database: conf.database,
    });

    let [rows, fields] = await connection.query("SELECT * FROM CUSTOMER");
    res.send(rows);
    console.log(rows);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
