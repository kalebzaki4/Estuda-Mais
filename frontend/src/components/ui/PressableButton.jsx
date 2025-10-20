import React from 'react'

export default function PressableButton({ children, type = 'button', className = '', onClick, ariaLabel }) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`pressable ripple rounded-xl font-medium transition-colors ${className}`}
    >
      {children}
    </button>
  )
}