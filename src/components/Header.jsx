import { Link } from "react-router-dom";
import SearchIcon from "../assets/icons/search.svg";

const Header = () => (
  <header className="relative z-20 w-full bg-[#9CA6AF40] px-6 py-4 flex justify-between items-center">
    {/* Logo */}
    <Link to={'/'} className="text-3xl font-bold">
      <span className="text-black">Med</span>
      <span className="text-red-600">Link</span>
    </Link>

    {/* Navigation Menu */}
    <nav className="hidden md:flex gap-8 font-medium text-black">
      <Link to={'/'} className="hover:text-[#061492]">
        Home
      </Link>
      <a href="#" className="hover:text-[#061492]">
        Service
      </a>
      <a href="#" className="hover:text-[#061492]">
        Blog
      </a>
      <a href="#" className="hover:text-[#061492]">
        Contact
      </a>
    </nav>

    {/* Action Buttons */}
    <div className="flex items-center gap-4">
      <button aria-label="Search" className="text-black text-xl">
        <img src={SearchIcon} alt="Search" className="w-6 h-6 cursor-pointer" />
      </button>
      <Link to={"/login"}>
        <button className="bg-[#061492] hover:bg-[#061492]/90 cursor-pointer text-white px-6 py-2 rounded-full font-semibold">
          Get Started
        </button>
      </Link>
    </div>
  </header>
);

export default Header;
