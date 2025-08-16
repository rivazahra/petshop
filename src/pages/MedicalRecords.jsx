import React, { useEffect, useMemo, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import CardMedicalRecords from '../components/CardMedicalRecords'
import { getMedicalRecords, getPatient, supabase } from '../utils/supabase/client'

const MedicalRecords = () => {
  // const pasien = JSON.parse(localStorage.getItem('dataHewan')) || [{}]
  const [loading, setLoading] = useState(false)
  const [pasien, setPasien] = useState([])
  const [namePasien, setNamePasien] = useState('')
  const [medCod, setMedCod] = useState([])
  const [searchValue, setsearchValue] = useState('')

  useEffect(() => {
    async function getHewan() {
      const res = await getPatient()
      setPasien(res)
      return res
    }
    getHewan()
  }, [])


  useEffect(() => {
    async function getMedCod() {
      const res = await getMedicalRecords()
      setMedCod(res)
      return res
    }
    getMedCod()
  }, [])
  // const rekamMedis = JSON.parse(localStorage.getItem('rekamMedis'))


  const [formData, setFormData] = useState({
    pet_id: '',
    tglKunjungan: '',
    keluhan: '',
    diagnosis: '',
    penanganan: '',
    obat: '',
    biayaPengobatan: '',
    catatan: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'pasien') {
      const selectedId = e.target.value
      const selectedPasien = pasien.find(pas => pas.id.toString() === selectedId.toString())
     setNamePasien(selectedPasien.name)

      // console.log('Selected ID:', value) // Debug
      // console.log('Found pasien:', selectedPasien) // Debug

      setFormData((prevData) => ({
        ...prevData,
        pet_id: selectedId,
        name: namePasien

      }))
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }))
    }
  }

  // console.log(formData);


  const handleSearch = useMemo(() => {

    if (!medCod?.length) return []

    let filtered = medCod;
    const trimmedSearch = searchValue?.trim()
    if (trimmedSearch) {
      const searchLower = trimmedSearch.toLowerCase()
      filtered = filtered.filter((patient) =>
        patient.pasien?.toLowerCase().includes(searchLower)
      )
    }
    return filtered
  }, [medCod, searchValue])

  

  const handleReset = () => {
    setFormData({
      pasien: '',
      tglKunjungan: '',
      keluhan: '',
      diagnosis: '',
      penanganan: '',
      obat: '',
      biayaPengobatan: '',
      catatan: '',
    })
  }


  const saveForm = async (e) => {
    e.preventDefault()

    try {
      const isValid =
        formData.tglKunjungan &&
        formData.keluhan &&
        formData.diagnosis &&
        formData.penanganan &&
        formData.obat &&
        formData.biayaPengobatan &&
        formData.catatan;

        console.log(formData);
        
      if (!isValid) {
        alert('Mohon lengkapi semua field sebelum menyimpan')
        return
      }
      setLoading(true)
      const medicalData = {
        pet_id: formData.pet_id,
        name: namePasien,
        visit_date: formData.tglKunjungan,
        symptom: formData.keluhan,
        diagnosis: formData.diagnosis,
        treatment: formData.penanganan,
        medicine: formData.obat,
        cost: formData.biayaPengobatan,
        notes: formData.catatan
      }
      console.log(medicalData);
      
      // const existingData = JSON.parse(localStorage.getItem('rekamMedis')) || []
      const { data: medicalRes, error: medError } = await supabase.from('medical_records').insert(medicalData).select().single()
      if (medError) throw medError;

      setMedCod(prevMedcod =>[medicalRes,...prevMedcod  ])
      alert('Rekam medis berhasil disimpan')

      setFormData({
        pasien: '',
        tglKunjungan: '',
        keluhan: '',
        diagnosis: '',
        penanganan: '',
        obat: '',
        biayaPengobatan: '',
        kunjunganBerikutnya: '',
        catatan: '',
      })
      setLoading(false)

    } catch (error) {
      console.log(error)

    }
  }

  return (
    <div className="medical-records flex flex-col gap-10 text-md max-md:text-sm ">
      <div className="information space-y-2">
        <h1 className="text-3xl font-bold capitalize">Rekam Medis</h1>
        <p className="">Tambah dan kelola rekam medis pasien</p>
      </div>
      <div className="information space-y-5">
        <h1 className="text-2xl font-semibold mb-5">Tambah rekam medis baru</h1>

        <form action="med-records" onSubmit={saveForm}>
          <div className="grid grid-cols-2 gap-3 items-center">
            <div className="form-group">
              <label htmlFor='pilih-pasien' className="font-bold">Pilih pasien</label>
              <select className="form-control" id='pilih-pasien' name="pasien" value={formData.pet_id || ''} onChange={handleChange}>
                <option value="">Pilih pasien..</option>
                {pasien.map((pas) => (
                  <option className='capitalize' key={pas.id} value={pas.id}>
                    {pas.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor='tgl-kunjungan'>Tanggal Kunjungan</label>
              <input type="date" id='tgl-kunjungan' max={new Date().toISOString().split('T')[0]} name="tglKunjungan" onChange={handleChange} value={formData.tglKunjungan} className="form-control" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 mt-3">
            <div className="form-group">
              <label htmlFor='keluhan-gejala'>Keluhan/Gejala</label>
              <textarea className="h-20 form-control" id='keluhan-gejala' onChange={handleChange} name="keluhan" value={formData.keluhan} placeholder="Masukkan keluhan atau gejala yang dialami hewan"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor='diagnosis'>Diagnosis</label>
              <textarea id='diagnosis' className="h-20 form-control" name="diagnosis" value={formData.diagnosis} placeholder="Masukkan diagnosis dari dokter hewan" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Grid kembali ke 2 kolom */}
          <div className="grid grid-cols-2 max-md:grid-cols-1  gap-3 mt-3 ">
            <div className="form-group">
              <label className='' htmlFor='penanganan'>Penanganan/Pengobatan</label>
              <textarea id='penanganan' className="h-20 form-control txt-area" name="penanganan" value={formData.penanganan} placeholder="Masukkan detail penanganan atau pengobatan" onChange={handleChange}></textarea>
            </div>

            <div className="form-group">
              <label htmlFor='obat-pasien'>Obat yang diberikan</label>
              <textarea className="h-20 form-control" id='obat-pasien' name="obat" value={formData.obat} placeholder="Masukkan obat beserta dosis" onChange={handleChange}></textarea>
            </div>
            {/* <div className="form-group">
              <label htmlFor='nextKunjungan'>Kunjungan Berikutnya (jika ada)</label>
              <input type="date" id='nextKunjungan' name="kunjunganBerikutnya" value={formData.kunjunganBerikutnya} className="form-control" onChange={handleChange} />
            </div> */}

            <div className="form-group ">
              <label htmlFor='biaya-pengobatan'>Biaya Pengobatan</label>
              <input type="number" id='biaya-pengobatan' name="biayaPengobatan" value={formData.biayaPengobatan} className="h-10 form-control" placeholder="Masukkan biaya dalam rupiah, contoh: 35,000" onChange={handleChange} />
            </div>
          </div>
          <div className="form-group my-5">
            <label htmlFor="catatanTambahan">Catatan tambahan</label>
            <textarea name="catatan" value={formData.catatan} id="catatanTambahan" className="form-control" placeholder="Catatan khusus dari dokter hewan (opsional)" onChange={handleChange}></textarea>
          </div>
          <button className="button-save" type="submit"
          >   {loading ? 'Menyimpan....' : 'Simpan'}

          </button>
          <button className="btn-reset" type='button' onClick={handleReset}>Reset</button>
        </form>
        <div>

        </div>
      </div>
      <div className="information space-y-3">
        <h1 className="font-bold text-2xl">Riwayat rekam medis</h1>
        <div className="search-bar ">
          <i>
            <IoSearchOutline />
          </i>
          <input type="text" value={searchValue} name="search" onChange={(e) => setsearchValue(e.target.value)} className="input-search" placeholder="Cari berdasarkan nama hewan.." />
        </div>
        {medCod?.length == 0 || medCod == null ? (

          <p className='mt-4 font-semibold'>
            Belum ada rekam medis yang tersimpan
          </p>
        )
          : (
            handleSearch?.map((rekam) => (
              <CardMedicalRecords rekam={rekam} key={rekam.id} />
            ))
          )}

      </div>
    </div>
  )
}

export default MedicalRecords
