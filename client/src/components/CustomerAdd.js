import React, { useState } from "react";
const axios = require("axios");

function Customeradd() {
  const [name, setname] = useState("");
  const [birthday, setbirthday] = useState("");
  const [gender, setgender] = useState("");
  const [job, setjob] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const inputData = {
      name,
      birthday,
      gender,
      job,
    };
    if (
      inputData.name === "" ||
      inputData.birthday === "" ||
      inputData.gender === "" ||
      inputData.job === ""
    ) {
      alert("모든 칸을 채워주세요");
    } else {
      if (Number(inputData.birthday)) {
        axios
          .post("http://localhost:4000/api/customers", inputData)
          .then(() => console.log(inputData))
          .catch((error) => {
            console.error(error);
          });
      } else {
        alert("생년월일에 숫자를 적어주세요");
      }
    }
  }

  const handleName = (event) => {
    setname(event.target.value);
  };

  const handleBirth = (event) => {
    setbirthday(event.target.value);
  };

  const handleGender = (event) => {
    setgender(event.target.value);
  };

  const handleJob = (event) => {
    setjob(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      name : <input type="text" name="name" onChange={handleName} />
      <br />
      birthday : <input type="text" name="birthday" onChange={handleBirth} />
      <br />
      gender : <input type="text" name="gender" onChange={handleGender} />
      <br />
      job : <input type="text" name="job" onChange={handleJob} />
      <br />
      <input type="submit" />
    </form>
  );
}

export default Customeradd;
