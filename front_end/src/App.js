import logo from "../src/images/logo.jpg";
// import { FaSearch } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

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
    <div className="max-w-7xl p-4">
      {/* First Div: Logo, Search Bar, Login, Cart */}
      <div className="flex justify-between items-center mb-2">
        {/* Logo */}
        <div className="ml-4">
          <a href="/">
            <img
              src={logo}
              width="50"
              alt="Logo"
              className="rounded-lg hover:opacity-80 transition-opacity duration-200 "
            />
          </a>
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-8">
          <div className="absolute inset-y-0">
            <CiSearch />
          </div>
          <input
            type="text"
            placeholder="Search for Products Brands and More..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent "
          />
          <button className="">Search</button>
        </div>

        {/* Login */}
        <div className="">
          <button className="">Login</button>
        </div>

        {/* Cart */}
        <div className="">
          <a href="/cart" className="">
            Cart (0)
          </a>
        </div>
      </div>
      {/* <hr className="h-2 bg-gray-400 border-none" /> */}
      {/* Second Div: Product Categories */}
      <div className="">
        {categories.map((category, index) => (
          <span key={index} className="">
            {category}
          </span>
        ))}
      </div>
    </div>
  );
};

export default App;
