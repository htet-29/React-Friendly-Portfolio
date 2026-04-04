import { NavLink } from 'react-router';
import { FaLaptopCode, FaTimes, FaBars } from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const base = 'transition hover:text-blue-400';
  const active = 'text-blue-400 font-semibold';

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-700 bg-gray-800 shadow-md">
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

        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="cursor-pointer text-xl text-blue-400"
            title="Menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="space-y-2 space-x-4 border-t border-gray-700 bg-gray-800 px-6 py-4 text-center md:hidden">
          <NavLink
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? active : base)}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? active : base)}
            to="/projects"
          >
            Projects
          </NavLink>
          <NavLink
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? active : base)}
            to="/blog"
          >
            Blog
          </NavLink>
          <NavLink
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? active : base)}
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) => (isActive ? active : base)}
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
