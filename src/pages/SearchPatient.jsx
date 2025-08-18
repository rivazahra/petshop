import React, { useEffect, useMemo, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import CardSearchPatient from '../components/CardSearchPatient'
import { getPatient } from '../utils/supabase/client'

const SearchPatient = () => {
  const [pasien, setPasien] = useState([])

  const [searchValue, setsearchValue] = useState('')
  const [selectedJenis, setSelectedJenis] = useState('all')
  
  const filteredPatients = useMemo(() => {
    let filtered = pasien

    if (selectedJenis && selectedJenis !== 'all') {
      return pasien.filter((patient) => patient.species === selectedJenis)
    }

    if (searchValue.trim()) {
      const searchLower = searchValue.toLowerCase().trim()
      filtered = filtered.filter((patient) => patient.name?.toLowerCase().includes(searchLower) || patient.owners?.name.toLowerCase().includes(searchLower))
    }
    return filtered
  }, [pasien, selectedJenis, searchValue])
  
  useEffect(()=> {
    async function getHewan(){
      const res = await getPatient()
      setPasien(res)
      return res
    } 
    getHewan()   
  }, [])
  
  

  return (
    <div className="search-patient">
      <div className="flex flex-col gap-5">
        <div className="information space-y-2">
          <h1 className="font-bold text-3xl">Cari Pasien</h1>
          <p className='font-semibold'>Cari dan akses detail pasien!</p>
        </div>
        <div className="information space-y-4">
          <div className="search-bar">
            <i>
              <IoSearchOutline />
            </i>
            <input type="text" value={searchValue} name="search" onChange={(e) => setsearchValue(e.target.value)} className="input-search" placeholder="Cari pasien berdasarkan nama hewan atau nama pemilik" />
          </div>
          <div className="space-x-5">
            <select name="" id="jenis-pasien" className="jenis-option" onChange={(e) => setSelectedJenis(e.target.value)}>
              <option value="all">Semua species</option>
              <option value="kucing">Kucing</option>
              <option value="anjing">Anjing</option>
              <option value="ikan">Ikan</option>
              <option value="kelinci">Kelinci</option>
            </select>
          </div>
          {filteredPatients.map((pasien) => (
            <CardSearchPatient key={pasien.id} pasienData={pasien} />
          ))}
          {/* {filteredPatients && (
            
            <CardSearchPatient pasienData={pasien}/>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default SearchPatient
