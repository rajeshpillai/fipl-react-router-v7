import { useState, useEffect } from "react";

export default function TimeSheet({ employee, data, onClose, onSubmit }) {

    console.log("Time sheet data for ", employee.id, data);

    // Initialize state with the provided `data` or default to an empty entry
    const [timesheets, setTimesheets] = useState(() => {
        return data && data.length > 0 ? data : [{ empId: employee.id, date: "", hours: "", description: "" }];
    });

    // Handle input changes
    function handleChange(index, field, value) {
        setTimesheets(prevTimesheets => {
            const newTimesheets = [...prevTimesheets];
            newTimesheets[index] = {
                ...newTimesheets[index],
                [field]: value
            };
            return newTimesheets;
        });
    }

    // Add a new row
    function addRow() {
        setTimesheets(prevTimesheets => [
            ...prevTimesheets,
            { empId: employee.id, date: "", hours: "", description: "" }
        ]);
    }

    // Remove a row
    function removeRow(index) {
        setTimesheets(prevTimesheets => prevTimesheets.filter((_, i) => i !== index));
    }

    // Handle submission, ensuring only valid rows are submitted
    function handleSubmit() {
        const validTimesheets = timesheets.filter(entry => entry.date && entry.hours);

        if (validTimesheets.length === 0) {
            alert("Please fill at least one valid timesheet entry before submitting.");
            return;
        }

        console.log("Submitting timesheet:", JSON.stringify(validTimesheets, null, 2));
        onSubmit(employee, validTimesheets);
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
                                <td>
                                    <input 
                                        type="date" 
                                        value={entry.date} 
                                        onChange={(e) => handleChange(index, "date", e.target.value)} 
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="number" 
                                        min="0"
                                        value={entry.hours} 
                                        onChange={(e) => handleChange(index, "hours", e.target.value)} 
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="text" 
                                        value={entry.description} 
                                        onChange={(e) => handleChange(index, "description", e.target.value)} 
                                    />
                                </td>
                                <td>
                                    {timesheets.length > 1 && (
                                        <button onClick={() => removeRow(index)}>Remove</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={addRow}>Add Row</button>
                <button onClick={handleSubmit}>Add Timesheet</button>
                <button onClick={onClose}>Close</button>

                {/* Debugging Output */}
                {console.log("Current State:", timesheets)}
            </div>
        </div>
    );
}
