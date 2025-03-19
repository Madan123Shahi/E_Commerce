import logo from "../images/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleUser,
  faShoppingCart,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  // Sample product categories
  const categories = [
    "Mobiles",
    "Fashion",
    "Electronics",
    "Appliances",
    "Home & Furniture",
    "Beauty, Toys & More",
    "Flight Bookings",
    "Two Wheelers",
  ];

  return (
    <div className="bg-gray-50 w-full  font-sans">
      {/* First Div: Logo, Search Bar, Login, Cart */}
      <div className="flex justify-between items-center px-4 py-3 bg-white shadow-sm gap-4 ">
        {/* Logo */}
        <div>
          <img
            src={logo}
            width="48"
            alt="Logo"
            className="rounded cursor-pointer hover:opacity-90 transition-opacity duration-200"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex gap-2 w-full max-w-xl bg-gray-100 px-4 py-2 rounded-md border border-gray-300 shadow-inner">
          <a href="#">
            <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
          </a>
          <input
            type="text"
            placeholder="Search for Products Brands and More..."
            className=" flex-1 outline-none bg-transparent text-lg font-medium "
          />
        </div>
        <div className="flex items-center gap-20 text-lg font-medium text-gray-500 cursor-pointer  ">
          {/* Login */}
          <div className="flex gap-1 items-center hover:text-blue-500 ">
            <FontAwesomeIcon
              icon={faCircleUser}
              onClick={() => navigate("/login")}
            />
            <span
              className="hidden sm:inline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>

          {/* Signup */}
          <div className="flex gap-1 items-center hover:text-blue-500 ">
            <FontAwesomeIcon
              icon={faUserPlus}
              onClick={() => navigate("/signup")}
            />

            <span
              className="hidden sm:inline"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </div>

          {/* Cart */}
          <div className="flex gap-1 items-center hover:text-blue-500 ">
            <FontAwesomeIcon
              icon={faShoppingCart}
              onClick={() => navigate("/cart")}
            />

            <span
              className="hidden md:inline"
              onClick={() => navigate("/cart")}
            >
              Cart
            </span>
          </div>
        </div>
      </div>
      {/* <hr className="h-2 bg-gray-400 border-none" /> */}
      {/* Second Div: Product Categories */}
      <div className="flex justify-between items-center px-4 py-4 gap-6 md:px-4 md:py-3 md:gap-4">
        {categories.map((category, index) => (
          <span
            key={index}
            className="text-lg font-semibold text-gray-500 hover:text-blue-500 cursor-pointer transition-colors duration-200 whitespace-nowrap"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
