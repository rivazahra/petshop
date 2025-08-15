import _ from "lodash";
import React from "react";

export const InputField = ({ label, field, type = "text", icon, required = false, formData, setFormData }) => {
    const value = _.get(formData, field, "")
    // const handleChange = (e) => {
    //     const updated = _.set({ ...formData }, field, e.target.value)
    //     setFormData(updated)
    // } 
    const handleChange = (e) => {
        // const cloned = JSON.parse(JSON.stringify(formData));
        const cloned = structuredClone(formData);
        
        _.set(cloned, field, e.target.value);
        setFormData(cloned);
    };
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
                <input type={type} name={field} value={value}
                    // onChange={(e) => {
                    //     const updatedPasien = _.set({ ...formData }, field, e.target.value); // Lodash set
                    //     setFormData(updatedPasien);
                    // }}
                    onChange={handleChange}
                    className={`w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500
        transition-colors duration-200 ease-in-out
        hover:border-gray-400`}
                    placeholder={`Masukkan ${label.toLowerCase()}`}
                />
            </div>
        </div>

    )
}

