import { useState, useEffect } from "react";
import ApplicationLogo from "@/components/ApplicationLogo";
import NavLink from "@/components/NavLink";
import ResponsiveNavLink from "@/components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";

export default function Authenticated({ user, header, children }) {
    const [showNav1, setShowNav1] = useState(true);
    const [showNav2, setShowNav2] = useState(false);
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

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
            <header className={`shadow md:px-4 lg:px-20 h-10 ${isVisible ? '' : 'hidden'} ${bgColor}`} id={id}>
                <div className="max-w-7xl px-4 sm:px-6 lg:px-8 h-10 flex items-center">
                    <h2 className={`font-semibold text-lg leading-tight ${textColor}`}>{title}</h2>
                </div>
            </header>
        );
    };
    return (
        <div className="bg-gray-100 ">
            <div className="fixed w-full  z-10 top-0 shadow-2xl">
                <nav
                 className={`h-12 sm:h-28 bg-primary sm:bg-white ${showNav1 ? '' : 'hidden'}`}
                    id="nav1"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between sm:justify-center h-12 sm:h-28">
                            <div className="flex">
                                <div className="hidden space-x-8 sm:-my-px sm:flex">
                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        HOME
                                    </NavLink>
                                </div>
                                <div className="hidden space-x-8 sm:-my-px sm:flex">
                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        MY PETS
                                    </NavLink>
                                </div>
                                <div className="hidden space-x-8 sm:-my-px sm:flex">
                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        ALL PETS
                                    </NavLink>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="shrink-0 flex sm:items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-12 sm:h-28 w-auto fill-current text-gray-800" />
                                    </Link>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="hidden space-x-8 sm:-my-px sm:flex">
                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        PREMIUM
                                    </NavLink>
                                </div>
                                <div className="hidden space-x-8 sm:-my-px sm:flex">
                                    <NavLink
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        ABOUT
                                    </NavLink>
                                </div>
                                <div className="hidden space-x-8 sm:-my-px  sm:flex">
                                    <NavLink
                                        href={route("profile.edit")}
                                        active={route().current("profile.edit")}
                                    >
                                        PROFILE
                                    </NavLink>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState
                                        )
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            (showingNavigationDropdown ? "block" : "hidden") +
                            " sm:hidden"
                        }
                    >
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">
                                    username
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    useremail
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>
                <nav 
                className={`h-12 bg-white sm:bg-primary ${showNav2 ? '' : 'hidden'}`} 
                id="nav2">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between sm:justify-center h-12">
                            <div className="flex">
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
                            </div>
                            <div className="flex">
                                <div className="shrink-0 flex sm:items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-12 w-auto fill-current text-gray-800" />
                                    </Link>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="hidden  space-x-8 sm:-my-px sm:flex">
                                    <NavLink   className="text-white text-sm"
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        PREMIUM
                                    </NavLink>
                                </div>
                                <div className="hidden  space-x-8 sm:-my-px sm:flex">
                                    <NavLink   className="text-white text-sm"
                                        textSize="lg"
                                        href={route("dashboard")}
                                        active={route().current("dashboard")}
                                    >
                                        ABOUT
                                    </NavLink>
                                </div>
                                <div className="hidden  space-x-8 sm:-my-px  sm:flex">
                                    <NavLink   className="text-white text-sm"
                                        textSize="sm"
                                        href={route("profile.edit")}
                                        active={route().current("profile.edit")}
                                    >
                                        PROFILE
                                    </NavLink>
                                </div>
                            </div>

                            <div className="-me-2 flex items-center sm:hidden">
                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState
                                        )
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className={
                            (showingNavigationDropdown ? "block" : "hidden") +
                            " sm:hidden"
                        }
                    >
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                            >
                                Dashboard
                            </ResponsiveNavLink>
                        </div>

                        <div className="pt-4 pb-1 border-t border-gray-200">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">
                                    username
                                </div>
                                <div className="font-medium text-sm text-gray-500">
                                    useremail
                                </div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </nav>
                {renderHeader("Dashboard", "bg-primary", "text-white", "header-nav-1", showNav1)}
                {renderHeader("Dashboard", "white", "text-black", "header-nav-2", showNav2)}
            </div>
            <main>{children}</main>
        </div>
    );
}
