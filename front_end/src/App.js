import logo from "../src/images/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCircleUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const App = () => {
  // Sample product categories
  const categories = [
    "Mobiles",
    "Fashion",
    "Electronics",
    "Appliances",
    "Beauty, Toys & More",
    "Flight Bookings",
    "Two Wheelers",
  ];

  return (
    <div className="bg-gray-100 w-full min-h-screen font-sans">
      {/* First Div: Logo, Search Bar, Login, Cart */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        {/* Logo */}
        <div>
          <a href="/">
            <img src={logo} width="50" alt="Logo" className="rounded-md" />
          </a>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex  gap-2 w-full max-w-xl bg-gray-100 px-4 py-2 rounded-md border border-gray-300 ">
          <a href="#">
            <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
          </a>
          <input
            type="text"
            placeholder="Search for Products Brands and More..."
            className=" flex-1 outline-none bg-transparent text-sm"
          />
        </div>

        {/* Login */}
        <div className="flex gap-2">
          <a href="/login">
            <FontAwesomeIcon icon={faCircleUser} className="text-gray-500" />
          </a>

          <button className="text-md font-medium hover:underline text-gray-700">
            Login
          </button>
        </div>

        {/* Cart */}
        <div className="flex gap-2 items-center">
          <a href="/cart">
            <FontAwesomeIcon icon={faShoppingCart} className="text-gray-500" />
          </a>

          <a
            href="/cart"
            className="hidden md:inline-block text-md font-medium text-gray-700 hover:underline"
          >
            Cart
          </a>
        </div>
      </div>
      {/* <hr className="h-2 bg-gray-400 border-none" /> */}
      {/* Second Div: Product Categories */}
      <div className="flex justify-between items-center gap-20 py-3 shadow-sm my-1">
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

export default App;
