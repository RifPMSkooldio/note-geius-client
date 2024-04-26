/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps, useEffect, useMemo, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { QuizData, QuizInput } from './type'
import { SingleQuiz } from './SingleQuiz'
import Button from '../../components/Button/Button'
import { cn } from '../../utils'
import ShowResultSection from './ShowResultSection'
import ReviewResultSection from './ReviewResultSection'
import { useSessionName } from '../SessionNameProvider/SessionNameProvider'
import { doc, onSnapshot } from 'firebase/firestore'
import { formatJsonString } from '../../utils/formatJsonString'
import { db } from '../../services/firebase'
import { DocumentName } from '../../utils/type'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Error, { ERROR_MESSAGE } from '../../components/Error/Error'

type QuizSectionProps = ComponentProps<'div'> & { quizData: QuizData }

enum QUIZ_STATE {
  TAKING_QUIZ,
  SHOW_RESULT,
  REVIEW_RESULT,
}

export const QuizSection = (props: QuizSectionProps) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(1)
  const [questionState, setQuestionState] = useState<QUIZ_STATE>(
    QUIZ_STATE.TAKING_QUIZ
  )
  const [score, setScore] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { ...rest } = props

  const [quiz, setQuiz] = useState<any>()

  const methods = useForm<QuizInput>({
    defaultValues: {
      answers: Array(quiz?.quiz?.multipleChoice.length).fill(null),
    },
  })
  const { handleSubmit, watch } = methods

  const handleNext = () => {
    setCurrentQuizIndex((prev) => prev + 1)
  }

  const handlePrev = () => {
    setCurrentQuizIndex((prev) => prev - 1)
  }

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuizIndex(index)
  }

  const isLastQuestion = useMemo(() => {
    return currentQuizIndex === quiz?.quiz?.multipleChoice.length
  }, [currentQuizIndex, quiz])

  const onSubmit: SubmitHandler<QuizInput> = (data) => {
    // TODO: Loop check correctAnswer
    if (!quiz || !quiz?.quiz?.multipleChoice) return

    const { answers } = data
    console.log('answers', answers)
    let score = 0
    answers.forEach((answer, index) => {
      if (answer === quiz.quiz.multipleChoice[index].correctAnswer) {
        score++
      }
    })
    setScore(score)
    setQuestionState(QUIZ_STATE.SHOW_RESULT)
  }

  const currentQuestion = useMemo(() => {
    return quiz?.quiz?.multipleChoice[currentQuizIndex - 1]
  }, [currentQuizIndex, quiz])

  const answers = watch('answers')
  const enableSubmit = answers.every((answer) => answer !== null)

  const handleReset = () => {
    setCurrentQuizIndex(1)
    methods.reset()
    setQuestionState(QUIZ_STATE.TAKING_QUIZ)
  }

  const handleReview = () => {
    setQuestionState(QUIZ_STATE.REVIEW_RESULT)
    setCurrentQuizIndex(1)
  }

  const { name } = useSessionName()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!name) return

    const unsub = onSnapshot(doc(db, name, DocumentName.ASSESSMENT), (doc) => {
      const res = doc.data()?.assessmentJson as string
      if (!res) return
      try {
        const obj = formatJsonString(res)
        setQuiz(obj)
      } catch (error) {
        setErrorMessage(ERROR_MESSAGE)
        return
      } finally {
        setLoading(false)
      }
    })

    return () => {
      unsub()
    }
  }, [name])

  if (loading || !quiz || !quiz?.quiz?.multipleChoice)
    return <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
  if (errorMessage) return <Error message={errorMessage} />

  return (
    <div {...rest}>
      <FormProvider {...methods}>
        {questionState === QUIZ_STATE.TAKING_QUIZ && (
          <form>
            <div className="flex gap-2 justify-center pb-4 border-b">
              {quiz?.quiz?.multipleChoice.map((_: any, index: number) => {
                const isAnswered =
                  answers[index] !== null && answers[index] !== undefined
                const isSelected = currentQuizIndex === index + 1
                console.log('isAnswered', isAnswered, answers[index])

                return (
                  <div
                    key={index}
                    className={cn(
                      'flex items-center justify-center rounded-md w-10 h-10 cursor-pointer',
                      'border border-solid',
                      isSelected
                        ? isAnswered
                          ? 'border-blue-500'
                          : 'border-gray-300'
                        : isAnswered
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-white'
                    )}
                    onClick={() => handleJumpToQuestion(index + 1)}
                  >
                    {index + 1}
                  </div>
                )
              })}
            </div>
            <div className="flex flex-col gap-y-6">
              <SingleQuiz
                key={`question-${currentQuizIndex}`}
                no={currentQuizIndex}
                question={currentQuestion.question}
                choice={currentQuestion.choice}
              />
            </div>
            <div className="flex gap-y-4 justify-end">
              <Button
                type={'button'}
                onClick={handlePrev}
                disabled={currentQuizIndex === 1}
                className={cn('mr-2 min-w-20')}
              >
                prev
              </Button>
              <Button
                type={'button'}
                onClick={isLastQuestion ? handleSubmit(onSubmit) : handleNext}
                className={cn('min-w-20')}
                disabled={isLastQuestion && !enableSubmit}
              >
                {isLastQuestion ? 'submit' : 'next'}
              </Button>
            </div>
          </form>
        )}
        {questionState === QUIZ_STATE.SHOW_RESULT && (
          <ShowResultSection
            score={score}
            fullScore={quiz?.quiz?.multipleChoice.length}
            onReset={handleReset}
            onReview={handleReview}
          />
        )}
        {questionState === QUIZ_STATE.REVIEW_RESULT && (
          <ReviewResultSection
            multipleChoice={quiz?.quiz?.multipleChoice}
            answers={answers}
            currentQuizIndex={currentQuizIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
            handleReset={handleReset}
            handleJumpToQuestion={handleJumpToQuestion}
          />
        )}
      </FormProvider>
    </div>
  )
}
