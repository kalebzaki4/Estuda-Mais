import React from 'react'
export default function OrbitEstudaPlus({
  size = { width: 'min(92vw, 80rem)', height: 'min(38vw, 28rem)' },
  center = { top: '50%', left: '50%' },
  zIndex = 0,
  plus = [
    { angle: '12deg', radius: '42%', pulseDur: '7s', pulseDelay: '0s' },
    { angle: '40deg', radius: '35%', pulseDur: '6.2s', pulseDelay: '0.6s' },
    { angle: '95deg', radius: '47%', pulseDur: '5.8s', pulseDelay: '0.3s' },
    { angle: '150deg', radius: '38%', pulseDur: '6.6s', pulseDelay: '1.1s' },
    { angle: '210deg', radius: '45%', pulseDur: '6.4s', pulseDelay: '0.2s' },
    { angle: '270deg', radius: '33%', pulseDur: '5.5s', pulseDelay: '0.8s' },
    { angle: '320deg', radius: '40%', pulseDur: '6.9s', pulseDelay: '1.3s' }
  ],
  className = ''
}) {
  return (
    <div
      className={`knowledge-orbit absolute ${className}`}
      aria-hidden="true"
      style={{ top: center.top, left: center.left, transform: 'translate(-50%, -50%)', width: size.width, height: size.height, zIndex }}
    >
      <div className="orbit-ring ring-outer" />
      <div className="orbit-ring ring-middle" />
      <div className="orbit-ring ring-inner" />
      {plus.map((p, i) => (
        <span
          key={i}
          className="plus-node"
          style={{ '--angle': p.angle, '--radius': p.radius, '--pulseDur': p.pulseDur, '--pulseDelay': p.pulseDelay }}
        >
          +
        </span>
      ))}
    </div>
  )
}