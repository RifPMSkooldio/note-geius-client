import { Player } from '@lottiefiles/react-lottie-player'
import lottiesAnimation from '../../assets/error.json'

export const ERROR_MESSAGE =
  'Invalid JSON string\nPlease re-upload the file and try again.'

type ErrorProps = {
  message: string
}

const Error = ({ message }: ErrorProps) => {
  return (
    <div className="flex flex-col text-center">
      <Player
        src={lottiesAnimation}
        loop
        autoplay
        style={{
          height: 400,
        }}
      />
      <p className="text-xl whitespace-pre-line mt-[-40px]">
        <strong>Error: </strong>
        {message}
      </p>
      {/* <Button
          onClick={() => {
            console.log('error: ', message)
          }}
          className="min-w-60"
        >
          Try again
        </Button> */}
    </div>
  )
}

export default Error
