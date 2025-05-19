
import SearchIcon from "../assets/icons/search.svg"

const Header = () => (
  <header className="relative z-20 w-full px-6 py-4 flex justify-between items-center">
    {/* Logo */}
    <div className="text-3xl font-bold">
      <span className="text-black">Med</span>
      <span className="text-red-600">Link</span>
    </div>

    {/* Navigation Menu */}
    <nav className="hidden md:flex gap-8 font-medium text-black">
      <a href="#" className="hover:text-blue-600">
        Home
      </a>
      <a href="#" className="hover:text-blue-600">
        Service
      </a>
      <a href="#" className="hover:text-blue-600">
        Blog
      </a>
      <a href="#" className="hover:text-blue-600">
        Contact
      </a>
    </nav>

    {/* Action Buttons */}
    <div className="flex items-center gap-4">
      <button aria-label="Search" className="text-black text-xl">
        <img src={SearchIcon} alt="Search" className="w-6 h-6" />
      </button>
      <button className="bg-[#061492] text-white px-6 py-2 rounded-full font-semibold">
        Get Started
      </button>
    </div>
  </header>
);

export default Header;
