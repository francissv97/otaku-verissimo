import logo from "../assets/logo.svg";

export function Header() {
  return (
    <header className="bg-gradient-to-tr from-zinc-800 via-zinc-700 to-zinc-800">
      <div className="max-w-screen-lg mx-auto p-4">
        <img src={logo} alt="otakuVERISSIMOLogo" className="w-48 mx-auto" />
      </div>
    </header>
  );
}
