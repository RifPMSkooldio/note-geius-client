import * as React from 'react'

import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cn } from '../../../utils'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'w-[42px] h-[25px] rounded-full bg-gray-300 relative data-[state=checked]:bg-green-500 outline-none cursor-pointer',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className="block w-[21px] h-[21px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
