import React, { useId } from 'react';

const Input = React.forwardRef(function Input(
  { label, type = 'text', className = '', ...props },
  ref
) {
  const id = useId();
  return (
    <div className='w-full'>
      {label && (
        <label className='block text-gray-700 text-sm font-bold mb-1' htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`border rounded-lg py-2 px-3 w-full text-gray-700 ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
