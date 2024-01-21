import logo from "../assets/logo.svg";

export function Footer() {
  return (
    <footer className="bg-gradient-to-t from-black via-black/30 to-transparent">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-2 p-4 sm:flex-row sm:justify-between">
        <img src={logo} alt="otakuVERISSIMOlogo" className="w-28 invert" />

        <div className="flex flex-col items-center gap-2 md:flex-row md:items-end">
          <p className="text-sm font-medium">
            <span>Powered by Anilist</span>
          </p>

          <div className="hidden md:block w-2 h-2 rounded-full bg-main my-auto" />

          <p className="space-x-1 text-sm">
            <a
              href="https://francissportfolio.vercel.app/"
              target="_blank"
              className="inline-block rounded font-semibold text-main invert duration-200 hover:text-orange-500"
            >
              Francis Verissimo
            </a>

            <span className="inline-block">&copy; {new Date().getFullYear()}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
