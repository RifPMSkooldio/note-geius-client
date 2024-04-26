import { useMemo } from 'react'
import Button from '../../components/Button/Button'
import CheckedIcon from '../../components/Icons/CheckedIcon'
import CrossIcon from '../../components/Icons/CrossIcon'
import { cn } from '../../utils'
import { MultipleChoice } from './type'

type ReviewResultSectionProps = {
  multipleChoice: MultipleChoice[]
  answers: string[]
  currentQuizIndex: number
  handleReset: () => void
  handleJumpToQuestion: (index: number) => void
  handleNext: () => void
  handlePrev: () => void
}

const ReviewResultSection = (props: ReviewResultSectionProps) => {
  const {
    multipleChoice,
    answers,
    currentQuizIndex,
    handleReset,
    handleJumpToQuestion,
    handleNext,
    handlePrev,
  } = props

  const currentQuestion = useMemo(() => {
    return multipleChoice[currentQuizIndex - 1]
  }, [currentQuizIndex, multipleChoice])

  const isCorrect =
    currentQuestion.correctAnswer === answers[currentQuizIndex - 1]

  return (
    <div>
      <Button
        type={'button'}
        onClick={handleReset}
        className={cn(
          'mr-2 min-w-20',
          'border border-solid border-blue-500 bg-white text-blue-500 hover:bg-gray-100 transition-colors'
        )}
        fullWidth
      >
        Retake Quiz
      </Button>
      <div className="flex gap-2 justify-center mt-2 py-4 border-b border-t">
        {multipleChoice.map((q, index) => {
          const isCorrect = q.correctAnswer === answers[index]
          const isSelected = currentQuizIndex === index + 1
          return (
            <div
              key={index}
              className={cn(
                'flex items-center justify-center rounded-md w-10 h-10 cursor-pointer',
                'border border-solid',
                isSelected
                  ? isCorrect
                    ? 'border-green-500'
                    : 'border-red-500'
                  : isCorrect
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              )}
              onClick={() => handleJumpToQuestion(index + 1)}
            >
              {index + 1}
            </div>
          )
        })}
      </div>
      <div className="flex gap-2">
        <Button
          type={'button'}
          onClick={handlePrev}
          disabled={currentQuizIndex === 1}
          className={cn('min-w-20')}
          fullWidth
        >
          prev
        </Button>
        <Button
          type={'button'}
          onClick={handleNext}
          disabled={currentQuizIndex === multipleChoice.length}
          className={cn('min-w-20')}
          fullWidth
        >
          next
        </Button>
      </div>
      <div className="flex flex-col gap-y-6">
        {currentQuestion && (
          <div className="mt-8 min-h-48">
            <p className="font-bold">
              {currentQuizIndex}. {currentQuestion.question}
            </p>
            <div className="flex gap-2 items-center mt-2">
              <div
                className={cn(
                  'w-6 h-6',
                  isCorrect ? 'text-green-500' : 'text-red-500'
                )}
              >
                {isCorrect ? <CheckedIcon /> : <CrossIcon />}
              </div>
              <p className="text-sm">
                Your Answer:{' '}
                <strong
                  className={isCorrect ? 'text-green-500' : 'text-red-500'}
                >
                  {answers[currentQuizIndex - 1]}
                </strong>
              </p>
            </div>
            <div className={'flex flex-col mt-4 gap-2'}>
              {!isCorrect && (
                <p className="text-sm">
                  Correct Answer:{' '}
                  <strong>{currentQuestion.correctAnswer}</strong>
                </p>
              )}
              <p className="text-sm">
                Explanation: {currentQuestion.explanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewResultSection
