import { useEffect, useState } from 'react'
import { useSessionName } from '../SessionNameProvider/SessionNameProvider'
import { doc, onSnapshot } from 'firebase/firestore'
import { DocumentName } from '../../utils/type'
import { db } from '../../services/firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Switch } from '../../components/primitives/Switch'

export const MindmapSection = () => {
  const { name } = useSessionName()
  const [mindmapUrl, setMindmapUrl] = useState('')
  const [mindmapWithHintUrl, setMindmapWithHintUrl] = useState('')
  const [isShowHintImage, setIsShowHintImage] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!name) return

    const unsub = onSnapshot(
      doc(db, name, DocumentName.VISUALIZATION),
      (doc) => {
        const resMindmapUrl = doc.data()?.mindmapURL as string
        const resMindmapWithHintUrl = doc.data()?.mindmapWithHintURL as string
        setMindmapUrl(resMindmapUrl)
        setMindmapWithHintUrl(resMindmapWithHintUrl)
        setLoading(false)
      }
    )

    return () => {
      unsub()
    }
  }, [name])

  const onToggle = () => {
    setIsShowHintImage((prev) => !prev)
  }

  if (loading || !mindmapUrl || !mindmapWithHintUrl)
    return (
      <div>
        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
      </div>
    )

  return (
    <div className="flex flex-col justify-center items-center pt-4">
      <div className="flex items-center gap-x-3 self-end">
        <Switch
          onClick={onToggle}
          className="self-end"
          checked={isShowHintImage}
        />
        <p className="text-sm text-gray-600">Challenge Me</p>
      </div>

      {isShowHintImage ? (
        <img
          src={mindmapWithHintUrl}
          alt="mindmapWithHint"
          className="w-full max-w-[1000px] max-h-[700px]"
          fetchPriority="high"
        />
      ) : (
        <img
          src={mindmapUrl}
          alt="mindmap"
          className="w-full max-w-[1000px] max-h-[700px]"
          fetchPriority="high"
        />
      )}
    </div>
  )
}
