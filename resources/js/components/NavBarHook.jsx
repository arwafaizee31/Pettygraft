import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
// import { useState, useEffect } from "react";
import ApplicationLogo from "@/components/ApplicationLogo";
import NavLink from "@/components/NavLink";
import ResponsiveNavLink from "@/components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";

const NavBarHook = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: "1150px" });
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  
    const closeMobileMenu = () => {
      if (isMobile) {
        setIsMenuOpen(false);
      }
    };
  
    const renderNavLinks = () => {
      const listClassName = isMobile ? "nav__list" : "nav__list__web";
      const linkClassName = "nav__link";
      const buttonClassName = "nav__cta";
  
      return (
        <ul className={listClassName}>
          <li>
            <NavLink  href={route("dashboard")}
                                    active={route().current("dashboard")} className={linkClassName} onClick={closeMobileMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              href={route("dashboard")}
                                    active={route().current("dashboard")}
              className={linkClassName}
              onClick={closeMobileMenu}
            >
              News
            </NavLink>
          </li>
          <li>
            <NavLink
              href={route("dashboard")}
                                    active={route().current("dashboard")}
              className={linkClassName}
              onClick={closeMobileMenu}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              href={route("dashboard")}
                                    active={route().current("dashboard")}
              className={linkClassName}
              onClick={closeMobileMenu}
            >
              Favorite
            </NavLink>
          </li>
          <li>
            <NavLink
 href={route("dashboard")}
                                    active={route().current("dashboard")}
              className={linkClassName}
              onClick={closeMobileMenu}
            >
              Location
            </NavLink>
          </li>
          <li>
            <NavLink
 href={route("dashboard")}
                                    active={route().current("dashboard")}
              className={`${linkClassName} ${buttonClassName}`}
              onClick={closeMobileMenu}
            >
              Get Started
            </NavLink>
          </li>
        </ul>
      );
    };
  
    return (
      <header className="header">
        <nav className="nav container">
          <NavLink  href={route("dashboard")}
                                    active={route().current("dashboard")} className="nav__logo">
            Navigation Bar
          </NavLink>
  
          {isMobile && (
            <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
              <IoMenu />
            </div>
          )}
  
          {isMobile ? (
            <div
              className={`nav__menu  ${isMenuOpen ? "show-menu" : ""}`}
              id="nav-menu"
            >
              {renderNavLinks()}
              <div className="nav__close" id="nav-close" onClick={toggleMenu}>
                <IoClose />
              </div>
            </div>
          ) : (
            renderNavLinks()
          )}
        </nav>
      </header>
    );
  };
  export default NavBarHook ;
  