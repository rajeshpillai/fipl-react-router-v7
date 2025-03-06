import React from 'react';
import { Form, Outlet, useLoaderData, useNavigate } from 'react-router';
import { employeeApi } from "../api/store"
import EmployeeList from '../features/component/timesheets/employee-list'
import "./timesheet.css"

// 🔥 Loader: Fetch only employees (No timesheets yet)
export async function timesheetLoader() {
  console.log("Fetching Employees...");
  const employees = await employeeApi.fetchEmployees();
  return { employees };
}

// 🔥 Action: Handles adding/updating/deleting employees
export async function timesheetAction({ request }) {
  const form = await request.formData();
  const action = form.get("formAction");
  const empId = form.get("empId");

  if (action === "new-employee") {
    await employeeApi.addEmployee(form.get("firstname"), form.get("lastname"), form.get("temp"));
  }
  if (action === "delete-employee") {
    await employeeApi.deleteEmployee(empId);
  }
  if (action === "edit-employee") {
    await employeeApi.updateEmployee(empId, {
      firstname: form.get("firstname"),
      lastname: form.get("lastname"),
      temp: form.get("temp"),
    });
  }

  return null; // Redirect after action completes
}

export default function Timesheet() {
  const { employees } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Timesheet</h2>
      
      {/* Form for adding a new employee */}
      <Form method="post">
        <div>
          <label>First Name</label>
          <input type="text" name="firstname" placeholder="Enter first name..." />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" name="lastname" placeholder="Enter last name..." />
        </div>
        <div>
          <label>Temporary</label>
          <input type="checkbox" name="temp" />
        </div>
        <div>
          <button type="submit" name="formAction" value="new-employee">Submit</button>
        </div>
      </Form>

      <h2>All Employees</h2>
      <EmployeeList employees={employees} />

      {/* This is where the modal opens dynamically */}
      <Outlet />
    </div>
  );
}
