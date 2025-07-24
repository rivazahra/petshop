import React, { useMemo, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import CardMedicalRecords from '../components/CardMedicalRecords'

const MedicalRecords = () => {
  const pasien = JSON.parse(localStorage.getItem('dataHewan'))
  const rekamMedis = JSON.parse(localStorage.getItem('rekamMedis'))

  const [searchValue, setsearchValue] = useState('')


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

  const handleSearch = useMemo(() => {
    let filtered = rekamMedis;

    if (searchValue.trim()) {
      const searchLower = searchValue.toLowerCase().trim()
      filtered = filtered.filter((patient) => patient.pasien?.toLowerCase().includes(searchLower))
    }
    return filtered
  }, [rekamMedis, searchValue])

  const handleReset = () => {
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
  }


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
    <div className="medical-records flex flex-col gap-8 text-sm md:text-md">
      <div className="information space-y-2">
        <h1 className="text-3xl font-bold capitalize">Rekam Medis</h1>
        <p className="">Tambah dan kelola rekam medis pasien</p>
      </div>
      <div className="information space-y-5">
        <h1 className="text-2xl font-semibold mb-5">Tambah rekam medis baru</h1>

        <form action="med-records" onSubmit={saveForm}>
          <div className="grid grid-cols-2 gap-3">
            <div className="form-group">
              <label htmlFor='pilih-pasien' className="font-bold">Pilih pasien</label>
              <select className="form-control" id='pilih-pasien' name="pasien" value={formData.pasien} onChange={handleChange}>
                <option value="">Pilih pasien..</option>
                {pasien.map((pas) => (
                  <option key={pas.id} value={pas.pasien}>
                    {pas.name} - {pas.namaPemilik}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor='tgl-kunjungan'>Tanggal Kunjungan</label>
              <input type="date" id='tgl-kunjungan' name="tglKunjungan" onChange={handleChange} value={formData.tglKunjungan} className="form-control" />
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
          <div className="grid grid-cols-2  md:gap-3 mt-3 ">
            <div className="form-group">
              <label className='' htmlFor='penanganan'>Penanganan/Pengobatan</label>
              <textarea id='penanganan' className="h-20 form-control txt-area" name="penanganan" value={formData.penanganan} placeholder="Masukkan detail penanganan atau pengobatan" onChange={handleChange}></textarea>
            </div>

            <div className="form-group">
              <label htmlFor='obat-pasien'>Obat yang diberikan</label>
              <textarea className="h-20 form-control" id='obat-pasien' name="obat" value={formData.obat} placeholder="Masukkan obat beserta dosis" onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
              <label htmlFor='nextKunjungan'>Kunjungan Berikutnya (jika ada)</label>
              <input type="date" id='nextKunjungan' name="kunjunganBerikutnya" value={formData.kunjunganBerikutnya} className="form-control" onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor='biaya-pengobatan'>Biaya Pengobatan</label>
              <input type="number" id='biaya-pengobatan' name="biayaPengobatan" value={formData.biayaPengobatan} className="h-10 form-control" placeholder="Masukkan biaya dalam rupiah, contoh: 35,000" onChange={handleChange} />
            </div>
          </div>
          <div className="grid grid-cols-1 ">
            <div className="form-group">
              <label htmlFor="catatanTambahan">Catatan tambahan</label>
              <textarea name="catatan" value={formData.catatan} id="catatanTambahan" className="form-control" placeholder="Catatan khusus dari dokter hewan (opsional)" onChange={handleChange}></textarea>
            </div>
          </div>
          <button className="button-save" type="submit">
            Simpan
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
        {rekamMedis?.length == 0 || rekamMedis == null ? (

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
