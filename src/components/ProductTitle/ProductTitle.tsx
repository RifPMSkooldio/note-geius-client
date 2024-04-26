import { ComponentProps } from 'react'

type ProductTitleProps = ComponentProps<'div'>

export const ProductTitle = (props: ProductTitleProps) => {
  return (
    <div {...props}>
      <h1 className="font-semibold text-2xl">NoteGenius.AI</h1>
      <h2 className="text-xl">AI Summarizer for Thai Class Notes</h2>
    </div>
  )
}
