import axios from "axios";
import React from "react";

function CustomerDel({ stateRefresh, id }) {
  function deleteCustomer(id) {
    const url = "http://localhost:4000/api/customers/" + id;
    axios
      .delete(url)
      .then(() => {
        console.log()
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
