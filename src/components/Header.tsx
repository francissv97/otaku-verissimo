import logo from "../assets/logo.svg";

export function Header() {
  return (
    <div className="bg-second">
      <div className="max-w-screen-lg mx-auto px-4">
        <img src={logo} alt="97AnimeListLogo" className="w-24 mx-auto" />
      </div>
    </div>
  );
}
