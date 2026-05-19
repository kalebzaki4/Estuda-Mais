import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`relative rounded-xl shadow-soft overflow-hidden bg-surface-800 ${className}`}
      style={{ backgroundColor: '#1a1a1a' }}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 texture-subtle" aria-hidden="true" />
      <div className="relative z-10 p-8 sm:p-10">
        {children}
      </div>
    </div>
  );
};

export default Card;