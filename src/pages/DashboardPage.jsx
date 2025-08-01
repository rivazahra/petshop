import React, { useState } from 'react'

const DashboardPage = () => {
  const pasien = JSON.parse(localStorage.getItem('dataHewan')) || [{}]
    const [total,setTotal] = useState(pasien);
    const [todayPatient,setTodayPatient] = useState(0);
    const [records,setRecords] = useState(0);
  return (
    <div className=" flex flex-col gap-20 ">
      <div className="p-5 space-y-4   shadow-lg rounded-md ">
        <h1 className='font-bold text-3xl'>Welcome back, Admin!</h1>
        <p>Here's what's happening at your clinic today</p>
      </div>
      <div className="grid grid-cols-4 gap-3 ">
        <div className="total-patient p-4 bg-white shadow-lg shadow-gray-300">
          <h1 className="font-bold">Today Appoinments</h1>
          <h3 className='text-3xl'>12</h3>
          <p className=''>+3 from yesterday</p>
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
