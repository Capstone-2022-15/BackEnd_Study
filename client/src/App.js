import "./App.css";
import React, { useState, useEffect } from "react";
import Customer from "./components/Customer";
import Customeradd from "./components/CustomerAdd";

const EXTRYPOINT = "http://localhost:4000";

function App() {
  //고객 리스트 스테이트
  const [customers, setCustomers] = useState({
    customerlist: [],
  });

  //페이지가 로딩되면 실행하는 함수(고객 리스트를 스테이트에 추가
  useEffect(() => {
    callApi()
      .then((res) => setCustomers({ customerlist: res }))
      .catch((err) => console.log(err));
  }, []);

  //api.get으로 DB에서 가져오도록 api 호출
  const callApi = async () => {
    const response = await fetch(EXTRYPOINT + `/api/customers`);
    const body = await response.json();
    return body;
  };
  
  //왜 동작 안하는지 모르겠지만 스테이트를 변경함으로써 리스트 새로고침
  const stateRefresh = async () => {
    setCustomers({
      customerlist: [],
    });
    await callApi()
      .then((res) => setCustomers({ customerlist: res }))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Customeradd stateRefresh={stateRefresh} />
      {customers.customerlist.map((e) => {
        return (
          <Customer
            key={e.id}
            id={e.id}
            name={e.name}
            birthday={e.birthday}
            gender={e.gender}
            job={e.job}
            stateRefresh={stateRefresh}
          />
        );
      })}
    </div>
  );
}

export default App;
