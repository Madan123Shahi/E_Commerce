import logo from "../src/images/logo.jpg";

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
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className=" ml-10">
          <a href="/">
            <img src={logo} width="50" alt="Logo" className="rounded-lg" />
          </a>
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-8">
          <input
            type="text"
            placeholder="Search for Products Brands and More"
            className="rounded-lg"
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
