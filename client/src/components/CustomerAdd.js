import React, { useState } from "react";
const axios = require("axios");

function Customeradd({ stateRefresh }) {
  //추가할 부분들 스테이트로 만들어둠
  const [name, setname] = useState("");
  const [birthday, setbirthday] = useState("");
  const [gender, setgender] = useState("");
  const [job, setjob] = useState("");

  //버튼 클릭시 동작
  function handleSubmit(event) {
    //기존 동작(새로고침 같은 거)을 막아주는 함수
    event.preventDefault();
    //서버로 보낼 객체 생성
    const inputData = {
      name,
      birthday,
      gender,
      job,
    };
    if (
      //4칸중 하나라도 입력을 안했다면
      inputData.name === "" ||
      inputData.birthday === "" ||
      inputData.gender === "" ||
      inputData.job === ""
    ) {
      alert("모든 칸을 채워주세요");
    } else {
      //생년월일이 숫자가 아니라면
      if (Number(inputData.birthday)) {
        //app.post 메소드로 서버에 전달
        axios
          .post("http://localhost:4000/api/customers", inputData)
          .then(() => {
            console.log(inputData);
            stateRefresh();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        alert("생년월일에 숫자를 적어주세요");
      }
    }
  }

  // 값이 바뀔때마다 스테이트에 저장
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
