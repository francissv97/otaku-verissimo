import { ClassAttributes } from 'react'

type TSubtitleProps = ClassAttributes<HTMLSpanElement> & {
  text: string
  className?: string
}

export function Subtitle({ text, className }: TSubtitleProps) {
  const classnames = 'text-xl font-semibold uppercase text-main italic '.concat(
    className ? className : ''
  )
  return <span className={classnames.trim()}>{text}</span>
}
