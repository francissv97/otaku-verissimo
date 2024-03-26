import { useEffect } from 'react'
import { GET_ANIME_PAGE_QUERY } from '@/lib/queries/anime-page-query'
import { HomeListingSection } from './home-listing-section'
import { seasonHandler as season } from '@/utils/season-handler'
import { Compass } from '@phosphor-icons/react'
import { Link } from 'react-router-dom'

const isLocalHost = location.href.includes('localhost')

export function Home() {
  function handleLoginWithAniList() {
    const popUp = window.open(`http://localhost:5174`, 'AniListAuth', 'width=500,height=600')

    window.addEventListener('message', (event) => {
      console.log(event.data)
    })
  }

  useEffect(() => {
    if (document.title !== 'otakuVERISSIMO') document.title = 'otakuVERISSIMO'
  }, [])

  return (
    <div className="w-full flex flex-col max-w-5xl mx-auto pb-14">
      <div className="flex items-center justify-end gap-2">
        <Link
          title="go to search page"
          className="flex h-full gap-1 cursor-pointer items-center justify-center transition hover:saturate-200 p-4"
          to="/search"
        >
          <span className="text-main text-lg">Explore</span>
          <Compass size={36} className="text-main" />
        </Link>
      </div>

      {/* {isLocalHost && (
        <>
          <button
            onClick={() => window.parent.postMessage("uma mensagem para você", "*")}
            className="my-4"
          >
            WindowParentPostMessage
          </button>

          <button
            onClick={handleLoginWithAniList}
            className="my-4 text-yellow-300"
          >
            windowAddEventListenerMessage
          </button>
        </>
      )} */}

      <div className="w-full">
        <HomeListingSection
          title="trending now"
          query={GET_ANIME_PAGE_QUERY}
          variables={{ perPage: 10, sort: 'TRENDING_DESC' }}
        />

        {/* <HomeListingSection
          title="popular this season"
          query={GET_ANIME_PAGE_QUERY}
          variables={{
            perPage: 10,
            season: season.getCurrentSeason(),
            seasonYear: season.getCurrentYear(),
            sort: 'POPULARITY_DESC',
          }}
        />

        <HomeListingSection
          title="upcoming next season"
          query={GET_ANIME_PAGE_QUERY}
          variables={{
            perPage: 10,
            season: season.getNextSeason(),
            seasonYear: season.getNextYear(),
            sort: 'POPULARITY_DESC',
          }}
        /> */}
      </div>
    </div>
  )
}
