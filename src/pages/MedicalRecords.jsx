import React from 'react'

const MedicalRecords = () => {
  const pasien = JSON.parse(localStorage.getItem('dataHewan'))
  console.log(pasien)

  return (
    <div className="medical-records flex flex-col gap-8">
      <div className="information space-y-2">
        <h1 className="text-3xl font-bold capitalize">Rekam Medis</h1>
        <p className="">Tambah dan kelola rekam medis pasien</p>
      </div>
      <div className="information space-y-5">
        <h1 className="text-2xl font-semibold mb-5">Tambah rekam medis baru</h1>
        <div className="grid grid-cols-2 gap-3">
          <div className="form-group">
            <label className="font-bold">Pilih pasien</label>
            <select className="form-control">
              <option value="">Pilih pasien..</option>
              {pasien.map((pas) => (
                <option key={pas.id} value="">
                  {pas.name} - {pas.namaPemilik}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Tanggal Kunjungan</label>
            <input type="date" className="form-control" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 mt-3">
          <div className="form-group">
            <label>Keluhan/Gejala</label>
            <textarea className="h-20 form-control" placeholder="Masukkan keluhan atau gejala yang dialami hewan"></textarea>
          </div>
          <div className="form-group">
            <label>Diagnosis</label>
            <textarea className="h-20 form-control" placeholder="Masukkan diagnosis dari dokter hewan"></textarea>
          </div>
        </div>

        {/* Grid kembali ke 2 kolom */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="form-group">
            <label>Penanganan/Pengobatan</label>
            <textarea className="h-20 form-control" placeholder="Masukkan detail penanganan atau pengobatan"></textarea>
          </div>

          <div className="form-group">
            <label>Obat yang diberikan</label>
            <textarea className="h-20 form-control" placeholder="Masukkan obat beserta dosis"></textarea>
          </div>
           <div className="form-group">
            <label>Kunjungan Berikutnya (jika ada)</label>
            <input type="date" className="form-control" />
          </div>

          <div className="form-group">
            <label>Biaya Pengobatan</label>
            <input type="number" className="form-control" placeholder="Masukkan biaya dalam rupiah, contoh: 35,000" />
          </div>         
        </div>
        <div className="grid grid-cols-1 ">
          <div className="form-group">
          <label htmlFor="">Catatan tambahan</label>
          <textarea name="" id="" className='form-control' placeholder='Catatan khusus dari dokter hewan (opsional)'></textarea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MedicalRecords
