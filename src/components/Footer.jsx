import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaHeadset,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#061492] text-white px-4 lg:px-6 py-10">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row space-y-10 lg:space-y-0 justify-between">
        {/* About MedLink */}
        <div className="w-full lg:w-[35%]">
          <h1 className="text-3xl font-bold">
            <span className="text-black">Med</span>
            <span className="text-red-600">Link</span>
          </h1>
          <p className="mt-4 text-sm">
            Our Mission is to empower individuals to take control of{" "}
            <span className="underline">their</span> health by providing easy
            access to experts <span className="underline">Doctors</span>
          </p>
          <div className="flex space-x-4 mt-4 text-xl">
            <FaFacebookF className="cursor-pointer hover:text-gray-400" />
            <FaTwitter className="cursor-pointer hover:text-gray-400" />
            <FaInstagram className="cursor-pointer hover:text-gray-400" />
            <FaHeadset className="cursor-pointer hover:text-gray-400" />
          </div>
          <div className="w-full flex items-center mt-4 border border-gray-500 rounded px-2 py-1">
            <FaEnvelope className="mr-2 text-gray-500" />
            <input
              type="email"
              placeholder="Enter Your Email"
              className="bg-blue-900 text-white bg-transparent outline-none flex-1"
            />
            <button className="bg-gray-300 hover:bg-gray-200 text-[#061492] font-medium cursor-pointer px-4 py-1 rounded ml-2">
              Submit
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>Our Doctors</li>
            <li>Our Services</li>
            <li>FAQ</li>
            <li>Contact</li>
            <li>Pricing</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Help</h2>
          <ul className="space-y-2 text-sm">
            <li>Customer Support</li>
            <li>Delivery Details</li>
            <li>Terms & Conditions</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="font-semibold text-lg mb-3">Contact</h2>
          <ul className="space-y-2 text-sm">
            <li>Submit Request</li>
            <li>Get In Touch</li>
            <li>Chat With Us</li>
            <li>Call Us</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/20 mt-10 pt-6 text-xs flex flex-col md:flex-row justify-between items-center">
        <div className="flex space-x-5 lg:space-x-6 mb-4 md:mb-0">
          <a className="hover:text-gray-400" href="#">
            About Us
          </a>
          <a className="hover:text-gray-400" href="#">
            Contact
          </a>
          <a className="hover:text-gray-400" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-gray-400" href="#">
            Sitemap
          </a>
          <a className="hover:text-gray-400" href="#">
            Terms of Use
          </a>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-sm">© 2000 - 2025, All Right Reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
