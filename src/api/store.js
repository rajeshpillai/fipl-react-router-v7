let employees = [
  { id: "1", firstname: "John", lastname: "Doe", temp: false },
  { id: "2", firstname: "Jane", lastname: "Smith", temp: true },
];

let timesheets = []; // 🔥 NEW: Store timesheets separately

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const employeeApi = {
  async fetchEmployees() {
    await delay(300);
    return employees;
  },

  async getEmployee(id) {
    await delay(300);
    return employees.find((emp) => emp.id === id) || null;
  },

  async addEmployee(firstname, lastname, temp) {
    await delay(300);
    const newEmployee = {
      id: Date.now().toString(),
      firstname,
      lastname,
      temp,
    };
    employees.push(newEmployee);
    return newEmployee;
  },

  async updateEmployee(id, updatedData) {
    await delay(300);
    employees = employees.map((emp) =>
      emp.id === id ? { ...emp, ...updatedData } : emp
    );

    console.log("DATA STORE EDIT: ", id, employees);
    return employees.find((emp) => emp.id === id) || null;
  },

  async deleteEmployee(id) {
    await delay(300);
    employees = employees.filter((emp) => emp.id !== id);
    timesheets = timesheets.filter((ts) => ts.empId !== id); // 🔥 Remove timesheets for deleted employee
    return true;
  },

  // 🔥 NEW API: Add timesheet for an employee
  async addTimesheet(empId, newTimesheet) {
    await delay(300);
    // Remove old timesheets for this employee and replace with new ones
    timesheets = timesheets.filter((ts) => ts.empId !== empId);
    timesheets.push(...newTimesheet);
    return newTimesheet;
  },

  // 🔥 NEW API: Fetch timesheets for a specific employee
  async getTimesheets(empId) {
    await delay(300);
    return timesheets.filter((ts) => ts.empId === empId);
  },

  // 🔥 NEW API: Fetch all timesheets
  async fetchAllTimesheets() {
    await delay(300);
    return timesheets;
  },

  // 🔥 NEW API: Delete timesheets for an employee
  async deleteTimesheets(empId) {
    await delay(300);
    timesheets = timesheets.filter((ts) => ts.empId !== empId);
    return true;
  }
};
