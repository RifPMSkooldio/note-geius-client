import { useEffect, useMemo, useState } from 'react'
import lottiesAnimation from '../../assets/loading.json'
import { Player } from '@lottiefiles/react-lottie-player'
import ChromeDinoGame from 'react-chrome-dino-ts'
import 'react-chrome-dino-ts/index.css'

const loadingText = [
  'Preparing your journey through knowledge',
  'Loading the pages of wisdom',
  'Gathering insights from the depths of the PDF',
  'Crafting the roadmap to enlightenment',
  'Assembling the building blocks of understanding',
  'Polishing the gems of learning',
  'Infusing your screen with the essence of education',
  'Embarking on a voyage through the realms of knowledge',
  'Sifting through the sands of information',
  'Igniting the torch of curiosity',
  "This might take longer than expected.\nWe will send Dino to make sure you're not bored.",
  "We're fueling the servers with dino-sized energy. Just a bit longer, and Dino will join you!",
  'Uh oh, the loading bar seems extinct! But fear not, Dino will be here to revive it!',
]

const stepText = [
  'Skooldy is sending your PDF to the server',
  'Skooldy is converting your PDF to text',
  'Skooldy is summarizing your text',
  'Skooldy is generating the quiz',
  'Skooldy is preparing the mindmap',
]

const Loading = () => {
  const [loadingStep, setLoadingStep] = useState(0)
  const [randomTextIndex, setRandomTextIndex] = useState(0)
  const [pointTextNumber, setPointTextNumber] = useState(0)
  const [showDino, setShowDino] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % stepText.length)
    }, 20000)

    const randomTextInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingText.length)
      setRandomTextIndex(randomIndex)
    }, 7000)

    const pointTextInterval = setInterval(() => {
      setPointTextNumber((prev) => (prev + 1) % 4)
    }, 500)

    return () => {
      clearInterval(interval)
      clearInterval(randomTextInterval)
      clearInterval(pointTextInterval)
    }
  }, [])

  const textIncludesDino = useMemo(() => {
    return loadingText[randomTextIndex].toLowerCase().includes('dino')
  }, [randomTextIndex])

  const pointText = useMemo(() => {
    return '.'.repeat(pointTextNumber)
  }, [pointTextNumber])

  useEffect(() => {
    if (textIncludesDino && !showDino) {
      setShowDino(true)
    }
  }, [textIncludesDino, showDino])

  return (
    <div className="w-full">
      <Player
        src={lottiesAnimation}
        loop
        autoplay
        style={{
          width: 350,
          height: 350,
        }}
      />
      <div className="flex flex-col gap-2 items-center w-full">
        <p className="text-2xl font-bold">{stepText[loadingStep]}</p>
        <p className="whitespace-pre-line min-h-12">
          {loadingText[randomTextIndex]}
          {pointText}
        </p>
      </div>
      {showDino && <ChromeDinoGame />}
    </div>
  )
}

export default Loading
