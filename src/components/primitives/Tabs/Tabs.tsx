import * as React from 'react'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '../../../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

type TypeColor = 'default' | 'green'
type TabContextValue = { color?: TypeColor }
const TabContext = React.createContext({} as TabContextValue)
const useTabContext = () => React.useContext(TabContext)

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & TabContextValue
>(({ color = 'default', ...props }, ref) => (
  <TabContext.Provider value={{ color }}>
    <TabsPrimitive.Root ref={ref} {...props}></TabsPrimitive.Root>
  </TabContext.Provider>
))

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const { color } = useTabContext()
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'w-full border-b flex mb-4',
        color === 'default' && 'gap-1.5',
        className
      )}
      {...props}
    />
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

const tabsTriggerVariants = cva([
  'group inline-flex items-center justify-center whitespace-nowrap transition-colors',
  'focus-visible:ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  'disabled:pointer-events-none disabled:text-muted-foreground',
  'data-[state=active]:text-foreground data-[state=active]:font-bold data-[state=active]:shadow-sm',
  'after:absolute after:left-0 after:right-0 after:bottom-[-1px] after:h-px',
  'data-[state=active]:after:scale-y-[3] after:origin-bottom after:transition-all',
  'hover:after:bg-blue-600/80 data-[state=active]:after:bg-blue-600',
  'px-4 py-2.5',
])

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
    Omit<VariantProps<typeof tabsTriggerVariants>, 'color'> & {
      loading?: boolean
    }
>(({ className, children, disabled, loading, ...props }, ref) => {
  const { color } = useTabContext()
  return (
    <div
      className={cn(
        'relative',
        color === 'green' && 'flex-1',
        disabled && 'text-gray-400 cursor-not-allowed',
        className
      )}
    >
      <span
        className={tabsTriggerVariants({
          className: 'font-bold invisible',
        })}
      >
        {children}
      </span>
      <TabsPrimitive.Trigger
        ref={ref}
        className={tabsTriggerVariants({
          className: cn('absolute inset-x-0 text-center transition-colors'),
        })}
        disabled={disabled}
        {...props}
      >
        {loading && (
          <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
        )}
        {children}
      </TabsPrimitive.Trigger>
    </div>
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
