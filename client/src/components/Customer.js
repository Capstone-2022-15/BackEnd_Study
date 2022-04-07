import React from "react";
import CustomerDel from "./CustomerDel";

function Customer({ id, name, birthday, gender, job, stateRefresh }) {
  return (
    <CustomerProfile
      id={id}
      name={name}
      birthday={birthday}
      gender={gender}
      job={job}
      stateRefresh={stateRefresh}
    />
  );
}

function CustomerProfile({ id, name, birthday, gender, job, stateRefresh }) {
  return (
    <tbody>
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
    </tbody>
  );
}

export default Customer;
