import React from 'react'

export default function BrandPanel({ title = 'Estuda+', description = 'Aprenda continuamente com conteúdos personalizados.', className = '' }) {
  return (
    <div className={`brand-panel rounded-2xl p-6 bg-[#6A3AF2] text-white shadow-2xl/30 ${className}`}>
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  )
}