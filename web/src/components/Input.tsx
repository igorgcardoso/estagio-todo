import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  placeholder?: string;
  label: string;
}

export default function Input({ id, name, placeholder, label, className, ...rest }: InputProps) {
  className = className ? className : '';
  return (
    <div className='flex flex-col gap-2'>
      <label
        htmlFor={id}
        className='font-semibold'>
        {label}
      </label>
      <input
        {...rest}
        name={name}
        id={id}
        placeholder={placeholder ? placeholder : ''}
        className={'bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 text-zinc-500' + className}
      />
    </div>
  );
}
