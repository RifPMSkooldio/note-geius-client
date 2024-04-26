import { ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean
  leftAdornment?: React.ReactNode
  rightAdornment?: React.ReactNode
}

const Button = (props: ButtonProps) => {
  const {
    children,
    className,
    fullWidth,
    leftAdornment,
    rightAdornment,
    ...restProps
  } = props
  return (
    <button
      {...restProps}
      className={cn(
        'px-5 py-2 bg-blue-700 hover:bg-blue-900 transition-colors text-white rounded-md',
        'mt-6 font-medium',
        fullWidth && 'w-full',
        restProps.disabled &&
          'cursor-not-allowed bg-gray-300 hover:bg-gray-400',
        className
      )}
    >
      {leftAdornment}
      {children}
      {rightAdornment}
    </button>
  )
}

export default Button
