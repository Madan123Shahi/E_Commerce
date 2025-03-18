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
    <div className="bg-gray-100 w-full  font-sans">
      {/* First Div: Logo, Search Bar, Login, Cart */}
      <div className="flex justify-between items-center px-4 py-4 bg-white shadow-md">
        {/* Logo */}
        <div>
          <img
            src={logo}
            width="50"
            alt="Logo"
            className="rounded-md cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex gap-2 w-full max-w-lg bg-gray-100 px-4 py-2 rounded-md border border-gray-300 ">
          <a href="#">
            <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
          </a>
          <input
            type="text"
            placeholder="Search for Products Brands and More..."
            className=" flex-1 outline-none bg-transparent text-sm "
          />
        </div>

        {/* Login */}
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon
            icon={faCircleUser}
            className="text-gray-500 cursor-pointer"
            onClick={() => navigate("/login")}
          />
          <button
            className="text-md font-medium  text-gray-700 hover:text-gray-950
          "
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>

        {/* Signup */}
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon
            icon={faUserPlus}
            className="text-gray-500 cursor-pointer"
            onClick={() => navigate("/signup")}
          />

          <button
            className="text-md font-medium  text-gray-700 hover:text-gray-950 "
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Cart */}
        <div className="flex gap-2 items-center">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-gray-500 cursor-pointer"
            onClick={() => navigate("/cart")}
          />

          <button
            className="hidden md:inline-block text-md font-medium text-gray-700  hover:text-gray-950"
            onClick={() => navigate("/cart")}
          >
            Cart
          </button>
        </div>
      </div>
      {/* <hr className="h-2 bg-gray-400 border-none" /> */}
      {/* Second Div: Product Categories */}
      <div className="flex justify-between items-center  px-2 py-4 gap-20 shadow-sm my-1">
        {categories.map((category, index) => (
          <span
            key={index}
            className="text-sm font-medium text-gray-700 hover:text-gray-950
          cursor-pointer transition-colors"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
