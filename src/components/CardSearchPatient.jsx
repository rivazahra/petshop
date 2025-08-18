import React from 'react'
import { Link } from 'react-router-dom'

const CardSearchPatient = ({ pasienData }) => {

  return (
    <div className="bg-white shadow-md rounded-xl p-4 md:p-6">
  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
    {/* Foto + Info Hewan */}
    <div className="flex flex-col sm:flex-row items-start md:items-center gap-4">
      <img 
        src={pasienData.photo_url} 
        className="rounded-full w-24 h-24 object-cover ring-2 ring-gray-200" 
        alt={pasienData.name} 
      />
      <div className="flex flex-col space-y-1">
        <h1 className="font-bold text-lg capitalize">{pasienData.name}</h1>
        <p className="text-sm text-gray-600">
          Pemilik: <span className="font-medium">{pasienData.owners.name}</span>
        </p>
        <p className="text-sm text-gray-600">
          Telepon: <span className="font-medium">{pasienData.owners.phone}</span>
        </p>
        <p className="text-sm text-gray-600">
          Tanggal Lahir: <span className="font-medium">{pasienData.birth_date}</span>
        </p>
        <p className="text-sm text-gray-600">
          Berat: <span className="font-medium">{pasienData.weight} kg</span>
        </p>
      </div>
    </div>

    {/* Tombol Aksi */}
    {/* <div className="flex flex-row items-center md:flex-col gap-3">
      </div> */}
      <Link 
        to={`/detail-patient/${pasienData.id}`} 
        state={{ pasienId: pasienData.id }}
        className="bg-pink-500 text-white px-2 text-sm md:text-md  md:px-4 py-2 rounded-lg shadow hover:bg-pink-600 transition"
      >
        Lihat Detail
      </Link>
  </div>
</div>

  )
}

export default CardSearchPatient
