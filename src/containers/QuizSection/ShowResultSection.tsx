import Button from '../../components/Button/Button'

type ShowResultSectionProps = {
  score: number
  fullScore: number
  onReset: () => void
  onReview: () => void
}

const ShowResultSection = (props: ShowResultSectionProps) => {
  const { score, fullScore, onReset, onReview } = props
  return (
    <div className="flex justify-center items-center flex-col">
      <p className="text-lg">Your score is</p>
      <p className="text-6xl font-bold my-4">
        {score}/{fullScore}
      </p>
      <div className="flex gap-2">
        <Button type={'button'} onClick={onReset} className="min-w-[200px]">
          Try Again
        </Button>
        <Button type={'button'} onClick={onReview} className="min-w-[200px]">
          Review Answer
        </Button>
      </div>
    </div>
  )
}

export default ShowResultSection
