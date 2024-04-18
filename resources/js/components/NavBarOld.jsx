import { useState, useEffect } from "react";
import ApplicationLogo from "@/components/ApplicationLogo";
import NavLink from "@/components/NavLinkOld";
import ResponsiveNavLink from "@/components/ResponsiveNavLinkOld";
import { Link } from "@inertiajs/react";
import Hamburger from "@/components/HamburgerOld";

export default function NavBar() {
    const [showNavbar, setShowNavbar] = useState(false);

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    const [showNav1, setShowNav1] = useState(true);
    const [showNav2, setShowNav2] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setShowNav1(false);
                setShowNav2(true);
            } else {
                setShowNav1(true);
                setShowNav2(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const renderHeader = (title, bgColor, textColor, id, isVisible) => {
        return (
            <header
                className={`shadow md:px-4 lg:px-20 h-10 ${
                    isVisible ? "" : "hidden"
                } ${bgColor}`}
                id={id}
            >
                <div className="max-w-7xl px-4 sm:px-6 lg:px-8 h-10 flex items-center">
                    <h2
                        className={`font-semibold text-lg leading-tight ${textColor}`}
                    >
                        {title}
                    </h2>
                </div>
            </header>
        );
    };
    return (
        <div className="fixed w-full  z-1 top-0 shadow-2xl">
            <nav
                className={`h-12 sm:h-28 bg-white ${showNav1 ? "" : "hidden"}`}
                id="nav1"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex sm:block justify-between items-center">
                    <div className="shrink-0 flex sm:hidden sm:items-center">
                        <Link
                            href="/"
                            className="flex items-center sm:px-0"
                        >
                            <ApplicationLogo className="block h-10 sm:h-28 w-auto fill-current text-gray-800" />
                            <h1 className="sm:hidden">
                                <strong>PettyGraft</strong>
                            </h1>
                        </Link>
                    </div>
                    <div className={`flex justify-between sm:justify-center h-12 sm:h-28 nav-elements ${ showNavbar && "active"}`}>
                        <div className="flex nav-el">
                            <div className=" space-x-8 sm:-my-px sm:flex naviii">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    HOME
                                </NavLink>
                            </div>
                            <div className=" space-x-8 sm:-my-px sm:flex naviii">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    MY PETS
                                </NavLink>
                            </div>
                            <div className=" space-x-8 sm:-my-px sm:flex naviii">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    ALL PETS
                                </NavLink>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="shrink-0 flex sm:items-center nav1-logo">
                                <Link
                                    href="/"
                                    className="flex items-center px-10 sm:px-0"
                                >
                                    <ApplicationLogo className="block h-10 sm:h-28 w-auto fill-current text-gray-800" />
                                    <h1 className="sm:hidden">
                                        <strong>PettyGraft</strong>
                                    </h1>
                                </Link>
                            </div>
                        </div>
                        <div className="flex nav-el">
                            <div className=" space-x-8 sm:-my-px sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    PREMIUM
                                </NavLink>
                            </div>
                            <div className=" space-x-8 sm:-my-px sm:flex">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    ABOUT
                                </NavLink>
                            </div>
                            <div className=" space-x-8 sm:-my-px  sm:flex">
                                <NavLink
                                    href={route("profile.edit")}
                                    active={route().current("profile.edit")}
                                >
                                    PROFILE
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="menu-icon sm:hidden" onClick={handleShowNavbar}>
                        <Hamburger />
                    </div>
                </div>
            </nav>
            <nav
                className={`h-12 bg-primary ${showNav2 ? "" : "hidden"}`}
                id="nav2"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between sm:justify-center h-12">
                        <div className="flex">
                            <div className="flex items-center transform xl:-translate-x-64 lg:-translate-x-32 md:-translate-x-16 nav2-logo">
                                {" "}
                                <ApplicationLogo className="block h-10 w-auto fill-current text-gray-800" />
                                <h2 className="">
                                    <strong>PettyGraft</strong>
                                </h2>
                            </div>
                            <div className="hidden  space-x-8 sm:-my-px sm:flex">
                                <NavLink
                                    className="text-white text-sm"
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    HOME
                                </NavLink>
                            </div>
                            <div className="hidden  space-x-8 sm:-my-px sm:flex">
                                <NavLink
                                    className="text-white text-sm"
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    MY PETS
                                </NavLink>
                            </div>
                            <div className="hidden  space-x-8 sm:-my-px sm:flex">
                                <NavLink
                                    className="text-white text-sm"
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    ALL PETS
                                </NavLink>
                            </div>

                            <div className="hidden  space-x-8 sm:-my-px sm:flex">
                                <NavLink
                                    className="text-white text-sm"
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    PREMIUM
                                </NavLink>
                            </div>
                            <div className="hidden  space-x-8 sm:-my-px sm:flex">
                                <NavLink
                                    className="text-white text-sm"
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                >
                                    ABOUT
                                </NavLink>
                            </div>
                            <div className="hidden  space-x-8 sm:-my-px  sm:flex">
                                <NavLink
                                    className="text-white text-sm"
                                    href={route("profile.edit")}
                                    active={route().current("profile.edit")}
                                >
                                    PROFILE
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {renderHeader(
                "Dashboard",
                "bg-primary",
                "text-white",
                "header-nav-1",
                showNav1
            )}
            {renderHeader(
                "Dashboard",
                "bg-white",
                "text-black",
                "header-nav-2",
                showNav2 ? "hidden" : ""
            )}
        </div>
    );
}
