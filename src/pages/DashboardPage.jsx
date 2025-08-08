import { AlertCircle, Calendar, Calendar1, CheckCircle, Clock, Heart, TrendingUp, Users } from 'lucide-react';
import React, { useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const DashboardPage = () => {
  const pasien = JSON.parse(localStorage.getItem('dataHewan')) || [{}]
    const [total,setTotal] = useState(pasien);
    const [todayPatient,setTodayPatient] = useState(0);
    const [records,setRecords] = useState(0);

     const petHealthData = [
    { month: 'Jan', vaccinated: 85, checkups: 92, treatments: 15 },
    { month: 'Feb', vaccinated: 88, checkups: 89, treatments: 12 },
    { month: 'Mar', vaccinated: 92, checkups: 95, treatments: 8 },
    { month: 'Apr', vaccinated: 89, checkups: 91, treatments: 18 },
    { month: 'May', vaccinated: 95, checkups: 97, treatments: 6 },
    { month: 'Jun', vaccinated: 91, checkups: 94, treatments: 11 }
  ];


  

  const revenueData = [
    { month: 'Jan', revenue: 12000, expenses: 8000 },
    { month: 'Feb', revenue: 15000, expenses: 9500 },
    { month: 'Mar', revenue: 18000, expenses: 11000 },
    { month: 'Apr', revenue: 16000, expenses: 10200 },
    { month: 'May', revenue: 22000, expenses: 12800 },
    { month: 'Jun', revenue: 19000, expenses: 11500 }
  ];
  const StatCard = ({ icon, title, value, change, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className={`text-sm mt-2 flex items-center ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            {change >= 0 ? '+' : ''}{change}% dari bulan lalu
          </p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className=" flex flex-col gap-10 ">
      <div className=" information p-5 space-y-4   shadow-lg rounded-md ">
        <h1 className='font-bold text-3xl'>Welcome back, Admin!</h1>
        <p>Here's what's happening at your clinic today</p>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
            <StatCard
              icon={<Users className="w-6 h-6 text-white" />}
              title="Total Pets"
              value="1,247"
              change={12}
              color="bg-blue-500"
            />
            <StatCard
              icon={<Calendar className="w-6 h-6 text-white" />}
              title="Appointments Today"
              value="28"
              change={8}
              color="bg-green-500"
            />
            <StatCard
              icon={<Heart className="w-6 h-6 text-white" />}
              title="Health Checkups"
              value="156"
              change={-3}
              color="bg-pink-500"
            />
            <StatCard
              icon={<AlertCircle className="w-6 h-6 text-white" />}
              title="Pending Tasks"
              value="9"
              change={-15}
              color="bg-orange-500"
            />
          </div>

           <div className="grid grid-cols-1  gap-8 mb-8">
            {/* Pet Health Trends */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pet Health Trends</h3>
              <ResponsiveContainer width="100%" height={285}>
                <LineChart data={petHealthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Line type="monotone" dataKey="vaccinated" stroke="#4ECDC4" strokeWidth={3} dot={{ fill: '#4ECDC4', r: 4 }} />
                  <Line type="monotone" dataKey="checkups" stroke="#45B7D1" strokeWidth={3} dot={{ fill: '#45B7D1', r: 4 }} />
                  <Line type="monotone" dataKey="treatments" stroke="#FF6B6B" strokeWidth={3} dot={{ fill: '#FF6B6B', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
             <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {[
                { icon: CheckCircle, text: "Luna (Golden Retriever) completed vaccination", time: "2 hours ago", color: "text-green-600" },
                { icon: Calendar, text: "New appointment scheduled for Max (Persian Cat)", time: "4 hours ago", color: "text-blue-600" },
                { icon: AlertCircle, text: "Bella (Labrador) needs follow-up checkup", time: "6 hours ago", color: "text-orange-600" },
                { icon: Heart, text: "Charlie (Bulldog) health record updated", time: "1 day ago", color: "text-pink-600" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <activity.icon className={`w-5 h-5 mr-3 ${activity.color}`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.text}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
     
    </div>
  )
}

export default DashboardPage
