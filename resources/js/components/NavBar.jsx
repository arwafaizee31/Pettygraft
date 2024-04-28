import { useState, useEffect } from "react";
import ApplicationLogo from "@/components/ApplicationLogo";
import NavLink from "@/components/NavLink";
import ResponsiveNavLink from "@/components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { IoClose, IoMenu } from "react-icons/io5";

export default function NavBar() {
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
        <div className="fixed w-full  z-50 top-0 shadow-2xl">
            <nav
                className={`h-12 sm:h-28 flex bg-white ${
                    showNav1 ? "" : "hidden"
                }`}
                id="nav1"
            >
                {/* <div className="flex sm:hidden">
                    <div className="shrink-0 flex sm:items-center nav1-logo">
                        <Link href="/">
                            <ApplicationLogo className="block h-12 sm:h-28 w-auto fill-current text-gray-800" />
                        </Link>
                    </div>
                </div> */}
                <div className="max-w-7xl sls sm:mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className="flex justify-between sm:justify-center h-12 sm:h-28"
                        
                    >
                        <div className="flex">
                            <div className="hidden space-x-8 sm:-my-px sm:flex">
                                <NavLink
                                    href={route("vendor-dashboard")}
                                    active={route().current("vendor-dashboard")}
                                >
                                    HOME
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:flex">
                                <NavLink
                                    href={route("vendor-dashboard")}
                                    active={route().current("vendor-dashboard")}
                                >
                                    MY PETS
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:flex">
                                <NavLink
                                    href={route("vendor-dashboard")}
                                    active={route().current("vendor-dashboard")}
                                >
                                    ALL PETS
                                </NavLink>
                            </div>
                        </div>
                        <div className="flex sm:-my-px sm:flex space-x-8">
                            <div className="shrink-0 flex sm:items-center nav1-logo">
                                <Link href="/">
                                    <ApplicationLogo className="block h-12 sm:h-28 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="hidden space-x-8 sm:-my-px sm:flex">
                                <NavLink
                                    href={route("vendor-dashboard")}
                                    active={route().current("vendor-dashboard")}
                                >
                                    PREMIUM
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:flex">
                                <NavLink
                                    href={route("vendor-dashboard")}
                                    active={route().current("vendor-dashboard")}
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
                                <NavLink
                                    className="text-sm"
                                    textsize="sm"
                                    method="post"
                                    href={route("logout")}
                                    as="button"                                    
                                >
                                    logout
                                </NavLink>
                            </div>
                        </div>
                    

                    </div>
                  
                </div>
            </nav>
            <nav
                className={`h-12 bg-primary sm:bg-primary ${
                    showNav2 ? "" : "hidden"
                }`}
                id="nav2"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between sm:justify-center h-12">
                        <div className="flex">
                            <div className="flex items-center transform xl:-translate-x-64 lg:-translate-x-32 md:-translate-x-16 nav2-logo">
                                {" "}
                                {/* Apply styling to this div */}
                                <ApplicationLogo className="block h-8 w-auto fill-current text-gray-800" />
                                <h2 className="">
                                    <strong>PettyGraft</strong>
                                </h2>
                            </div>
                            <div className="hidden  space-x-8 sm:-my-px sm:flex">
                                <NavLink
                                    className="text-white text-sm"
                                    href={route("vendor-dashboard")}
                                    active={route().current("vendor-dashboard")}
                                >
                                    HOME
                                </NavLink>
                            </div>
                            <div className="hidden  space-x-8 sm:-my-px sm:flex">
                                <NavLink
                                    className="text-white text-sm"
                                    href={route("vendor-dashboard")}
                                    active={route().current("vendor-dashboard")}
                                >
                                    MY PETS
                                </NavLink>
                            </div>
                            <div className="hidden  space-x-8 sm:-my-px sm:flex">
                                <NavLink
                                    className="text-white text-sm"
                                    href={route("vendor-dashboard")}
                                    active={route().current("vendor-dashboard")}
                                >
                                    ALL PETS
                                </NavLink>
                            </div>

                            <div className="hidden  space-x-8 sm:-my-px sm:flex">
                                <NavLink
                                    className="text-white text-sm"
                                    href={route("vendor-dashboard")}
                                    active={route().current("vendor-dashboard")}
                                >
                                    PREMIUM
                                </NavLink>
                            </div>
                            <div className="hidden  space-x-8 sm:-my-px sm:flex">
                                <NavLink
                                    className="text-white text-sm"
                                    textsize="lg"
                                    href={route("vendor-dashboard")}
                                    active={route().current("vendor-dashboard")}
                                >
                                    ABOUT
                                </NavLink>
                            </div>
                            <div className="hidden  space-x-8 sm:-my-px  sm:flex">
                                <NavLink
                                    className="text-white text-sm"
                                    textsize="sm"
                                    href={route("profile.edit")}
                                    active={route().current("profile.edit")}
                                >
                                    PROFILE
                                </NavLink>
                               
                            </div>
                        </div>
                    </div>
                </div>
                {/* 
                <div className={ (showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            href={route("vendor-dashboard")}
                            active={route().current("vendor-dashboard")}
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
                </div> */}
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
