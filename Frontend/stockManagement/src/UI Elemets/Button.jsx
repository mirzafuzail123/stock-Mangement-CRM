import React from 'react'

export default function Button({ type, variant, text, handleOnclick }) {

    return (
        <button
            type={type}
            onClick={handleOnclick}
            className={`px-5 text-sm h-9 ${variant === "primary" ? "bg-primary hover:bg-secondary text-white" : ""}  rounded-sm whitespace-nowrap `}>
            {text}
        </button>
    )
}
