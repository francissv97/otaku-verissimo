export function loginAnilistPopup() {
  const popUp = window.open(
    `https://anilist.co/api/v2/oauth/authorize?client_id=${import.meta.env.VITE_ID_CLIENT}&response_type=token`,
    'AniListAuth',
    'width=500,height=600'
  )

  window.addEventListener('message', (event) => {
    console.log('evento message recebido')

    if (event.origin === 'https://otakuverissimo.com') {
      const tokenMatch = event.data.match(/access_token=([^&]+)/)
      const token = tokenMatch ? tokenMatch[1] : null

      console.log('Token recebido:', token)

      popUp?.close()

      if (token) {
        localStorage.setItem('access_token', token)
      }
    }
  })
}
