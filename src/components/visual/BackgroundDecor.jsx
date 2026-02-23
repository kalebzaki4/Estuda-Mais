import React from 'react'

export default function BackgroundDecor({ children, className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(140,82,255,0.2)_0%,_rgba(0,0,0,0)_50%),_radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.06)_0%,_rgba(0,0,0,0)_55%)]" aria-hidden="true" />
      {children}
    </div>
  )
}