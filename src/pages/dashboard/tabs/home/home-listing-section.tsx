import { DocumentNode, useQuery } from '@apollo/client'
import { SwiperSlide } from 'swiper/react'
import { CircleNotch } from '@phosphor-icons/react'
import { PageMediaResultQuery } from '@/types'
import { Subtitle } from '@/components/subtitle'
import { SwiperSectionHome } from '@/components/swiper-section-home'
import { CoverCard } from '@/components/cover-card'
import logo from '@/assets/logo-short.svg'

type THomeListingSectionProps = {
  title: string
  query: DocumentNode
  variables: {
    perPage?: number
    season?: string
    seasonYear?: number
    sort: string
  }
}

const isLocalHost = location.href.includes('localhost')

export function HomeListingSection({ title, query, variables }: THomeListingSectionProps) {
  const { data, loading } = useQuery(query, {
    variables: { ...variables, perPage: isLocalHost ? 6 : 10 },
    notifyOnNetworkStatusChange: true,
  })

  const animes: PageMediaResultQuery[] = data?.Page.media

  return (
    <div>
      <div className="mx-auto my-2 flex items-center justify-between px-4">
        {loading ? (
          <div className="h-7 w-36 animate-pulse rounded-lg bg-zinc-50/10 px-4" />
        ) : (
          <Subtitle text={title} />
        )}

        {/* <button
        onClick={() => navigate(`/${/anime/?sort=TRENDING_DESC}`)}
        className="uppercase h-fit text-xs hover:text-zinc-600 font-medium duration-100"
      >
        view all
      </button> */}
      </div>

      {loading ? (
        <div className="px-4">
          <div className="flex h-72 w-full animate-pulse items-center justify-center rounded-lg bg-zinc-50/10">
            {/* <CircleNotch size={60} className="absolute animate-spin text-main" /> */}

            <img src={logo} alt="ov logo" className="w-28 opacity-30" />
          </div>
        </div>
      ) : (
        <SwiperSectionHome>
          {animes?.map((media, index) => (
            <SwiperSlide key={index}>
              <CoverCard anime={media} />
            </SwiperSlide>
          ))}
        </SwiperSectionHome>
      )}
    </div>
  )
}
