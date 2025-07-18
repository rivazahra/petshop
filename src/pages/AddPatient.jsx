import React from 'react'

const AddPatient = () => {
  return (
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
              <label htmlFor="">Nama Hewan</label>
              <input type="text" className="form-control" placeholder="Masukkan nama hewan" />
            </div>
            <div>
              <div className="form-group">
                <label htmlFor="">Jenis Hewan</label>
                <select id="jenis-hewan" className='form-control' >
                   <option value="">Pilih jenis hewan</option>
                  <option value="kucing">Kucing</option>

                  <option value="anjing">Anjing</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="">Ras</label>
              <input type="text" className="form-control" placeholder="Contoh: Persia" />
            </div>
            <div className="form-group">
              <label htmlFor="">Umur</label>
              <input type="text" className="form-control" placeholder="Masukkan umur hewan" />
            </div>
            <div className="form-group">
              <label htmlFor="">Jenis kelamin</label>
              <select name="" id="" className='form-control'>
                <option value="">Pilih jenis kelamin</option>
                <option value="Jantan">Jantan</option>
                <option value="Betina">Betina</option>
              </select>
            </div>
             <div className="form-group">
              <label htmlFor="">Berat badan</label>
              <input type="text" className="form-control" placeholder="Contoh: 3.5 kg" />
            </div>
          </div>
        </div>
        <div className="information space-y-5">
          <h1 className='font-bold text-2xl'>Informasi pemilik</h1>
           <div className="grid grid-cols-2 gap-3">
            <div className="form-group">
              <label htmlFor="">Nama Pemilik</label>
              <input type="text" className="form-control" placeholder="" />
            </div>
            <div className="form-group">
              <label htmlFor="">Nomor telepon</label>
              <input type="text" className="form-control" placeholder="Masukkan nomor telepon" />
            </div>
            </div>
            <div className="form-group ">
              <label htmlFor="">Alamat</label>
              <textarea type="text" className="control-area " placeholder="Masukkan nomor telepon" />
            </div>
            <div className="form-group ">
              <label htmlFor="">Catatan tambahan</label>
              <textarea type="text" className="control-area " placeholder="Catatan khusus tentang hewan (opsional)" />
            </div>
            <button>Simpan pasien</button>
            <button className='ml-4'>Reset form</button>
        </div>
      </div>
    </div>
  )
}

export default AddPatient
