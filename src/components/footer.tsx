export function Footer() {
  return (
    <footer className="bg-zinc-900 mt-4">
      <div className="mx-auto flex w-full max-w-5xl justify-end p-4">
        <div className="flex divide-x divide-main">
          <p className="pr-4 text-sm">
            <span>Powered by AniList</span>
          </p>

          <span className="space-x-1 pl-4 text-sm">
            <a
              href="https://francissportfolio.vercel.app/"
              target="_blank"
              className="inline-block text-main invert duration-200 hover:text-orange-500"
            >
              francissv97
            </a>

            <span className="inline-block">
              &copy; {new Date().getFullYear()}
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
