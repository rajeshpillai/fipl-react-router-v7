import React, {useState} from 'react'
import {useSubmit} from 'react-router';
import EmployeeDisplay from "./employee-display"
import EmployeeEditForm from './employee-edit-form';
import TimeSheet from './timesheet-entry';

export default function EmployeeList({data, timesheet=[], onTimeSheetSubmit}) {
  const submit = useSubmit();
  const [editEmpId, toggleEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedTimesheet, setSelectedTimesheet] = useState();

  console.log("DEBUG>>>> ", timesheet);

  for(const t of timesheet) {
    console.log(t);
  }


  function handleAddTimesheet(employee) {
    setSelectedEmployee(employee);
    setShowModal(true);
    let myTimeSheet = timesheet.filter(t => t.empId == employee.id );
    setSelectedTimesheet(myTimeSheet);
    console.log("FUll timesheet: ", timesheet);
    console.log(`Selected timesheet for emp ${employee.id}: `, myTimeSheet);

  }

  function handleTimesheetSubmit(emp, timesheetData) {
    console.log("Timesheet for:", selectedEmployee);
    console.log("Submitted Data:", timesheetData);
    setShowModal(false);
    onTimeSheetSubmit(emp, timesheetData);
  }
  
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
                    <td><button onClick={() => handleAddTimesheet(emp)}>Add Timesheet</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {showModal && (
        <TimeSheet 
          data={selectedTimesheet}
          employee={selectedEmployee} 
          onClose={() => setShowModal(false)}
          onSubmit={handleTimesheetSubmit}
        />
      )}
    </div>
  )
}
