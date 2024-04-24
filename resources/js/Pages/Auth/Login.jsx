import { useEffect } from "react";
import Checkbox from "@/components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import Heading from "@/components/Heading";
import { Head, Link, useForm } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome icon component
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <div className="flex gap-x-8 sm:max-w-md lg:max-w-2xl mt-6 p-8 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div className="lg:w-80 md:w-80">
                    <Head title="Log in" />

                    {status && (
                        <div className="mb-4 font-medium text-sm text-green-600">
                            {status}
                        </div>
                    )}
                    <Heading title="Sign In" />
                    <form onSubmit={submit}>
                        <div className="max-h-[300px] overflow-y-auto">
                            <div>
                                <TextInput
                                    icon={
                                        <FontAwesomeIcon
                                            icon={faEnvelope}
                                            className="h-5 w-5 text-gray-400"
                                        />
                                    }
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    value={data.email}
                                    className="block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <TextInput
                                    icon={
                                        <FontAwesomeIcon
                                            icon={faLock}
                                            className="h-5 w-5 text-gray-400"
                                        />
                                    }
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={data.password}
                                    className="block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="block mt-4">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <span className="ms-2 text-sm text-gray-600">
                                        Remember me
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col  mt-4">
                            <div className="flex gap-3 justify-start mt-4">
                                <PrimaryButton disabled={processing}>
                                    Log in
                                </PrimaryButton>

                                <Link
                                    href={route("register")}
                                    className="hidden lg:block md:block underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-3"
                                >
                                    Create an account
                                </Link>
                                <Link
                                    href={route("register")}
                                    className="lg:hidden md:hidden inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-primaryFocus focus:bg-primaryFocus active:bg-primaryFocus focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Sign up
                                </Link>
                            </div>
                            <div className="mt-4">
                                <Link
                                    href={route("password.requestCustom")}
                                    className="lg:hidden md:hidden underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-3"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="flex flex-col sm:justify-center items-center">
                    <img
                        className="hidden lg:block md:block w-64 h-60 fill-current text-gray-500 drop-shadow-md hover:drop-shadow-xl"
                        src="/login.png"
                        alt="Your Image Alt Text"
                    />
                    {canResetPassword && (
                        <Link
                            href={route("password.requestCustom")}
                            className="hidden lg:block md:block underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-3"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
