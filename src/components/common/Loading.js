import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ 
  size = 'medium', 
  text = 'Carregando...', 
  fullScreen = false,
  className = '' 
}) => {
  const sizes = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
    xlarge: 'h-16 w-16'
  };
  
  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl'
  };
  
  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-primary ${sizes[size]}`}></div>
      {text && (
        <p className={`mt-4 text-text-muted-dark animate-pulse ${textSizes[size]}`}>
          {text}
        </p>
      )}
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className={`fixed inset-0 bg-bg-dark-primary flex items-center justify-center z-50 ${className}`}>
        {spinner}
      </div>
    );
  }
  
  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      {spinner}
    </div>
  );
};

Loading.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  text: PropTypes.string,
  fullScreen: PropTypes.bool,
  className: PropTypes.string
};

export default Loading;