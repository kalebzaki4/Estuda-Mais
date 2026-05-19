import type { MouseEventHandler, ReactNode } from 'react'

type SocialButtonProps = {
  icon: ReactNode;
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
};

export default function SocialButton({ icon, label, onClick, ariaLabel }: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || label}
      className="social-btn w-full flex items-center gap-3 rounded-xl bg-[#282828] text-white px-4 py-3 border border-white/10 hover:border-white/20 hover:shadow-soft transition-[colors,box-shadow] duration-300"
    >
      <span className="inline-flex items-center justify-center w-6 h-6">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
}