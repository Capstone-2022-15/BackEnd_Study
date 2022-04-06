import React from "react";
import Customeradd from "./CustomerAdd";

function Customer({ id, name, birthday, gender, job }) {
  return (
    <div className="Customer">
      <CustomerProfile id={id} name={name} />
      <CustomerInfo birthday={birthday} gender={gender} job={job} />
    </div>
  );
}

function CustomerProfile({ id, name }) {
  return (
    <div>
      <h2>
        {name}({id})
      </h2>
    </div>
  );
}

function CustomerInfo({ birthday, gender, job }) {
  return (
    <div>
      <p>{birthday}</p>
      <p>{gender}</p>
      <p>{job}</p>
    </div>
  );
}

export default Customer;
