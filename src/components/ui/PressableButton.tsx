import type { MouseEventHandler, ReactNode } from 'react'

type PressableButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
};

export default function PressableButton({ children, type = 'button', className = '', onClick, ariaLabel }: PressableButtonProps) {
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