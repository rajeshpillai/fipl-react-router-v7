import React, {useState} from 'react'
import {useSubmit} from 'react-router';
import EmployeeDisplay from "./employee-display"
import EmployeeEditForm from './employee-edit-form';

export default function EmployeeList({data}) {
  const [editEmpId, toggleEdit] = useState(null);

  const submit = useSubmit();
  
  const handleDelete = (empId) => {
    alert(empId);
    submit(
      { empId: empId, formAction: "delete-employee" },
      { action: "/employees", method: "post" }
    );
  }

  const handleEdit = (empId) => {
    if (editEmpId === empId) {
      toggleEdit(undefined);
    } else {
      toggleEdit(empId);
    }
  }

  return (
    <div>
      <table style= {{width: "900px"}}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Temporary?</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(emp => {
              return (
                <tr key={emp.id}>
                  {editEmpId == emp.id ? <EmployeeEditForm emp = {emp} /> :  <EmployeeDisplay emp = {emp} />}
                  <td colSpan="2">
                    <button onClick={() => handleDelete(emp.id)} type='button'>
                      X
                    </button>
                    
                    {/* <button onClick={handleDelete.bind(null,emp.id)} type='button'>
                      X
                    </button> */}
                    <button onClick={() => handleEdit(emp.id)} type="button">Edit</button>
                    </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}
