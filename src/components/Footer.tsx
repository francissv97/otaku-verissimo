import logo from "../assets/logo-black.svg";

export function Footer() {
  return (
    <footer className="flex flex-col items-center max-w-6xl w-full sm:flex-row sm:justify-between gap-2 mx-auto p-4">
      <img src={logo} alt="otakuVERISSIMOlogo" className="w-48 opacity-60" />

      <div className="flex flex-col gap-1 items-center md:items-end">
        <p className="text-sm font-medium">
          <span>Powered by Anilist</span>
        </p>

        <p className="text-sm space-x-1">
          <a
            href="https://francissportfolio.vercel.app/"
            target="_blank"
            className="text-main hover:text-orange-500 font-semibold inline-block rounded duration-200"
          >
            Francis Verissimo
          </a>

          <span className="inline-block">&copy; {new Date().getFullYear()}</span>
        </p>
      </div>
    </footer>
  );
}
