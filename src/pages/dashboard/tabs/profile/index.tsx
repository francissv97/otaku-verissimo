import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { CaretLeft, House, SignIn } from '@phosphor-icons/react'

export function Profile() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const aniListAuthUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${import.meta.env.VITE_ID_CLIENT}&response_type=token`

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 pt-28">
        <span className="text-xl">It looks like you are not logged in.</span>

        <a
          href={aniListAuthUrl}
          title="Sign in with AniList"
          className="flex h-full cursor-pointer items-center justify-center rounded bg-gradient-to-r from-sky-600 via-cyan-500 to-cyan-300 p-2 transition"
        >
          <SignIn size={40} className="text-black" />
          <span className="min-w-max p-1 text-center text-xl text-black">Log in with AniList</span>
        </a>

        <Link
          to="/"
          className="mx-auto mt-4 flex w-fit items-center justify-center gap-2 rounded-lg p-2 text-xl text-main transition hover:bg-main/10 hover:text-main"
        >
          <span className="text-zinc-200">or</span> back to home
          <House weight="duotone" size={24} />
        </Link>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-4 pt-20">
      {user && (
        <>
          <img className="w-20" src={user.avatar.medium} alt="" />

          <strong className="text-xl font-medium text-main invert">{user.name}</strong>

          <button
            className="ml-auto mt-auto rounded bg-red-600 p-1 transition hover:bg-red-500"
            onClick={() => {
              localStorage.removeItem('access_token')
              localStorage.removeItem('viewer')
              navigate('/')
              window.location.reload()
            }}
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  )
}
