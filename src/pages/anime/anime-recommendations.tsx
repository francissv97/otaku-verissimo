import { Link } from 'react-router-dom'
import { SwiperSlide } from 'swiper/react'
import { Subtitle } from '@/components/subtitle'
import { Heart, Star } from '@phosphor-icons/react'
import { SwiperCoverCardsBellow } from './anime-section-cards'

type TAnimeRecommendationsProps = {
  edges: {
    node: {
      mediaRecommendation: {
        id: number
        title: {
          userPreferred: string
        }
        format: string
        coverImage: {
          large: string
        }
        averageScore: number
        favourites: number
      }
    }
  }[]
}

export function AnimeRecommendations({ edges }: TAnimeRecommendationsProps) {
  return (
    <div className="mt-4 flex flex-col">
      <Subtitle text="Recommendations" className="px-4" />

      <SwiperCoverCardsBellow>
        {edges.map((edge) => {
          const { id, title, coverImage, averageScore, favourites, format } = edge.node.mediaRecommendation

          if (edge.node.mediaRecommendation != null) {
            return (
              <SwiperSlide key={id}>
                <Link
                  to={`/anime/${id}`}
                  onClick={() => {
                    if (window.scrollY <= document.body.scrollHeight)
                      scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="group flex cursor-pointer flex-col gap-1"
                >
                  <div className="relative mb-2 aspect-[6/9] overflow-hidden rounded-lg bg-gradient-to-t shadow-lg">
                    <img
                      alt={title.userPreferred}
                      src={coverImage.large}
                      className="h-full w-full object-cover object-center group-hover:border-main"
                      loading="lazy"
                      style={{
                        opacity: 0,
                        transitionDuration: '700ms',
                      }}
                      onLoad={(t) => (t.currentTarget.style.opacity = '1')}
                    />

                    <div className="absolute top-0 flex items-center gap-1 rounded-br-lg bg-zinc-950/60 p-1">
                      <Star size={18} weight="fill" className="text-yellow-400" />
                      <span className="text-sm font-medium text-zinc-50">
                        {averageScore > 0 ? averageScore : 0}
                      </span>
                    </div>

                    <div className="absolute bottom-0 flex items-center gap-1 rounded-tr-lg bg-zinc-950/60 p-1">
                      <Heart size={18} weight="fill" className="text-red-500" />
                      <span className="text-sm font-medium text-zinc-50">
                        {favourites > 0 ? favourites : 0}
                      </span>
                    </div>

                    <div className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-lg bg-zinc-950/60 p-1">
                      <span className="text-xs font-medium text-zinc-50">
                        {format.replaceAll('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <span className="line-clamp-2 text-center">{title.userPreferred}</span>
                </Link>
              </SwiperSlide>
            )
          }
        })}
      </SwiperCoverCardsBellow>
    </div>
  )
}
