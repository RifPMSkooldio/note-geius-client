import { doc, onSnapshot } from 'firebase/firestore'
import { ComponentProps, useEffect, useState } from 'react'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/primitives/Tabs'
import { db } from '../../services/firebase'
import { cn } from '../../utils'
import { DocumentName } from '../../utils/type'
import { BulletSection } from '../BulletSection'
import { MindmapSection } from '../MindmapSection'
import { QuizSection } from '../QuizSection'
import { mockQuizzes } from '../QuizSection/const'
import { useSessionName } from '../SessionNameProvider/SessionNameProvider'

type SummarySectionProps = ComponentProps<'div'> & {
  disabled?: boolean
}

export const SummarySection = (props: SummarySectionProps) => {
  const { disabled, ...restProps } = props
  const [summaryLoading, setSummaryLoading] = useState(false)
  const [quizLoading, setQuizLoading] = useState(false)
  const [summaryDisabled, setSummaryDisabled] = useState(true)
  const [quizDisabled, setQuizDisabled] = useState(true)
  const { name } = useSessionName()

  useEffect(() => {
    if (!disabled) {
      setSummaryLoading(true)
      setQuizLoading(true)
    }
  }, [disabled])

  useEffect(() => {
    if (!name) return

    const unsubSummary = onSnapshot(
      doc(db, name, DocumentName.VISUALIZATION),
      (doc) => {
        const res = doc.data()?.mindmapWithHintURL as string
        if (!res) return
        setSummaryDisabled(false)
        setSummaryLoading(false)
      }
    )

    const unsubQuiz = onSnapshot(
      doc(db, name, DocumentName.ASSESSMENT),
      (doc) => {
        const res = doc.data()?.assessmentJson as string
        if (!res) return
        setQuizDisabled(false)
        setQuizLoading(false)
      }
    )

    return () => {
      unsubSummary()
      unsubQuiz()
    }
  }, [name])

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
          <TabsList className="w-min px-4 mb-0 border-none">
            <TabsTrigger
              value="summary"
              disabled={summaryDisabled}
              loading={summaryLoading}
            >
              Mind Maps
            </TabsTrigger>
          </TabsList>
          <TabsList className="w-min px-4 mb-0 border-none">
            <TabsTrigger
              value="quiz"
              disabled={quizDisabled}
              loading={quizLoading}
            >
              Quiz
            </TabsTrigger>
          </TabsList>
        </div>
        {!disabled && (
          <div>
            <TabsContent value="bullet">
              <BulletSection />
            </TabsContent>
            <TabsContent value="summary">
              <MindmapSection />
            </TabsContent>
            <TabsContent value="quiz">
              <QuizSection quizData={mockQuizzes} />
            </TabsContent>
          </div>
        )}
      </Tabs>
    </div>
  )
}
