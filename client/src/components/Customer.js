import React from "react";
import CustomerDel from "./CustomerDel";

function Customer({ id, name, birthday, gender, job, stateRefresh }) {
  return (
    <table className="Customer">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Birthday</th>
          <th>Gender</th>
          <th>Job</th>
          <th>Setting</th>
        </tr>
      </thead>
      <tbody>
        <CustomerProfile
          id={id}
          name={name}
          birthday={birthday}
          gender={gender}
          job={job}
          stateRefresh={stateRefresh}
        />
      </tbody>
    </table>
  );
}

function CustomerProfile({ id, name, birthday, gender, job, stateRefresh }) {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{birthday}</td>
      <td>{gender}</td>
      <td>{job}</td>
      <td>
        <CustomerDel stateRefresh={stateRefresh} id={id} />
      </td>
    </tr>
  );
}

export default Customer;
