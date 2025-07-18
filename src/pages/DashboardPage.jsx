import React, { useState } from 'react'

const DashboardPage = () => {
    const [total,setTotal] = useState(0);
    const [todayPatient,setTodayPatient] = useState(0);
    const [records,setRecords] = useState(0);
  return (
    <div className=" flex flex-col gap-20 ">
      <div className="bg-white p-5 shadow-gray-300  shadow-lg rounded-md font-bold">
        <h1>Dashboard</h1>
        <p>Welcome Admin!</p>
      </div>
      <div className="grid grid-cols-2 gap-3 ">
        <div className="total-patient p-4 bg-white shadow-lg shadow-gray-300">
          <h1 className="font-bold">Total Patient</h1>
          <h3>{total}</h3>
        </div>
        <div className="patient-today p-4 bg-white shadow-lg shadow-gray-300 ">
          <h1 className="font-bold">Patient today</h1>
        <h3>{todayPatient}</h3>
        </div>
        <div className="patient-today p-4 bg-white shadow-lg shadow-gray-300 ">
          <h1 className="font-bold">Medical records</h1>
          <h3>{records}</h3>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
