import React, { useEffect, useRef, useState } from 'react'
import { getPatient, supabase } from '../utils/supabase/client'
import { useLocation } from 'react-router-dom'
import { Cake, Camera, Edit, Mail, MapPin, PawPrint, Phone, Save, Shield, User, Weight, X } from
    'lucide-react'
import { InputField } from '../components/InputField'
import _ from 'lodash'

const DetailPatient = () => {

    const [pasien, setPasien] = useState(null)
    const [formData, setFormData] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false)
    const [uploading, setUploading] = useState(false)
    const location = useLocation()
    const { pasienId } = location.state || {}

    const fileInputRef = useRef(null)

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    useEffect(() => {
        async function getHewan() {
            const res = await getPatient()
            const patientPerID = res.find((item) => item.id === pasienId)
            // console.log(pasien.owners.name);
            setPasien(patientPerID)
            setPhotoPreview(patientPerID.photo_url)
            
            return patientPerID
        }
        getHewan()
    }, [])

    const [photoPreview, setPhotoPreview] = useState(pasien?.photo_url || null)
   
    const handleEdit = () => {
        setFormData({ ...pasien })
        setShowModal(true)
    }

    // console.log(formData);
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.name || !formData.species || !formData.gender || !formData.owners?.name || !formData.owners?.phone ||
            !formData.owners?.email || !formData.owners?.address) {
            alert('Mohon lengkapi semua field yang required!');
            return;
        }

        try {
            setUploading(true)
            let photoUrl = formData.photo_url;

            if (selectedFile) {
                photoUrl = await uploadPhoto(selectedFile)

                if (formData.photo_url && photoUrl) {
                    try {
                        const oldFileName = formData.photo_url.split('/').pop();
                        await supabase.storage.from('foto-hewan').remove([oldFileName]);
                    } catch (error) {
                        console.log('Failed to remove old photo:', error);
                    }
                }
            }

            const pet = {
                name: formData.name,
                species: formData.species,
                weight: formData.weight,
                gender: formData.gender,
                photo_url: photoUrl,
                birth_date: formData.birth_date
            };

            const owner = {
                name: formData.owners.name,
                phone: formData.owners.phone,
                address: formData.owners.address,
                email: formData.owners.email
            };
            const { data: petData, error: petError } = await supabase
                .from('pets')
                .update(pet)
                .eq('id', pasien.id) // WHERE clause
                .select()
                .single();

            if (petError) throw petError;

            const { data: ownerData, error: ownerError } = await supabase
                .from('owners')
                .update(owner)
                .eq('id', pasien.owner_id).select().single();
               
            if (ownerError) throw ownerError
            alert('Data berhasil update')
            setPasien({
                ...petData,
                owners:ownerData,
                owner_id:pasien.owner_id
            })
            setShowModal(false)
            
            

        } catch (error) {
            console.error('Unexpected error:', error);
            alert('Terjadi kesalahan: ' + error.message);
        } finally {
            setUploading(false)
        }
    }

    const InfoCard = ({ icon, label, value, color = "text-gray-600" }) => (
        <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg bg-pink-50`}>
                    {React.cloneElement(icon, { className: "w-5 h-5 text-pink-600" })}
                </div>
                <div className='flex-1'>
                    <p className="text-sm text-gray-500">{label}</p>
                    <p className={`font-semibold capitalize ${color}`}>{value}</p>
                </div>
            </div>
        </div>
    );


    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file')
                return
            }
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB')
                return;
            }
            setSelectedFile(file)

            const reader = new FileReader()
            reader.onload = (e) => setPhotoPreview(e.target.result)
            reader.readAsDataURL(file)
        }
        e.target.value = '';
    }

    // upload photo to supabase storage
    const uploadPhoto = async (file) => {
        if (!file) return null

        try {
            setUploading(true)
            // unique file name
            const fileExt = file.name.split('.').pop();
            const fileName = `pet_${pasien.id}_${Date.now()}.${fileExt}`;

            // upload to supabase storage
            const { data: uploadData, error: uploadError } = await supabase.storage.from('foto-hewan').upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            })

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage.from('foto-hewan').getPublicUrl(fileName)

            return publicUrl;

        } catch (error) {
            console.log('Error uploading photo:', error);
            throw error
        } finally {
            setUploading(false)
        }
    }


    const SelectField = ({ label, field, options, icon, required = false }) => {
        const value = _.get(formData, field, "")
        const handleChange = (e) => {
            const updated = _.set({ ...formData }, field, e.target.value)
            setFormData(updated)
        }
        return (
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                <div className="relative">
                    {icon && (
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            {React.cloneElement(icon, { className: "w-4 h-4 text-gray-400" })}
                        </div>
                    )}
                    <select value={value} onChange={handleChange} className={`w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border
            border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors
            duration-200 ease-in-out hover:border-gray-400 bg-white`}>
                        {options.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-10">
            <div className='information md:flex-row flex flex-col justify-between'>
                <div className='space-y-2'>
                    <h1 className='font-bold text-3xl '>
                        Detail Pasien
                    </h1>
                    <p>Berikut informasi tentang pasien hewan.</p>
                </div>
                <div className='p-3'>
                    <button onClick={handleEdit}
                        className="flex p-2 items-center px-4 cursor-pointer  bg-white border border-gray-300 rounded-lg hover:bg-gray-200">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                    </button>
                </div>
            </div>
            {/* modal overlay */}
            <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300
        ease-out ${showModal ? 'opacity-100 visible' : 'opacity-50 invisible'}`} onClick={() =>
                    setShowModal(false)}
            >
                {/* modal content */}
                <div className={`bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden
            transition-all duration-300 ease-out ${showModal ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 translate-y-4'}`} onClick={(e) => e.stopPropagation()}
                >
                    {/* modal header */}
                    <div
                        className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-pink-100">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Edit Data Pasien</h2>
                            <p className="text-gray-600 text-sm mt-1">Perbarui informasti hewan</p>
                        </div>
                        <button onClick={() => setShowModal(false)}
                            className="p-2 hover:bg-white hover:bg-opacity-60 rounded-lg 
                         transition-colors duration-200 ease-in-out
                         transform hover:scale-110 active:scale-95"
                        >
                            <X className="w-5 h-5 text-gray-600 cursor-pointer" />
                        </button>
                    </div>
                    {/* modal body */}
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                        <div className="space-y-8">
                            {/* Pet Photo Section */}
                            <div className="text-center">
                                <div className="inline-block relative">
                                    <div
                                        className="w-34 h-34  bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        {photoPreview ? (
                                            <img src={ photoPreview } alt="Pet preview" className=' rounded-lg w-full h-full object-cover' />
                                        ) : (
                                            <PawPrint className="w-10 h-10 text-pink-600" />
                                        )}

                                    </div>
                                    <button type="button"
                                        className="absolute -bottom-2 -right-2 p-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 
                               transition-colors duration-200 ease-in-out
                               transform hover:scale-110 active:scale-95" onClick={triggerFileInput}>
                                        <Camera className="w-4 h-4 cursor-pointer" />
                                        <input type="file" className='hidden' ref={fileInputRef} accept='image/*' onChange={handleFileSelect} />
                                    </button>
                                </div>
                                {uploading && (
                                    <div
                                        className="absolute inset-0 bg-black/50 bg-opacity-50 rounded-2xl flex items-center justify-center">
                                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin">
                                        </div>
                                    </div>
                                )}
                                <p className="text-sm text-gray-500 pt-3">Klik untuk mengubah foto</p>


                                {photoPreview && (
                                    <button type='button' onClick={() => {
                                        setPhotoPreview(null)
                                        setSelectedFile(null)
                                    }} className='text-xs text-red-500 hover:text-red-700 mt-2 cursor-pointer'>Hapus photo</button>
                                )}
                            </div>
                            {/* pet information */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <PawPrint className="w-5 h-5 text-pink-600 mr-2" />
                                    Informasi Hewan
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField label="Nama hewan" field="name" icon={<PawPrint />}
                                        required formData={formData} setFormData={setFormData}
                                    />
                                    <SelectField label="Jenis" field="species" options={['Kucing', 'Anjing', 'Ikan'
                                        , 'Kelinci']} icon={<PawPrint />}
                                        required
                                    />
                                    <InputField label="Tanggal lahir" field="birth_date" icon={<Cake />}
                                        required formData={formData} setFormData={setFormData}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <InputField label="Berat (kg)" field="weight" type="number" icon={<Weight />}
                                            required formData={formData} setFormData={setFormData}
                                        />
                                        <SelectField label="Jenis Kelamin" field="gender" options={['Jantan', 'Betina']}
                                            icon={<Shield />}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Owner Information */}
                            <div className=" rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <User className="w-5 h-5 text-blue-600 mr-2" />
                                    Owner Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField label="Nama pemilik hewan" field="owners.name" icon={<User />}
                                        required formData={formData} setFormData={setFormData}
                                    />
                                    <InputField label="No. Telp" field="owners.phone" icon={<Phone />}
                                        required formData={formData} setFormData={setFormData}
                                    />
                                    <InputField label="Email" field="owners.email" required formData={formData}
                                        setFormData={setFormData} type="email" icon={<Mail />}
                                    />
                                    <div className="md:col-span-2">
                                        <InputField label="Alamat" field="owners.address" icon={<MapPin />}
                                            required formData={formData} setFormData={setFormData}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Modal Footer */}
                            <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
                                <button type="button" onClick={() => setShowModal(false)}
                                    className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 
                         transition-colors duration-200 ease-in-out
                         transform hover:scale-105 active:scale-95"
                                >
                                    Batal
                                </button>
                                <button type="submit" onClick={handleSubmit}
                                    className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 
                         transition-colors duration-200 ease-in-out
                         transform hover:scale-105 active:scale-95
                         flex items-center space-x-2">
                                    <Save className="w-4 h-4" />
                                    <span>Simpan Perubahan</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                pasien !== null ? (
                    <>
                        <div className='information'>
                            <div className='flex flex-col'>
                                <div className=' md:flex-row flex flex-col gap-8 cursor-pointer'>
                                    <div  >
                                        <img src={pasien.photo_url} className='w-40 h-40 object-cover  rounded-xl' alt="" />
                                        <button className='cursor-pointer mt-3  text-pink-600 hover:text-pink-700 flex  items-center' onClick={() => setShowModal(true)}>
                                           
                                        </button>
                                    </div>
                                    <div className='flex-1'>
                                        <h1 className='text-2xl font-bold capitalize'>
                                            {pasien.name}</h1>
                                        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mt-2'>
                                            <InfoCard icon={<PawPrint />} label="Jenis" value={pasien.species} />
                                            <InfoCard icon={<Cake />} label="Tanggal lahir" value={pasien.birth_date} />
                                            <InfoCard icon={<Weight />} label="Berat" value={`${pasien.weight} kg`} />
                                            <InfoCard icon={<Shield />} label="Jenis Kelamin" value={pasien.gender} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="information">
                            <h1 className='text-xl font-bold mb-3'>Informasi pemilik</h1>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex items-center space-x-3">
                                    <User className='w-5 h-5 text-gray-500' />
                                    <div>
                                        <p className="text-sm text-gray-500">Nama pemilik</p>
                                        <p className="font-bold text-gray-900">{pasien?.owners?.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className='w-5 h-5 text-gray-500' />
                                    <div>
                                        <p className="text-sm text-gray-500">Telepon</p>
                                        <p className="font-bold text-gray-900">{pasien?.owners?.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <MapPin className='w-5 h-5 text-gray-500' />
                                    <div>
                                        <p className="text-sm text-gray-500">Alamat</p>
                                        <p className="font-bold text-gray-900">{pasien?.owners?.address}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </>

                ) : (
                    <h1>No data</h1>

                )}
        </div>
    )
}

export default DetailPatient
