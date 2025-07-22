import React from 'react'

const CardMedicalRecords = ({ rekam }) => {
    return (
        <div className="form-group mt-10">
            <div className="bg-gray-100 p-4 rounded-md">
                <p>
                    <strong>{rekam.pasien} - Kucing Persia</strong>
                </p>
                <p>
                    <strong>Tanggal:</strong> {rekam.tglKunjungan} <span className="mx-1">|</span>
                    <strong>Diagnosis:</strong> {rekam.diagnosis}
                </p>
                <p>
                    <strong>Penanganan:</strong> {rekam.penanganan}
                </p>
                <p>
                    <strong>Obat:</strong> {rekam.obat}              </p>
                <p>
                    <strong>Biaya:</strong> Rp {rekam.biayaPengobatan}
                </p>
            </div>

        </div>
    )
}

export default CardMedicalRecords
