import React from 'react'

export default function InputField({
    defaultValue, type, step, name, id, required, placeholder, handleOnChange
}) {
    return (
        <input
            defaultValue={defaultValue}
            type={type}
            step={step}
            name={name}
            id={id}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary focus:outline-none block w-full p-2.5 "
            placeholder={placeholder}
            required={required}
            onChange={handleOnChange}
        />

    )
}
