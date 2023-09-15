import { Link, useNavigate } from "react-router-dom";
import { CaretLeft, MagnifyingGlass } from "phosphor-react";
import logo from "../assets/logo.svg";

// export function Header() {
//   return (
//     <header>
//       <div className="mx-auto max-w-screen-lg px-4 pt-4">
//         <img src={logo} alt="otakuVERISSIMOLogo" className="mx-auto w-44 md:w-60" />
//       </div>
//     </header>
//   );
// }

// type HeaderResultProps = {
//   title: string;
//   paramViewAll?: ViewAllParams;
// };

// function HeaderResults({ title, paramViewAll }: HeaderResultProps) {
//   return (
//     <div className="mx-auto my-2 flex max-w-6xl items-center justify-between">
//       <strong className="text-base font-medium uppercase text-main">{title}</strong>

//       {/* <button
//         onClick={() => navigate(`/${paramViewAll}`)}
//         className="uppercase h-fit text-xs hover:text-zinc-600 font-medium duration-100"
//       >
//         view all
//       </button> */}
//     </div>
//   );
// }

interface HeaderProps {
  hideBackButton?: boolean;
  hideSearchButton?: boolean;
}

export function Header({ hideBackButton, hideSearchButton }: HeaderProps) {
  const navigate = useNavigate();

  function handleGoBack() {
    if (window.history.state && window.history.state.idx > 0) {
      return navigate(-1);
    }

    navigate("/");
  }

  function handleGoSearchPage() {
    navigate("/search");
  }

  return (
    <div className="fixed left-0 right-0 top-0 z-30 h-20 bg-zinc-800/60 backdrop-blur-sm duration-300 sm:block">
      <div className="group mx-auto flex h-full w-full max-w-6xl items-center justify-between px-4">
        {!hideBackButton ? (
          <div
            title="return to previous page"
            className="cursor-pointer rounded-lg p-4 transition hover:bg-main/10"
            onClick={handleGoBack}
          >
            <CaretLeft size={24} className="text-main" />
          </div>
        ) : (
          <div className="w-14" />
        )}

        <Link to="/" className="flex justify-center">
          <img src={logo} alt="otakuVERISSIMOlogo" className="my-auto w-48 cursor-pointer md:w-60" />
        </Link>

        {!hideSearchButton ? (
          <div
            title="go to search page"
            className="rotate-90 cursor-pointer rounded-lg p-4 transition hover:bg-main/10"
            onClick={handleGoSearchPage}
          >
            <MagnifyingGlass size={24} className="text-main" />
          </div>
        ) : (
          <div className="w-14" />
        )}
      </div>
    </div>
  );
}
