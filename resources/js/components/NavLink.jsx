import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center text-lg font-medium lg:mx-5 md:mx-2 transition duration-150 ease-in-out' +
                // (active
                //     ? 'border-indigo-400 text-gray-900 focus:border-indigo-700 '
                //     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:text-gray-700 focus:border-gray-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
