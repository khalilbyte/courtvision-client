import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import menuIcon from "../../assets/hamburger-menu.png";
import closeMenuIcon from "../../assets/x.png";

export default function Navbar() {
  const [isNavLinksOpen, setIsNavLinksOpen] = useState(false);
  const navRef = useRef();

  const toggleNavLinks = () => {
    isNavLinksOpen ? setIsNavLinksOpen(false) : setIsNavLinksOpen(true);
  };

  useEffect(() => {
    const onClickHandler = (event) => {
      if (!isNavLinksOpen) return;

      const isClickInsideNav = event.composedPath().includes(navRef.current);
      const isHamburgerMenu = event.target.id === "hamburger-menu";

      if (!isClickInsideNav && !isHamburgerMenu) {
        setIsNavLinksOpen(false);
      }
    };

    document.body.addEventListener("click", onClickHandler);

    return () => {
      document.body.removeEventListener("click", onClickHandler);
    };
  });

  useEffect(() => {
    const onWindowResize = () => {
      if (window.innerWidth >= 768) {
        setIsNavLinksOpen(false);
      }
    };

    window.addEventListener("resize", onWindowResize);

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return (
    <nav className="navbar h-[5rem] border-2 border-green-500 flex items-center mb-8">
      <div className="navbar-content border-2 border-slate-500 w-full max-w-[1500px] mx-auto px-4 flex items-center justify-between relative">
        <a href="/" className="text-3xl font-bold">
          CourtVision
        </a>
        <ul
          className={`navbar-links absolute top-full left-0 right-0 md:static md:flex  ${
            isNavLinksOpen ? "" : "hidden"
          }`}
          ref={navRef}
        >
          <li className="navbar-link text-lg border py-3 font-semibold px-1 transition-all duration-200 active:bg-slate-200 md:border-none md:hover:rounded md:px-4">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="navbar-link text-lg  border py-3 font-semibold px-1 transition-all duration-200 active:bg-slate-200 md:border-none md:hover:rounded md:px-4">
            <Link to={"/stats"}>Stats</Link>
          </li>
          <li className="navbar-link text-lg  border py-3 font-semibold px-1 transition-all duration-200 active:bg-slate-200 md:border-none md:hover:rounded md:px-4">
            <Link to={"/players"}>Players</Link>
          </li>
          <li className="navbar-link text-lg  border py-3 font-semibold px-1 transition-all duration-200 active:bg-slate-200 md:border-none md:hover:rounded md:px-4">
            <Link to={"/teams"}>Teams</Link>
          </li>
          <li className="navbar-link text-lg border py-3 font-semibold px-1 transition-all duration-200 active:bg-slate-200 md:border-none md:hover:rounded md:px-4">
            <Link to={"/watchlist"}>Watchlist</Link>
          </li>
          <li className="navbar-link text-lg border py-3 font-semibold px-1 transition-all duration-200 active:bg-slate-200 md:border-none md:hover:rounded md:px-4">
            <Link to={"/profile"}>Profile</Link>
          </li>
        </ul>
        <img
          src={`${isNavLinksOpen ? closeMenuIcon : menuIcon}`}
          alt="hamburger-menu"
          id="hamburger-menu"
          className="block w-8 md:hidden"
          onClick={toggleNavLinks}
        />
      </div>
    </nav>
  );
}
