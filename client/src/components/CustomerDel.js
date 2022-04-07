import axios from "axios";
import React from "react";

function CustomerDel({ stateRefresh, id }) {
  //app.delete 메소드로 url 전달 하는데 id 포함해서 보냄
  function deleteCustomer(id) {
    const url = "http://localhost:4000/api/customers/" + id;
    axios
      .delete(url)
      .then(() => {
        stateRefresh();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <button
      onClick={(event) => {
        deleteCustomer(id);
      }}
    >
      삭제
    </button>
  );
}
export default CustomerDel;
