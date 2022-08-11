import logo from "../assets/logo.svg";

export function Header() {
  return (
    <div className="bg-second">
      <div className="max-w-screen-lg mx-auto p-4">
        <img src={logo} alt="97AnimeListLogo" className="w-40 mx-auto" />
      </div>
    </div>
  );
}
