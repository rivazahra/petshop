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
              Tanggal lahir: {pasienData.birth_date}  | Berat: {pasienData.weight} kg
            </p>
          </div>
          </div>
          <div className={`flex  gap-4 max-md:flex-col`}>
            <button className='btn cursor-pointer'>
              <Link to={`/detail-patient/${pasienData.id}`} state={{ pasienId: pasienData.id }}>
              Lihat Detail
              </Link>
              </button>
          
          </div>
        </div>
    </div>
  )
}

export default CardSearchPatient
