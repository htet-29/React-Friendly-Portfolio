import { NavLink } from 'react-router';
import { FaLaptopCode } from 'react-icons/fa';

const Navbar = () => {
  const base = 'transition hover:text-blue-400';
  const active = 'text-blue-400 font-semibold';

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
            <NavLink className={({ isActive }) => (isActive ? active : base)} to="/">
              Home
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? active : base)} to="/projects">
              Projects
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? active : base)} to="/blog">
              Blog
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? active : base)} to="/about">
              About
            </NavLink>
            <NavLink className={({ isActive }) => (isActive ? active : base)} to="/contact">
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
