import { useDropzone } from 'react-dropzone'
import { OnDrop } from './type'
import { cn } from '../../utils'
import { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faSpinner } from '@fortawesome/free-solid-svg-icons'

type FileUploadProps = {
  onDrop: OnDrop
  className?: string
  isUploading?: boolean
}

export const FileUpload = (props: FileUploadProps) => {
  const { onDrop, className, isUploading } = props

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'], // accept pdf only
    },
    maxFiles: 1, // accept only 1 file
  })

  const DisplayFile = useMemo(() => {
    if (isUploading)
      return (
        <div className="flex items-center gap-x-2">
          <FontAwesomeIcon
            icon={faSpinner}
            className="animate-spin"
            size="lg"
          />
          <p
            className={cn(
              'cursor-default text-gray-500',
              'text-xs md:text-sm',
              'truncate'
            )}
          >
            {acceptedFiles[0].name} is uploading...
          </p>
        </div>
      )

    if (acceptedFiles.length === 0)
      return (
        <p className={cn('cursor-default text-gray-300', 'text-xs md:text-sm')}>
          Click here to upload PDF File
        </p>
      )

    if (acceptedFiles.length > 0)
      return (
        <div
          className={cn(
            'cursor-default text-black',
            'text-xs md:text-sm',
            'flex items-center gap-x-2'
          )}
        >
          <FontAwesomeIcon icon={faFilePdf} size="lg" />
          <p className="truncate">{acceptedFiles[0].name}</p>
        </div>
      )

    return null
  }, [acceptedFiles, isUploading])

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border rounded-lg w-full',
        'flex justify-between items-center gap-x-4',
        'p-2 md:px-4',
        className
      )}
    >
      <input {...getInputProps()} className="cursor-default" />
      {DisplayFile}
      <button
        className={cn(
          'text-white font-medium px-4 py-2',
          'bg-blue-700 hover:bg-blue-900 transition-colors duration-500',
          'rounded-md'
        )}
      >
        Upload PDF
      </button>
    </div>
  )
}
