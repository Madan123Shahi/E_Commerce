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
      {/* Header Section */}
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        {/* Logo */}
        <div>
          <a href="/">
            <img src={logo} width="50" alt="Logo" className="rounded-md" />
          </a>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 w-full max-w-xl bg-gray-100 px-4 py-2 rounded-md border border-gray-300">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search for Products, Brands and More..."
            className="flex-1 outline-none bg-transparent text-sm"
          />
          <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded">
            Search
          </button>
        </div>

        {/* Login */}
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faCircleUser}
            className="text-xl text-gray-700"
          />
          <button className="text-sm font-medium hover:underline text-gray-700">
            Login
          </button>
        </div>

        {/* Cart */}
        <div className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-xl text-gray-700"
          />
          <a
            href="/cart"
            className="text-sm font-medium text-gray-700 hover:underline"
          >
            Cart (0)
          </a>
        </div>
      </div>

      {/* Category Bar */}
      <div className="flex gap-6 justify-center bg-white py-3 shadow-sm mt-1">
        {categories.map((category, index) => (
          <span
            key={index}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 cursor-pointer transition-colors"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
};

export default App;
