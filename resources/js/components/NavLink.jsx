import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center font-medium lg:mx-5 md:mx-2 transition duration-150 ease-in-out ' +
                className
            }
        >
            {children}
        </Link>
    );
}
