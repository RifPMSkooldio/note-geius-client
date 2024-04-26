import { useFormContext } from 'react-hook-form'
import { MultipleChoice, QuizInput } from './type'
import { cn } from '../../utils'

type SingleQuizProps = {
  question: MultipleChoice['question']
  choice: MultipleChoice['choice']
  no: number
}

export const SingleQuiz = (props: SingleQuizProps) => {
  const { question, choice, no } = props
  const { register, watch, setValue } = useFormContext<QuizInput>()

  const handleOnClick = (value: string) => {
    setValue(`answers.${no - 1}`, value)
  }

  return (
    <div className="flex flex-col gap-4 mt-6">
      <p className="font-bold">
        {no}. {question}
      </p>
      {choice.map((c, index) => {
        const isChecked = watch(`answers.${no - 1}`) === c
        return (
          <div
            key={index}
            className={cn(
              'space-x-1 cursor-pointer',
              'px-3 py-2 border border-solid border-black rounded-md',
              isChecked ? 'border-blue-500' : 'border-gray-200'
            )}
            onClick={() => handleOnClick(c)}
          >
            <input
              type="radio"
              id={c}
              value={c}
              {...register(`answers.${no - 1}`, { required: true })}
            />
            <label htmlFor={c} className="cursor-pointer pl-2">
              {c}
            </label>
          </div>
        )
      })}
    </div>
  )
}
