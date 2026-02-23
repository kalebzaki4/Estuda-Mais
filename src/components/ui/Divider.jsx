import React from 'react'

export default function Divider({ label }) {
  return (
    <div className="my-6 flex items-center gap-3" aria-hidden="true">
      <div className="h-px w-full bg-white/10" />
      <span className="text-white/60 text-xs uppercase tracking-wider">{label}</span>
      <div className="h-px w-full bg-white/10" />
    </div>
  )
}