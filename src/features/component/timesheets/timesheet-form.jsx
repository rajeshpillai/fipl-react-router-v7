import {useState} from "react";

export default function TimesheetForm({ timesheets, fetcher, navigate }) {
    const [localTimesheets, setLocalTimesheets] = useState(
      timesheets.length > 0 ? timesheets : [{ empId: "", date: "", hours: "", description: "" }]
    );
  
    function handleChange(index, field, value) {
      setLocalTimesheets(prev => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [field]: value };
        return updated;
      });
    }
  
    function addRow() {
      setLocalTimesheets(prev => [
        ...prev,
        { empId: localTimesheets[0].empId, date: "", hours: "", description: "" }
      ]);
    }
  
    function removeRow(index) {
      setLocalTimesheets(prev => prev.filter((_, i) => i !== index));
    }
  
    function handleSubmit(e) {
      e.preventDefault();
      const validTimesheets = localTimesheets.filter(ts => ts.date && ts.hours);
      if (validTimesheets.length === 0) {
        alert("Please enter valid timesheet entries before submitting.");
        return;
      }
  
      const formData = new FormData();
      formData.append("formAction", "update-timesheet");
      formData.append("empId", localTimesheets[0].empId);
      formData.append("timesheets", JSON.stringify(validTimesheets));
  
      fetcher.submit(formData, { method: "post" });
      navigate(-1); // Close modal after submit
    }
  
    return (
      <fetcher.Form method="post" onSubmit={handleSubmit}>
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
            {localTimesheets.map((ts, index) => (
              <tr key={index}>
                <td>
                  <input 
                    type="date" 
                    value={ts.date} 
                    onChange={(e) => handleChange(index, "date", e.target.value)} 
                    required
                  />
                </td>
                <td>
                  <input 
                    type="number" 
                    min="0"
                    value={ts.hours} 
                    onChange={(e) => handleChange(index, "hours", e.target.value)} 
                    required
                  />
                </td>
                <td>
                  <input 
                    type="text" 
                    value={ts.description} 
                    onChange={(e) => handleChange(index, "description", e.target.value)} 
                    required
                  />
                </td>
                <td>
                  {localTimesheets.length > 1 && (
                    <button type="button" onClick={() => removeRow(index)}>Remove</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={addRow}>Add Row</button>
        <button type="submit">Save Timesheets</button>
      </fetcher.Form>
    );
  }
  