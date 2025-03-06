import React, {useState} from 'react'
import {Form, useLoaderData} from 'react-router'
import { employeeApi } from  "../api/store";
import EmployeeList from './component/timesheets/employee-list';

import "./timesheet.css";


export async function timesheetLoader() {
  console.log("Employee Loader....");
  const data = await employeeApi.fetchEmployees();
  console.log(data);
  return data;
}

export async function timesheetAction({request}) {
  
  const form = await request.formData();
  console.log("Form submit: ", form);
  const firstname = form.get("firstname");
  const lastname = form.get("lastname");
  const temp = form.get("temp");

  const action = form.get("formAction");
  const empId = form.get("empId");

  console.log("Submitting form data: ", {firstname: firstname, lastname: lastname, temp, action, empId});

  if (action === "new-employee") {
    await employeeApi.addEmployee(firstname, lastname, temp);
  }
  if (action === "delete-employee") {
    await employeeApi.deleteEmployee(empId);
  }
  if (action === "edit-employee") {
    await employeeApi.updateEmployee(empId, {empId, firstname: firstname, lastname: lastname, temp});
  }
}

export default function Timesheet() {
  const employees = useLoaderData();

  // /empId: [{ date: "", hours: "", description: "" }]  // format
  const [timesheet, setTimesheet]  = useState([]);

  console.log("Render: ", employees);

  const handleTimeSheetSubmit = (emp, newTimesheet) => {
    console.log("TIMESHEET: EMP: ", emp);
    console.log("NEW TIMESHEET:", newTimesheet);

    setTimesheet(prevTimesheets => {
        // Remove all existing timesheets for this employee
        const filteredTimesheets = prevTimesheets.filter(ts => ts.empId !== emp.id);

        // Add the new timesheets for this employee
        return [...filteredTimesheets, ...newTimesheet];
    });
  };


  return (
    <div>
      <h2>Timesheet</h2>
      <Form method="post">
        <div>
          <label>First Name</label>
          <input type="text" name="firstname" placeholder='Enter first name...' />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" name="lastname" placeholder='Enter last name...' />
        </div>
        
        <div>
          <label>Temporary</label>
          <input type="checkbox" name="temp"  />
        </div>
        
        <div>
          <button type="submit" name="formAction" value="new-employee">Submit</button>
        </div>
      </Form>

      <h2>All Employees</h2>
      <EmployeeList data = {employees} timesheet={timesheet} onTimeSheetSubmit = {handleTimeSheetSubmit}/>
    </div>
  )
}
