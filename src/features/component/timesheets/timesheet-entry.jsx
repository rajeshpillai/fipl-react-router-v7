import { useState } from "react";

export default function TimeSheet({ employee, onClose, onSubmit }) {
  const [timesheets, setTimesheets] = useState([{ date: "", hours: "", description: "" }]);

  function handleChange(index, field, value) {
    const newTimesheets = [...timesheets];
    newTimesheets[index][field] = value;
    setTimesheets(newTimesheets);
  }

  function addRow() {
    setTimesheets([...timesheets, { date: "", hours: "", description: "" }]);
  }

  function removeRow(index) {
    const newTimesheets = timesheets.filter((_, i) => i !== index);
    setTimesheets(newTimesheets);
  }

  function handleSubmit() {
    onSubmit(timesheets);
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Timesheet for {employee.firstname} {employee.lastname}</h2>
        <table border="1" width="100%">
          <thead>
            <tr>
              <th>Date</th>
              <th>Hours</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {timesheets.map((entry, index) => (
              <tr key={index}>
                <td><input type="date" value={entry.date} onChange={(e) => handleChange(index, "date", e.target.value)} /></td>
                <td><input type="number" value={entry.hours} onChange={(e) => handleChange(index, "hours", e.target.value)} /></td>
                <td><input type="text" value={entry.description} onChange={(e) => handleChange(index, "description", e.target.value)} /></td>
                <td>
                  {index > 0 && <button onClick={() => removeRow(index)}>Remove</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addRow}>Add Row</button>
        <button onClick={handleSubmit}>Add Timesheet</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
