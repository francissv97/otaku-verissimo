import { Link } from 'react-router-dom'
import { Subtitle } from '@/components/subtitle'
import { SwiperCoverCardsBellow } from './anime-section-cards'
import { SwiperSlide } from 'swiper/react'

type TAnimeRelationsProps = {
  edges: Array<{
    relationType: string
    node: {
      id: number
      title: {
        romaji: string
      }
      format: string
      coverImage: {
        large: string
      }
      type: string
    }
  }>
}

const order = [
  'ADAPTATION',
  'PREQUEL',
  'SEQUEL',
  'PARENT',
  'SIDE_STORY',
  'CHARACTER',
  'SUMMARY',
  'ALTERNATIVE',
  'SPIN_OFF',
  'OTHER',
]

export function AnimeRelations({ edges }: TAnimeRelationsProps) {
  const sorttedEdges = edges.slice().sort((a, b) => {
    const indexA = order.indexOf(a.relationType)
    const indexB = order.indexOf(b.relationType)

    if (indexA === -1 && indexB === -1) {
      return 0 // Se ambos os tipos de relação não estiverem presentes na ordem, mantenha a ordem original
    } else if (indexA === -1) {
      return 1 // Se o tipo de relação de 'a' não estiver presente na ordem, mova 'a' para o final
    } else if (indexB === -1) {
      return -1 // Se o tipo de relação de 'b' não estiver presente na ordem, mova 'b' para o final
    } else {
      return indexA - indexB // Ordena com base nos índices na ordem
    }
  })

  return (
    <div className="mt-4 flex flex-col">
      <Subtitle text="Relations" className="px-4" />

      <SwiperCoverCardsBellow>
        {sorttedEdges.map((edge) =>
          edge.node.type == 'ANIME' ? (
            <SwiperSlide key={edge.node.id}>
              <Link
                to={`/anime/${edge.node.id}`}
                onClick={() => {
                  if (window.scrollY <= document.body.scrollHeight)
                    scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="flex cursor-pointer flex-col gap-1 py-1"
              >
                <div className="relative mb-2 aspect-[6/9] overflow-hidden rounded-lg shadow-md">
                  <img
                    src={edge.node.coverImage.large}
                    alt={edge.node.title.romaji}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                    style={{
                      opacity: 0,
                      transitionDuration: '700ms',
                    }}
                    onLoad={(t) => (t.currentTarget.style.opacity = '1')}
                  />

                  <div className="absolute right-0 top-0 rounded-bl-lg bg-zinc-950/70 p-1">
                    <span className="text-xs font-medium text-zinc-50">
                      {edge.node.format ? edge.node.format.replaceAll('_', ' ') : ''}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-zinc-950/70 p-1">
                    <span className="text-sm font-medium text-zinc-50">
                      {edge.relationType.replaceAll('_', ' ')}
                    </span>
                  </div>
                </div>

                <span className="line-clamp-2 text-center text-base">{edge.node.title.romaji}</span>
              </Link>
            </SwiperSlide>
          ) : (
            <SwiperSlide key={edge.node.id}>
              <div className="flex flex-col gap-1 py-1">
                <div className="relative mb-2 overflow-hidden rounded-lg shadow-md">
                  <img
                    src={edge.node.coverImage.large}
                    alt={edge.node.title.romaji}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                    style={{
                      opacity: 0,
                      transitionDuration: '700ms',
                    }}
                    onLoad={(t) => (t.currentTarget.style.opacity = '1')}
                  />

                  <div className="absolute left-0 top-0 rounded-br-lg bg-zinc-950/70 p-1">
                    <span className="text-xs font-medium text-zinc-50">
                      {edge.node.format ? edge.node.format.replaceAll('_', ' ') : ''}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-zinc-950/70 p-1">
                    <span className="text-sm font-medium text-zinc-50">
                      {edge.relationType.replaceAll('_', ' ')}
                    </span>
                  </div>
                </div>

                <span className="line-clamp-2 text-center text-[14px]">
                  {edge.node.title.romaji}
                </span>
              </div>
            </SwiperSlide>
          )
        )}
      </SwiperCoverCardsBellow>
    </div>
  )
}
