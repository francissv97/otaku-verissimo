import logo from "../assets/logo.svg";

export function Footer() {
  return (
    <div className="bg-gray-700">
      <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:max-w-screen-lg gap-4 mx-auto p-4">
        <img src={logo} alt="97AnimeListLogo" className="w-24" />

        <div className="flex flex-col gap-4">
          <p className="text-gray-300 text-sm">
            {"Alimentado por "}
            <a
              href="https://anilist.co/"
              target="_blank"
              className="text-main inline-block duration-200 hover:scale-105"
            >
              {"Anilist"}
            </a>
          </p>

          <p className="text-gray-300 text-sm">
            {"Desenvolvido por "}
            <a
              href="https://francissportfolio.vercel.app/"
              target="_blank"
              className="text-main inline-block duration-200 hover:scale-105"
            >
              {"Francis S. Verissimo"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
