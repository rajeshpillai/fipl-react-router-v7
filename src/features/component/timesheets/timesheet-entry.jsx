import { useLoaderData, useFetcher, useNavigate } from "react-router";
import { useState } from "react";
import { employeeApi } from "../../../api/store"

// 🔥 Loader: Fetch timesheets for the selected employee
export async function timesheetModalLoader({ params }) {
  const timesheets = await employeeApi.getTimesheets(params.empId);
  return timesheets.length > 0 ? timesheets : [{ empId: params.empId, date: "", hours: "", description: "" }];
}

export async function timesheetModalAction({ request, params }) {
    const form = await request.formData();
    const action = form.get("formAction");
  
    if (action === "update-timesheet") {
      const empId = params.empId;
      const timesheets = JSON.parse(form.get("timesheets")); // Parse JSON data
  
      console.log(`Updating timesheets for Employee ID: ${empId}`, timesheets);
      await employeeApi.addTimesheet(empId, timesheets);
  
      return null; // Indicates success (No redirection needed)
    }
  
    throw new Response("Invalid action", { status: 400 });
  }
  

export default function TimesheetModal() {
  const initialTimesheets = useLoaderData();
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const [timesheets, setTimesheets] = useState(initialTimesheets);

  // 🔹 Handle input changes
  function handleChange(index, field, value) {
    setTimesheets(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  // 🔹 Add a new empty row
  function addRow() {
    setTimesheets(prev => [
      ...prev,
      { empId: initialTimesheets[0].empId, date: "", hours: "", description: "" }
    ]);
  }

  // 🔹 Remove a row
  function removeRow(index) {
    setTimesheets(prev => prev.filter((_, i) => i !== index));
  }

  // 🔹 Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    const validTimesheets = timesheets.filter(ts => ts.date && ts.hours);
    if (validTimesheets.length === 0) {
      alert("Please enter valid timesheet entries before submitting.");
      return;
    }
    
    const formData = new FormData();
    formData.append("formAction", "update-timesheet");
    formData.append("empId", timesheets[0].empId);
    formData.append("timesheets", JSON.stringify(validTimesheets));

    fetcher.submit(formData, { method: "post" });
    navigate(-1); // Close modal after submit
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Timesheets</h2>

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
              {timesheets.map((ts, index) => (
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
                    {timesheets.length > 1 && (
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

        <button onClick={() => navigate(-1)}>Close</button>
      </div>
    </div>
  );
}
