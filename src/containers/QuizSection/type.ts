type MultipleChoice = {
  question: string
  choice: string[]
  correctAnswer: string
  explanation: string
}

type OpenEnded = {
  question: string
  answer: string
}

type QuizData = {
  quiz: {
    multipleChoice: MultipleChoice[]
    openEnded: OpenEnded[]
  }
}

type QuizInput = {
  answers: string[]
}

export type { MultipleChoice, OpenEnded, QuizData, QuizInput }
