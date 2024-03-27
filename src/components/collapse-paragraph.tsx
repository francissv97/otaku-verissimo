import { ClassAttributes, useState } from 'react'
import { CaretDown, CaretUp } from '@phosphor-icons/react'

type TCollapseParagraphProps = ClassAttributes<HTMLDivElement> & {
  description: string
  className?: string
}

export function CollapseParagraph({ description, className }: TCollapseParagraphProps) {
  const [collapse, setCollapse] = useState(false)

  if (description.replaceAll(' ', '').length >= 256) {
    return (
      <div className="relative">
        {!collapse && (
          <div className="absolute bottom-0 right-0 flex gap-1">
            <div className="h-2 w-2 rounded-full bg-main/90" />
            <div className="h-2 w-2 rounded-full bg-main/70" />
            <div className="h-2 w-2 rounded-full bg-main/60" />
          </div>
        )}

        <p
          className={`${className}`}
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />

        <button
          onClick={() => setCollapse((prev) => !prev)}
          className="mx-auto mt-2 flex w-fit items-center justify-center outline-main/50"
        >
          {collapse ? (
            <>
              <span className="text-sm font-medium text-zinc-400 hover:text-zinc-300">
                SHOW LESS
              </span>
              <CaretUp size={18} className="text-main" weight="bold" />
            </>
          ) : (
            <>
              <span className="text-sm font-medium text-zinc-400 hover:text-zinc-300">
                SHOW MORE
              </span>
              <CaretDown size={18} className="text-main" weight="bold" />
            </>
          )}
        </button>
      </div>
    )
  }

  return <p className={className} dangerouslySetInnerHTML={{ __html: description }}></p>
}
