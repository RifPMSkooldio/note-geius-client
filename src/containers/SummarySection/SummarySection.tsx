import { ComponentProps } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/primitives/Tabs'
import { cn } from '../../utils'
import { BulletSection } from '../BulletSection'

type SummarySectionProps = ComponentProps<'div'> & {
  disabled?: boolean
}

export const SummarySection = (props: SummarySectionProps) => {
  const { disabled, ...restProps } = props

  return (
    <div {...restProps}>
      <Tabs defaultValue="bullet">
        <div
          className={cn(
            'flex border-b border-b-[#e5e7eb] mb-5',
            'sticky top-0 bg-white'
          )}
        >
          <TabsList className="w-min px-4 mb-0 border-none">
            <TabsTrigger value="bullet" disabled={disabled}>
              Bullet
            </TabsTrigger>
          </TabsList>
        </div>
        {!disabled && (
          <div>
            <TabsContent value="bullet">
              <BulletSection />
            </TabsContent>
          </div>
        )}
      </Tabs>
    </div>
  )
}
