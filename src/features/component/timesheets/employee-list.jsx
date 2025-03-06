import { Link } from "react-router";

export default function EmployeeList({ employees }) {
  return (
    <table style={{ width: "900px" }}>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Temporary?</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.id}>
            <td>{emp.firstname}</td>
            <td>{emp.lastname}</td>
            <td>{emp.temp ? "Yes" : "No"}</td>
            <td>
              {/* Opens the timesheet modal */}
              <Link to={`/timesheets/${emp.id}`}>Manage Timesheets</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
