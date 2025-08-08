import React from 'react'
import { Link } from 'react-router-dom'

const CardSearchPatient = ({ pasienData }) => {
  
  return (
    <div className=" text-sm ">
        <div className="information-search max-md:flex-col max-md:items-start space-y-3 flex items-center justify-between " >
          <div className="flex gap-4">

            <img src={pasienData.photo_url} className='rounded-full w-20 h-20' alt="" />
          <div className='flex flex-col '>
            <h1 className=" name-patient font-bold capitalize pb-2">
              {pasienData.name} 
            </h1>
            <p className="text-sm text-gray-500">
              Pemilik: {pasienData.owners.name} | Telepon: {pasienData.owners.phone}{' '}
            </p>
            <p className="text-sm text-gray-500">
              Umur: {pasienData.birth_date} tahun | Berat: {pasienData.weight} kg | Terakhir diperiksa: 15 Juli 2025
            </p>
          </div>
          </div>
          <div className={`flex gap-4 max-md:flex-col`}>
            <button className='btn cursor-pointer'>
              <Link to={`/detail-patient/${pasienData.id}`} state={{ pasienId: pasienData.id }}>
              Lihat Detail
              </Link>
              </button>
            <button className='p-2 bg-gray-200 font-semibold cursor-pointer rounded-md'>Rekam medis</button>
          </div>
        </div>
    </div>
  )
}

export default CardSearchPatient
