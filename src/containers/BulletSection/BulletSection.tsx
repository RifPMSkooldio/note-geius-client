/* eslint-disable @typescript-eslint/no-explicit-any */
import { doc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Loading from '../../components/Loading'
import { db } from '../../services/firebase'
import { formatJsonString } from '../../utils/formatJsonString'
import { DocumentName } from '../../utils/type'
import { useSessionName } from '../SessionNameProvider/SessionNameProvider'
import { BulletList, BulletListProps } from './BulletList'
import Error from '../../components/Error'
import { ERROR_MESSAGE } from '../../components/Error/Error'
import { Switch } from '../../components/primitives/Switch'
import { KeyConcept } from './type'

export const BulletSection = () => {
  const [bulletData, setBulletData] = useState<{
    content: string
    keyConcept: BulletListProps['items']
  }>()
  const [loading, setLoading] = useState(true)
  const [errorMessages, setErrorMessages] = useState<string | null>(null)
  const { name } = useSessionName()
  const [showHint, setShowHint] = useState(true)

  const handleChange = () => {
    setShowHint((prev) => !prev)
  }

  useEffect(() => {
    if (!name) return

    const unsub = onSnapshot(
      doc(db, name, DocumentName.SUMMARIZATION),
      (doc) => {
        const res = doc.data()?.summarizationJson as string // json string
        console.log(res)

        if (!res) {
          console.log('no bullet data')
          setLoading(true)
          return
        }
        console.log('bullet res', res)
        try {
          const obj = formatJsonString(res)
          console.log('bullet obj', obj)
          const mappedObj = {
            content: obj.summary.content,
            keyConcept: (obj.summary.keyConcept as KeyConcept[]).map(
              (keyConcept) => {
                const randomNum1 = Math.random()
                const randomNum2 = Math.random()

                return {
                  ...keyConcept,
                  randomNum1,
                  randomNum2,
                }
              }
            ),
          }
          console.log('mappedObj', mappedObj)

          setBulletData(mappedObj)
        } catch (error) {
          setErrorMessages(ERROR_MESSAGE)
        } finally {
          setLoading(false)
        }
      }
    )

    return () => {
      unsub()
    }
  }, [name])

  if (loading) return <Loading />
  if (errorMessages) return <Error message={errorMessages} />

  return (
    <div className="flex flex-col gap-y-4 pt-2">
      <div>
        <div className="flex justify-end gap-4">
          <p className="text-sm pt-1">Challenge Me</p>
          <Switch checked={showHint} onClick={handleChange} />
        </div>
        <h3 className="text-xl font-bold mb-1">Summary</h3>
        <p>
          <Markdown remarkPlugins={[remarkGfm]}>{bulletData?.content}</Markdown>
        </p>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-1">Key Concepts</h3>
        <BulletList
          items={bulletData?.keyConcept ?? []}
          parentKey={null}
          showHint={showHint}
        />
      </div>
    </div>
  )
}
