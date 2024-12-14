import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router";
import menuIcon from "../assets/hamburger-menu.png";
import closeMenuIcon from "../assets/x.png";

const Navbar = () => {
  const [isNavLinksOpen, setIsNavLinksOpen] = useState(false);
  const navRef = useRef();

  const toggleNavLinks = () => {
    isNavLinksOpen ? setIsNavLinksOpen(false) : setIsNavLinksOpen(true);
  };

  // Handle the opening and closing of the navbar
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

  // Handle the opening and closing of the navbar when screen size changes
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
        <p className="text-2xl font-bold">NBAFanApp</p>
        <ul
          className={`navbar-links absolute top-full left-0 right-0  bg-slate-100 md:static md:flex  ${
            isNavLinksOpen ? "" : "hidden"
          }`}
          ref={navRef}
        >
          <li className="navbar-link text-lg border py-3 font-semibold px-1 transition-all duration-200 active:bg-slate-200 md:border-none md:hover:rounded md:px-4">
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li className="navbar-link text-lg  border py-3 font-semibold px-1 transition-all duration-200 active:bg-slate-200 md:border-none md:hover:rounded md:px-4">
            <NavLink to={"/players"}>Players</NavLink>
          </li>
          <li className="navbar-link text-lg  border py-3 font-semibold px-1 transition-all duration-200 active:bg-slate-200 md:border-none md:hover:rounded md:px-4">
            <NavLink to={"/teams"}>Teams</NavLink>
          </li>
          <li className="navbar-link text-lg border py-3 font-semibold px-1 transition-all duration-200 active:bg-slate-200 md:border-none md:hover:rounded md:px-4">
            <NavLink to={"/watchlist"}>Watchlist</NavLink>
          </li>
          <li className="navbar-link text-lg border py-3 font-semibold px-1 transition-all duration-200 active:bg-slate-200 md:border-none md:hover:rounded md:px-4">
            <NavLink to={"/profile"}>Profile</NavLink>
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
};

export default Navbar;
