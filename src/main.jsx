import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { BrowserRouter, Routes, Route } from "react-router";
import {Route, RouterProvider, createBrowserRouter} from 'react-router'
import './index.css'
import App from './app.jsx'
import About from './about.jsx'
import Employee, { employeeAction, employeeLoader } from './features/employee.jsx'
import Timesheet, { timesheetAction, timesheetLoader } from './features/timesheet.jsx'

import Attendance from './features/attendance.jsx'
import TimesheetModal, {timesheetModalAction, timesheetModalLoader} from './features/component/timesheets/timesheet-entry.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[{
      path: "employees",
      element: <Employee />,
      action: employeeAction,
      loader: employeeLoader
    },
    {
      path: "/timesheets",
      element: <Timesheet />,
      loader: timesheetLoader,
      action: timesheetAction,
      children: [
        {
          path: ":empId",
          element: <TimesheetModal/>,
          loader: timesheetModalLoader,
          action: timesheetModalAction
        }
      ]
    },
    {
      path: "attendance",
      element: <Attendance />
    }]
  },
  {
    path: "/about",
    element: <About />
  },
])

createRoot(document.querySelector("#root")).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>
)