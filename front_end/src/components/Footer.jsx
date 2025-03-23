const Footer = () => {
  return (
    <footer className="bg-[#172337] text-white py-10 px-4">
      {/* Top footer: Flex row with columns */}
      <div className="flex flex-wrap justify-between gap-10 text-sm">
        {/* About */}
        <div className="flex flex-col min-w-[150px]">
          <h3 className="font-bold mb-3 text-gray-300">ABOUT</h3>
          <ul className="space-y-2">
            <li className="cursor-pointer text-gray-400 hover:text-white">
              Contact Us
            </li>
            <li className="cursor-pointer text-gray-400 hover:text-white">
              About Us
            </li>
            <li className="cursor-pointer text-gray-400 hover:text-white">
              Careers
            </li>
            <li className="cursor-pointer text-gray-400 hover:text-white">
              Flipkart Stories
            </li>
          </ul>
        </div>

        {/* Group Companies */}
        <div className="flex flex-col min-w-[150px]">
          <h3 className="font-bold mb-3 text-gray-300">GROUP COMPANIES</h3>
          <ul className="space-y-2">
            <li className="cursor-pointer text-gray-400 hover:text-white">
              Myntra
            </li>
            <li className="cursor-pointer text-gray-400 hover:text-white">
              Flipkart Wholesale
            </li>
            <li className="cursor-pointer text-gray-400 hover:text-white">
              Cleartrip
            </li>
            <li className="cursor-pointer text-gray-400 hover:text-white">
              Shopsy
            </li>
          </ul>
        </div>

        {/* Help */}
        <div className="flex flex-col min-w-[150px]">
          <h3 className="font-bold mb-3 text-gray-300">HELP</h3>
          <ul className="space-y-2">
            <li className="cursor-pointer text-gray-400 hover:text-white">
              Payments
            </li>
            <li className="cursor-pointer text-gray-400 hover:text-white">
              Shipping
            </li>
            <li className="cursor-pointer text-gray-400 hover:text-white">
              Cancellation & Returns
            </li>
            <li className="cursor-pointer text-gray-400 hover:text-white">
              FAQ
            </li>
          </ul>
        </div>

        {/* Consumer Policy */}
        <div className="flex flex-col min-w-[150px]">
          <h3 className="font-bold mb-3 text-gray-300">CONSUMER POLICY</h3>
          <ul className="space-y-2">
            <li className="cursor-pointer text-gray-400 hover:text-white">
              Return Policy
            </li>
            <li className="cursor-pointer text-gray-400 hover:text-white">
              Terms of Use
            </li>
            <li className="cursor-pointer text-gray-400 hover:text-white">
              Security
            </li>
            <li className="cursor-pointer text-gray-400 hover:text-white">
              Privacy
            </li>
          </ul>
        </div>

        {/* Mail Us */}
        <div className="flex flex-col">
          <h3 className="font-bold mb-3 text-gray-300">MAIL US</h3>
          <p className="text-gray-400 text-sm">
            Flipkart Internet Private Limited, <br />
            Buildings Alyssa, Begonia & Clove Embassy Tech Village, <br />
            Outer Ring Road, Devarabeesanahalli Village, <br />
            Bengaluru, 560103, <br />
            Karnataka, India
          </p>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-gray-600 mt-10 pt-4 text-center text-gray-500 text-sm">
        © 2025 Flipkart Clone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
