import React from 'react'

const CardMedicalRecords = ({ rekam }) => {
return (
<div className="form-group mt-10">
    <div className="bg-gray-100 p-4 rounded-md">
        <p>
            <strong className='capitalize'>{rekam.name}</strong>
        </p>
        <p>
            <strong>Tanggal:</strong> {rekam.visit_date} <span className="mx-1">|</span>
            <strong>Diagnosis:</strong> {rekam.diagnosis}
        </p>
        <p>
            <strong>Penanganan:</strong> {rekam.treatment}
        </p>
        <p>
            <strong>Obat:</strong> {rekam.medicine}
        </p>
        <p>
            <strong>Biaya:</strong> Rp {rekam.cost}
        </p>
    </div>

</div>
)
}

export default CardMedicalRecords
