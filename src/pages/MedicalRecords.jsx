import React, { useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import CardMedicalRecords from '../components/CardMedicalRecords'

const MedicalRecords = () => {
  const pasien = JSON.parse(localStorage.getItem('dataHewan'))
  const medicalRecords = JSON.parse(localStorage.getItem('rekamMedis'))

  const [rekamMedis, setRekamMedis] = useState(medicalRecords)

  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const [searchValue, setsearchValue] = useState([])

  const saveForm = (e) => {
    e.preventDefault()

    const isValid = Object.values(formData).every((value) => value.trim() !== '')
    const existingData = JSON.parse(localStorage.getItem('rekamMedis')) || []

    if (!isValid) {
      alert('Mohon lengkapi semua field sebelum menyimpan')
      return
    }

    const newRekamMedis = {
      ...formData,
      id: Date.now(),
    }

    const newData = [...existingData, newRekamMedis]
    setFormData(newData)

    localStorage.setItem('rekamMedis', JSON.stringify(newData))

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
    console.log('tersimpan', newData)
  }

  return (
    <div className="medical-records flex flex-col gap-8">
      <div className="information space-y-2">
        <h1 className="text-3xl font-bold capitalize">Rekam Medis</h1>
        <p className="">Tambah dan kelola rekam medis pasien</p>
      </div>
      <div className="information space-y-5">
        <h1 className="text-2xl font-semibold mb-5">Tambah rekam medis baru</h1>
        <form action="" onSubmit={saveForm}>
          <div className="grid grid-cols-2 gap-3">
            <div className="form-group">
              <label className="font-bold">Pilih pasien</label>
              <select className="form-control" name="pasien" value={formData.pasien} onChange={handleChange}>
                <option value="">Pilih pasien..</option>
                {pasien.map((pas) => (
                  <option key={pas.id} value={pas.pasien}>
                    {pas.name} - {pas.namaPemilik}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Tanggal Kunjungan</label>
              <input type="date" name="tglKunjungan" onChange={handleChange} value={formData.tglKunjungan} className="form-control" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 mt-3">
            <div className="form-group">
              <label>Keluhan/Gejala</label>
              <textarea className="h-20 form-control" onChange={handleChange} name="keluhan" value={formData.keluhan} placeholder="Masukkan keluhan atau gejala yang dialami hewan"></textarea>
            </div>
            <div className="form-group">
              <label>Diagnosis</label>
              <textarea className="h-20 form-control" name="diagnosis" value={formData.diagnosis} placeholder="Masukkan diagnosis dari dokter hewan" onChange={handleChange}></textarea>
            </div>
          </div>

          {/* Grid kembali ke 2 kolom */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="form-group">
              <label>Penanganan/Pengobatan</label>
              <textarea className="h-20 form-control" name="penanganan" value={formData.penanganan} placeholder="Masukkan detail penanganan atau pengobatan" onChange={handleChange}></textarea>
            </div>

            <div className="form-group">
              <label>Obat yang diberikan</label>
              <textarea className="h-20 form-control" name="obat" value={formData.obat} placeholder="Masukkan obat beserta dosis" onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
              <label>Kunjungan Berikutnya (jika ada)</label>
              <input type="date" name="kunjunganBerikutnya" value={formData.kunjunganBerikutnya} className="form-control" onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Biaya Pengobatan</label>
              <input type="number" name="biayaPengobatan" value={formData.biayaPengobatan} className="form-control" placeholder="Masukkan biaya dalam rupiah, contoh: 35,000" onChange={handleChange} />
            </div>
          </div>
          <div className="grid grid-cols-1 ">
            <div className="form-group">
              <label htmlFor="">Catatan tambahan</label>
              <textarea name="catatan" value={formData.catatan} id="" className="form-control" placeholder="Catatan khusus dari dokter hewan (opsional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <button className="button-save" type="submit">
            Simpan
          </button>
          <button className="button-reset">Reset</button>
        </form>
      </div>
      <div className="information space-y-3">
        <h1 className="font-bold text-2xl">Riwayat rekam medis</h1>
        <div className="search-bar ">
          <i>
            <IoSearchOutline />
          </i>
          <input type="text" value={searchValue} name="search" onChange={(e) => setsearchValue(e.target.value)} className="input-search" placeholder="Cari berdasarkan nama hewan, atau nama pemilik" />
        </div>
        {rekamMedis?.length == 0 || rekamMedis == null ? (

          <p className='mt-4 font-semibold'>
            Belum ada rekam medis yang tersimpan
          </p>
        )
          : (
            rekamMedis?.map((rekam) => (
           <CardMedicalRecords rekam={rekam} key={rekam.id}/>
            ))
          )}

      </div>
    </div>
  )
}

export default MedicalRecords
