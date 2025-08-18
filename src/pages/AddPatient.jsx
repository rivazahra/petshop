import React, { useRef, useState } from 'react'
import { BiCheck } from 'react-icons/bi'
import { supabase } from '../utils/supabase/client'

const AddPatient = () => {
  const [formData, setFormData] = useState({
    name: '',
    birth_date: '',
    species: '',
    weight: '',
    photo_url: '',
    gender: ''
  })

  const [ownerData, setOwnerData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  })


  const [preview, setPreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)

  const fileInputRef = useRef(null)


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFileSelect(file)

  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleCircleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);

      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file)
      setIsUploaded(false)
    }
  }

  const handleChange = async (e) => {  
    const { name, value, files, type } = e.target
  
    if (type === 'file') {
      const file = files[0]
      setSelectedFile(file)
      handleFileSelect(file)
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }))
    }
  }

  const handleOwnerChange = (e) => {
    const { name, value } = e.target
    setOwnerData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.species || !formData.birth_date || !formData.gender || !formData.weight || !selectedFile || !ownerData.name || !ownerData.address || !ownerData.email || !ownerData.phone) {
      alert('Mohon lengkapi semua informasi')
      return;
    }
    try {
      let photoUrl = formData.photo_url
      if (selectedFile) {
        const { data, error } = await supabase.storage.from('foto-hewan').upload(`pets/${selectedFile.name}`, selectedFile, {
          upsert: true
        })

        if (error) {
          console.log('Upload gagal', error);
          return
        }

        photoUrl = supabase.storage.from('foto-hewan').getPublicUrl(`pets/${selectedFile.name}`).data.publicUrl;
      }



      setIsUploaded(true)
      const owner = {
        name: ownerData.name,
        phone: ownerData.phone,
        address: ownerData.address,
        email: ownerData.email
      }


      const { data: ownerRes, error: ownerError } = await supabase.from('owners').insert(owner).select().single()

      if (ownerError) {
        console.error('Gagal insert owner data', ownerError)
        return;
      }
      const ownerId = ownerRes.id

      const pet = {
        name: formData.name,
        species: formData.species,
        birth_date: formData.birth_date,
        weight: formData.weight,
        photo_url: photoUrl,
        gender: formData.gender,
        owner_id: ownerId
      }
      const { data: petRes, error: petError } = await supabase.from('pets').insert(pet)

      if (petError) {
        console.error("Gagal insert pet:", petError);
        return;
      }

      alert("Berhasil simpan pasien!");

      setSelectedFile(null)
      setFormData({
        photo_url: null,
        name: '',
        species: '',
        birth_date: '',
        weight: '',
        gender: '',
      });

      setOwnerData({
        name: '',
        email: '',
        phone: '',
        address: ''
      })

    } catch (error) {
      console.error('Error:', error)
      alert('Terjadi kesalahan saat menyimpan data')
    } finally {
      setIsUploaded(false)
    }
  }

  // const saveForm = (e) => {
  // e.preventDefault();

  // // 1. Ambil data yang sudah ada (kalau ada)
  // const existingData = JSON.parse(localStorage.getItem('dataHewan')) || [];


  // const newPasien = {
  // ...formData,
  // id: Date.now()
  // }
  // // 2. Tambahkan data baru ke array
  // const newData = [...existingData, newPasien];

  // // 3. Simpan ulang ke localStorage
  // localStorage.setItem('dataHewan', JSON.stringify(newData));

  // // 4. Reset form
  // setFormData({
  // photo:"",
  // name: '',
  // jenis: '',
  // ras: '',
  // birth_date: '',
  // weight: '',
  // gender: '',
  // });

  // setOwnerData({
  // namaPemilik: '',
  // noTelp: '',
  // alamat: ''
  // })

  // console.log('Tersimpan:', newData);
  // };


  return (
    <form id='add-patient' action="" onSubmit={handleUpload}>
      <div className="add-patient">
        <div className="flex  flex-col gap-10">
          <div className="information space-y-5">
            <h1 className=" font-bold text-3xl">Tambah Pasien Baru</h1>
            <p>Daftarkan pasien baru ke dalam pasien</p>
          </div>
          <div className="information space-y-5 ">
            <h1 className="font-bold text-2xl">Informasi Pasien</h1>
            <div className="">
              <div className="flex  flex-col items-start gap-2 mb-6">
                <label htmlFor="fileinput">Klik atau drag & drop foto hewan</label>
                <div className={`relative cursor-pointer w-48 h-48 rounded-full border-4 flex items-center
                            justify-center overflow-hidden ${isDragging ? 'border-green-400 bg-green-50 scale-50' :
                    preview ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-300 bg-gray-100 hover:border-blue-400 hover:bg-blue-50'}`}
                  onClick={handleCircleClick} onDrop={handleDrop} onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}>
                  {preview ? (
                    <>
                      <img src={preview} alt="preview" className='w-full h-full object-cover rounded-full' />
                      {isUploaded && (
                        <div
                          className='absolute inset-0 bg-green-500 bg-opacity-80 rounded-full flex items-center justify-center'>
                          <BiCheck className='w-5 h-5 mr-2' />
                        </div>
                      )}
                      <button></button>
                    </>
                  ) : (
                    <div className='text-center'>
                      <p className={`text-sm transition-colors ${isDragging ? 'text-green-600'
                        : 'text-gray-500'}`}>
                        {isDragging ? 'Lepas foto di sini' : 'Upload Foto'}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        JPG, PNG • Max 5MB
                      </p>
                    </div>
                  )}
                </div>
                <input type="file" ref={fileInputRef} id='fileinput' accept='image/*' name='photo_url' className='hidden'
                  onChange={handleChange} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label htmlFor="nama-hewan">Nama Hewan</label>
                  <input type="text" id='nama-hewan' name="name" value={formData.name}
                    onChange={handleChange} className="form-control" placeholder="Masukkan nama hewan" />
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="jenis-hewan">Jenis Hewan</label>
                    <select id="jenis-hewan" className="form-control" name="species"
                      value={formData.species} onChange={handleChange}>
                      <option value="">Pilih jenis hewan</option>
                      <option value="kucing">Kucing</option>
                      <option value="anjing">Anjing</option>
                      <option value="ikan">Ikan</option>
                      <option value="kelinci">Kelinci</option>
                    </select>
                  </div>
                </div>
                {/* <div className="form-group">
                            <label htmlFor="ras">Ras</label>
                            <input type="text" id='ras' className="form-control" value={formData.ras}
                                onChange={handleChange} name="ras" placeholder="Contoh: Persia" />
                        </div> */}
                <div className="form-group">
                  <label htmlFor="umur">Tanggal lahir</label>
                  <input type="date" id='umur' className="form-control" onChange={handleChange} max={new Date().toISOString().split('T')[0]}
                    name="birth_date" placeholder="Masukkan umur hewan" value={formData.birth_date} />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Jenis kelamin</label>
                  <select name="gender" id="jenisKelamin" className="form-control" onChange={handleChange}
                    value={formData.gender}>
                    <option value="">Pilih jenis kelamin</option>
                    <option value="jantan">Jantan</option>
                    <option value="betina">Betina</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="berat-badan">Berat badan (kg)</label>
                  <input type="text" id='berat-badan' className="form-control" onChange={handleChange}
                    name="weight" placeholder="Contoh: 15" value={formData.weight} />
                </div>
              </div>

            </div>
          </div>
          <div className="information space-y-5">
            <h1 className="font-bold text-2xl">Informasi pemilik</h1>
            <div className="grid grid-cols-2 gap-3">
              <div className="form-group">
                <label htmlFor="namaPemilik">Nama Pemilik</label>
                <input type="text" id='namaPemilik' className="form-control" name="name"
                  onChange={handleOwnerChange} placeholder="Masukkan nama pemilik" value={ownerData.name} />
              </div>
              <div className="form-group">
                <label htmlFor="email">Masukkan email</label>
                <input type="email" id='email' className="form-control" name="email"
                  onChange={handleOwnerChange} placeholder="Masukkan nomor email" value={ownerData.email} />
              </div>
              <div className="form-group ">
                <label htmlFor="address">Alamat</label>
                <textarea type="text" id='address' name='address' className="control-area"
                  onChange={handleOwnerChange} placeholder="Masukkan alamat pemilik"
                  value={ownerData.address} />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Nomor telepon</label>
                <input type="text" id='phone' className="form-control" name="phone"
                  onChange={handleOwnerChange} placeholder="Masukkan nomor telepon" value={ownerData.phone} />
              </div>
            </div>
            <div className=' md:flex-row flex  items-center '>

            <button className='button-save' type='submit'>{isUploaded ? 'Menyimpan....' : 'Simpan'}</button>
            <button className="btn-reset">Reset</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default AddPatient
