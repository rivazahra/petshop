import React, { useState } from 'react'

const AddPatient = () => {
  const [formData, setFormData] = useState({
   
    name: '',
    ras: '',
    umur: '',
    jenis:'',
    berat: '',
    jenisKelamin: '',
    namaPemilik: '',
    noTelp: '',
    alamat:'',
    catatan:''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const saveForm = (e) => {
  e.preventDefault();

  // 1. Ambil data yang sudah ada (kalau ada)
  const existingData = JSON.parse(localStorage.getItem('dataHewan')) || [];


  const newPasien = {
    ...formData,
    id:Date.now()
  }
  // 2. Tambahkan data baru ke array
  const newData = [...existingData, newPasien];

  // 3. Simpan ulang ke localStorage
  localStorage.setItem('dataHewan', JSON.stringify(newData));

  // 4. Reset form
  setFormData({
    name: '',
    jenis: '',
    ras: '',
    umur: '',
    berat: '',
    jenisKelamin: '',
    namaPemilik: '',
    noTelp: '',
    alamat: '',
    catatan: ''
  });

  console.log('Tersimpan:', newData);
};


  return (
    <form id='add-patient' action="" onSubmit={saveForm}>
      <div className="add-patient">
        <div className="flex  flex-col gap-10">
          <div className="information space-y-5">
            <h1 className=" font-bold text-3xl">Tambah Pasien Baru</h1>
            <p>Daftarkan pasien baru ke dalam pasien</p>
          </div>
          <div className="information space-y-5 ">
            <h1 className="font-bold text-2xl">Informasi Pasien</h1>
            <div className="grid grid-cols-2 gap-3">
              <div className="form-group">
                <label htmlFor="nama-hewan">Nama Hewan</label>
                <input type="text" id='nama-hewan' name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Masukkan nama hewan" />
              </div>
              <div>
                <div className="form-group">
                  <label htmlFor="jenis-hewan">Jenis Hewan</label>
                  <select id="jenis-hewan" className="form-control" name="jenis" value={formData.jenis} onChange={handleChange}>
                    <option value="">Pilih jenis hewan</option>
                    <option value="kucing">Kucing</option>
                    <option value="anjing">Anjing</option>
                    <option value="ikan">Ikan</option>
                    <option value="kelinci">Kelinci</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="ras">Ras</label>
                <input type="text" id='ras' className="form-control" value={formData.ras} onChange={handleChange} name="ras" placeholder="Contoh: Persia" />
              </div>
              <div className="form-group">
                <label htmlFor="umur">Umur</label>
                <input type="text" id='umur' className="form-control" onChange={handleChange} name="umur" placeholder="Masukkan umur hewan" value={formData.umur} />
              </div>
              <div className="form-group">
                <label htmlFor="jenisKelamin">Jenis kelamin</label>
                <select name="jenisKelamin" id="jenisKelamin" className="form-control" onChange={handleChange} value={formData.jenisKelamin}>
                  <option value="">Pilih jenis kelamin</option>
                  <option value="Jantan">Jantan</option>
                  <option value="Betina">Betina</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="berat-badan">Berat badan</label>
                <input type="text" id='berat-badan' className="form-control" onChange={handleChange} name="berat" placeholder="Contoh: 3.5 kg" value={formData.berat} />
              </div>
            </div>
          </div>
          <div className="information space-y-5">
            <h1 className="font-bold text-2xl">Informasi pemilik</h1>
            <div className="grid grid-cols-2 gap-3">
              <div className="form-group">
                <label htmlFor="namaPemilik">Nama Pemilik</label>
                <input type="text" id='namaPemilik' className="form-control" name="namaPemilik" onChange={handleChange} placeholder="" value={formData.namaPemilik} />
              </div>
              <div className="form-group">
                <label htmlFor="noTelp">Nomor telepon</label>
                <input type="text" id='noTelp' className="form-control" name="noTelp" onChange={handleChange} placeholder="Masukkan nomor telepon" value={formData.noTelp} />
              </div>
            </div>
            <div className="form-group ">
              <label htmlFor="alamat">Alamat</label>
              <textarea type="text" id='alamat' name='alamat' className="control-area" onChange={handleChange} placeholder="Masukkan alamat pemilik" value={formData.alamat} />
            </div>
            <div className="form-group ">
              <label htmlFor="catatan">Catatan tambahan</label>
              <textarea type="text" id='catatan' name='catatan' className="control-area" onChange={handleChange} placeholder="Catatan khusus tentang hewan (opsional)" value={formData.catatan} />
            </div>
            <button type='submit' className='button-save'>Simpan pasien</button>
            <button  className="ml-4">Reset form</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default AddPatient
