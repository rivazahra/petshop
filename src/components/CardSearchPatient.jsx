import React from 'react'

const CardSearchPatient = ({ pasienData }) => {
  return (
    <div className="space-y-5 ">
        <div className="information-search space-y-3 flex items-center justify-between" >
          <div>
            <h1 className="name-patient font-bold capitalize">
              {pasienData.name} - {pasienData.ras}
            </h1>
            <p className="text-sm text-gray-500">
              Pemilik: {pasienData.pemilik} | Telepon: {pasienData.noTelp}{' '}
            </p>
            <p className="text-sm text-gray-500">
              Umur: {pasienData.umur} tahun | Berat: {pasienData.berat} kg | Terakhir diperiksa: 15 Juli 2025
            </p>
          </div>
          <div className="flex gap-4">
            <button>Lihat Detail</button>
            <button>Rekam medis</button>
          </div>
        </div>
    </div>
  )
}

export default CardSearchPatient
