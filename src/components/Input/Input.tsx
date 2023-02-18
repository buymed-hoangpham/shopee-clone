import type { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface InputProps {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  placeholder?: string
  className?: string
  name: string
  register: UseFormRegister<any>
  autoComplete?: string
}

export default function Input({
  type,
  errorMessage,
  placeholder,
  className,
  name,
  register,
  autoComplete
}: InputProps) {
  return (
    <div className={className}>
      <input
        type={type}
        className='p-2.5 rounded-sm w-full outline-none focus:shadow-sm border border-gray-300 focus:border-gray-600'
        placeholder={placeholder}
        {...register(name)}
        autoComplete={autoComplete}
      />
      <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
    </div>
  )
}
