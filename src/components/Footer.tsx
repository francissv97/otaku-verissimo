import logo from "../assets/logo.svg";

export function Footer() {
  return (
    <div className="flex flex-col items-center max-w-[980px] w-full sm:flex-row sm:justify-between gap-2 mx-auto px-2 py-5">
      <img src={logo} alt="97AnimeListLogo" className="w-40" />

      <div className="flex flex-col gap-1">
        <p className="text-gray-700 text-sm">
          {"Powered by "}
          <a
            href="https://anilist.co/"
            target="_blank"
            className="text-main font-semibold inline-block hover:scale-105"
          >
            {"Anilist"}
          </a>
        </p>

        <p className="text-gray-700 text-sm">
          <a
            href="https://francissportfolio.vercel.app/"
            target="_blank"
            className="text-main font-semibold inline-block hover:scale-105"
          >
            Francis Verissimo
          </a>{" "}
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
