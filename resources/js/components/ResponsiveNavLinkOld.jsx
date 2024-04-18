// components/ResponsiveNavLink.jsx
import { useState } from 'react';
import NavLink from './NavLinkOld';

const ResponsiveNavLink = ({ href, active, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <NavLink
        className="text-white text-sm"
        href={href}
        active={active}
        onClick={toggleDropdown}
      >
        {children}
      </NavLink>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-lg">
          <NavLink href="#">Home</NavLink>
          <NavLink href="#">My Pets</NavLink>
          <NavLink href="#">All Pets</NavLink>
        </div>
      )}
    </div>
  );
};

export default ResponsiveNavLink;


// import { Link } from '@inertiajs/react';

// export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
//     return (
//         <Link
//             {...props}
//             className={`w-full flex items-start ps-3 pe-4 py-2 border-l-4 ${
//                 active
//                     ? 'border-indigo-400 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700'
//                     : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300'
//             } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
//         >
//             {children}
//         </Link>
//     );
// }
