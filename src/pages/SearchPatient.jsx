import React, { useEffect, useMemo, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import CardSearchPatient from '../components/CardSearchPatient'

const SearchPatient = () => {
  const [pasien, setPasien] = useState([])

  const [searchValue, setsearchValue] = useState('')
  const [selectedJenis, setSelectedJenis] = useState('all')

  const filteredPatients = useMemo(() => {
    let filtered = pasien

    if (selectedJenis && selectedJenis !== 'all') {
      return pasien.filter((patient) => patient.jenis === selectedJenis)
    }

    if (searchValue.trim()) {
      const searchLower = searchValue.toLowerCase().trim()
      filtered = filtered.filter((patient) => patient.name?.toLowerCase().includes(searchLower) || patient.namaPemilik?.toLowerCase().includes(searchLower))
    }
    return filtered
  }, [pasien, selectedJenis, searchValue])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('dataHewan')) || []
    setPasien(storedData)
  }, [])

  return (
    <div className="search-patient">
      <div className="flex flex-col gap-10">
        <div className="information space-y-5">
          <h1 className="font-bold text-3xl">Cari Pasien</h1>
          <p className='font-semibold'>Temukan informasi pasien yang sudah terdaftar</p>
        </div>
        <div className="information space-y-5">
          <div className="search-bar">
            <i>
              <IoSearchOutline />
            </i>
            <input type="text" value={searchValue} name="search" onChange={(e) => setsearchValue(e.target.value)} className="input-search" placeholder="Cari berdasarkan nama hewan, atau nama pemilik" />
          </div>
          <div className="space-x-5">
            <select name="" id="jenis-pasien" className="jenis-option" onChange={(e) => setSelectedJenis(e.target.value)}>
              <option value="all">Semua jenis</option>
              <option value="kucing">Kucing</option>
              <option value="anjing">Anjing</option>
            </select>
          </div>
          {filteredPatients.map((pasien) => (
            <CardSearchPatient key={pasien.id} pasienData={pasien} />
          ))}
        </div>
        <div className="information"></div>
      </div>
    </div>
  )
}

export default SearchPatient
