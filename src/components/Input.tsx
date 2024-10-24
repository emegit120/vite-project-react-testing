import { forwardRef, InputHTMLAttributes, useImperativeHandle, useRef } from "react";
import { tv } from 'tailwind-variants';

const input = tv({
  base: 'font-medium text-white rounded active:opacity-80',
  variants: {
    color: {
      primary: 'text-white',
      secondary: 'bg-purple-500 text-white'
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'px-4 py-3 text-lg'
    },
    placeholder: {
      primary: "placeholder-zinc-400 text-lg",
    },
    variant: {
      first: "bg-blue-800",
      second: "bg-green-800",
      third: "bg-zinc-800",
    }
  },
  compoundVariants: [
    {
      size: ['sm', 'md'],
      class: 'px-3 py-1'
    }
  ],
  defaultVariants: {
    size: 'md',
    color: 'primary',
    placeholder: "primary",
    variant: "first"
  }
});

type PropsInput = InputHTMLAttributes<HTMLInputElement> & {
  val?: string;
}

export const Input = forwardRef(({ val, ...rest }: PropsInput, ref) => {
  const inputRef = useRef(null)

  useImperativeHandle(ref, () => { return {} }, [])
  return (
    <>
      {val === 'first' && <input id={val} aria-label={val} {...rest} ref={inputRef} className={input({ placeholder: 'primary', variant: val })} />}
      {val === 'second' && <input id={val} aria-label={val} {...rest} ref={inputRef} className={input({ placeholder: 'primary', variant: val })} />}
      {val === 'third' && <input id={val} aria-label={val} {...rest} ref={inputRef} className={input({ placeholder: 'primary', variant: val })} />}
      {val === '' && <input id={val} aria-label={val} {...rest} ref={inputRef} className={input({ placeholder: 'primary' })} />}
    </>
  )
})