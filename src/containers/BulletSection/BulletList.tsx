import { KeyConcept } from './type'

export type BulletListProps = {
  items: (KeyConcept & { randomNum1?: number; randomNum2?: number })[]
  parentKey: KeyConcept['parentKey']
  showHint: boolean
}

export const BulletList = (props: BulletListProps) => {
  const { items, parentKey, showHint } = props

  return (
    <ul className="list-disc ml-6 space-y-1">
      {items
        .filter((item) => item.parentKey === parentKey)
        .map(({ randomNum1, randomNum2, ...item }, index) => {
          const hideKey = showHint && randomNum1 && randomNum1 < 0.2
          const hideMeaning =
            showHint && !hideKey && randomNum2 && randomNum2 < 0.2

          return (
            <li key={index}>
              <b
                className={
                  hideKey
                    ? 'bg-gray-100 text-gray-100 rounded-md select-none'
                    : ''
                }
              >
                {item.key}
              </b>
              <b> :</b>
              <br />
              <span
                className={
                  hideMeaning
                    ? 'bg-gray-100 text-gray-100 rounded-md select-none'
                    : ''
                }
              >
                {item.meaning}
              </span>
              <BulletList
                items={items}
                parentKey={item.key}
                showHint={showHint}
              />
            </li>
          )
        })}
    </ul>
  )
}
