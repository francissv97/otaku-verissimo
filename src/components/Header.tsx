import headerImage from "../assets/header-logo.png";

export function Header() {
  return (
    <div className="bg-second">
      <div className="max-w-screen-lg mx-auto px-4">
        <img src={headerImage} alt="97AnimeList" className="w-28 mx-auto" />
      </div>
    </div>
  );
}
