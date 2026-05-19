import type { ChangeEventHandler, ReactNode } from 'react'

type InputFieldProps = {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  leftIcon?: ReactNode;
  rightElement?: ReactNode;
  required?: boolean;
};

export default function InputField({ id, label, type = 'text', placeholder, value, onChange, leftIcon, rightElement, required = true }: InputFieldProps) {
  return (
    <div>
      {label ? <label htmlFor={id} className="sr-only">{label}</label> : null}
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          aria-required={required ? 'true' : undefined}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="input-focus-glow w-full rounded-xl bg-[#282828] text-white placeholder:text-white/60 border border-white/10 focus:border-brand-500 focus:outline-none transition-[border,opacity] duration-300 px-4 py-3 pl-12 pr-12"
        />
        {leftIcon ? (
          <span className="absolute left-4 top-1/2 -translate-y-1/2">
            {leftIcon}
          </span>
        ) : null}
        {rightElement ? (
          <span className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightElement}
          </span>
        ) : null}
      </div>
    </div>
  )
}