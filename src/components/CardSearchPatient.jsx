import React from 'react'

const CardSearchPatient = ({ pasienData }) => {
  return (
    <div className="space-y-5 text-sm ">
        <div className="information-search max-md:flex-col max-md:items-start space-y-3 flex items-center justify-between" >
          <div>
            <h1 className=" name-patient font-bold capitalize">
              {pasienData.name} - {pasienData.ras}
            </h1>
            <p className="text-sm text-gray-500">
              Pemilik: {pasienData.namaPemilik} | Telepon: {pasienData.noTelp}{' '}
            </p>
            <p className="text-sm text-gray-500">
              Umur: {pasienData.umur} tahun | Berat: {pasienData.berat} kg | Terakhir diperiksa: 15 Juli 2025
            </p>
          </div>
          <div className={`flex gap-4 max-md:flex-col`}>
            <button className='btn cursor-pointer'>Lihat Detail</button>
            <button className='p-2 bg-gray-200 font-semibold cursor-pointer rounded-md'>Rekam medis</button>
          </div>
        </div>
    </div>
  )
}

export default CardSearchPatient
