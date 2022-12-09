import logo from "../assets/logo.svg";

export function Footer() {
  return (
    <div className="">
      <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:max-w-screen-lg gap-2 mx-auto p-4">
        <img src={logo} alt="97AnimeListLogo" className="w-40" />

        <div className="flex flex-col gap-1">
          <p className="text-gray-700 text-sm">
            {"Powered by "}
            <a
              href="https://anilist.co/"
              target="_blank"
              className="text-main font-semibold inline-block duration-200 hover:scale-105"
            >
              {"Anilist"}
            </a>
          </p>

          <p className="text-gray-700 text-sm">
            {"Developed by "}
            <a
              href="https://francissportfolio.vercel.app/"
              target="_blank"
              className="text-main font-semibold inline-block duration-200 hover:scale-105"
            >
              {"Francis Verissimo"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
