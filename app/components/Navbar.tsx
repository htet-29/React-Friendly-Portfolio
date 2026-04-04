import { NavLink } from 'react-router';
import { FaLaptopCode } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 border-b border-gray-700 bg-gray-800 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-bold text-blue-300">
          <FaLaptopCode className="text-xl text-blue-400" />
          <span>The Friendly Developer</span>
        </NavLink>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          <div className="space-x-4 text-sm text-gray-300">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
