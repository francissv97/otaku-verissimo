import logo from "../assets/logo-black.svg";

export function Footer() {
  return (
    <footer className="flex flex-col items-center max-w-[980px] w-full sm:flex-row sm:justify-between gap-2 mx-auto px-2 py-5">
      <img src={logo} alt="otakuVERISSIMOlogo" className="w-48 opacity-75" />

      <div className="flex flex-col gap-1">
        <p className="text-zinc-700 text-sm">
          <span className="mr-1">Powered by</span>
          <a
            href="https://anilist.co/"
            target="_blank"
            className="text-zinc-100 bg-zinc-500 hover:bg-zinc-600 font-semibold inline-block px-1 rounded duration-200"
          >
            Anilist
          </a>
        </p>

        <p className="text-zinc-700 text-sm">
          <a
            href="https://francissportfolio.vercel.app/"
            target="_blank"
            className="text-zinc-100 bg-zinc-500 hover:bg-zinc-600 font-semibold inline-block px-1 rounded duration-200"
          >
            Francis Verissimo
          </a>

          <span className="ml-1">&copy; {new Date().getFullYear()}</span>
        </p>
      </div>
    </footer>
  );
}
