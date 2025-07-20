import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import CardSearchPatient from '../components/CardSearchPatient'

const SearchPatient = () => {
  const [pasien, setPasien] = useState([])
  const [filterValue, setFilterValue] = useState('')
  
  
  const handleFilter = (e) => {
    setFilterValue(e.target.value)
  }
  const filteredClick = pasien.filter((p) => filterValue === '' || p.jenis === filterValue)

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('dataHewan')) || []
    setPasien(storedData)
  }, [])

  return (
    <div className="search-patient">
      <div className="flex flex-col gap-10">
        <div className="information space-y-5">
          <h1 className="font-bold text-3xl">Cari Pasien</h1>
          <p>Temukan informasi pasien yang sudah terdaftar</p>
        </div>
        <div className="information space-y-5">
          <div className="search-bar">
            <i>
              <IoSearchOutline />
            </i>
            <input type="text" className="input-search" placeholder="Cari berdasarkan nama hewan, atau nama pemilik" />
          </div>
          <div className="space-x-5">
            <select name="" id="" className="jenis-option" onChange={handleFilter}>
              <option value="">Semua jenis</option>
              <option value="kucing">Kucing</option>
              <option value="anjing">Anjing</option>
            </select>
          </div>
          {filteredClick.map((pasien)=>(
            
            <CardSearchPatient key={pasien.id} pasienData={pasien} />

          ))}
        </div>
        <div className="information"></div>
      </div>
    </div>
  )
}

export default SearchPatient
