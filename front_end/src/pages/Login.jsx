import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
const LoginPage = () => {
  const [phoneOrEmail, setPhoneOrEmail] = useState("");

  return (
    <div className="flex justify-center items-center bg-gray-200 min-h-screen">
      <div className="flex flex-col justify-center items-center bg-blue-500 rounded p-10 space-y-6 w-full max-w-md">
        {/* div for icon */}
        <div className="text-7xl text-white bg-blue-500 rounded-lg">
          <FontAwesomeIcon icon={faUser} />
        </div>
        {/* div for User Login Text */}
        <div className="text-white font-medium text-2xl">USER LOGIN</div>
        {/* div for Username Input */}
        <div className="flex gap-2 w-full bg-white items-center p-2 rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-600 ">
          <div className="flex items-center pr-3 border-r text-gray-500">
            <FontAwesomeIcon icon={faUser} className="ml-2" />
          </div>
          <input
            type="text"
            placeholder="Phone Or Email"
            className=" w-full p-1 px-3 text-base outline-none caret-transparent text-gray-500"
          />
        </div>

        {/* div for Username Input */}
        <div className="flex gap-2 w-full bg-white items-center p-2 rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-600 ">
          <div className="flex items-center pr-3 border-r text-gray-500">
            <FontAwesomeIcon icon={faEyeSlash} className="ml-1" />
          </div>
          <input
            type="text"
            placeholder="Password"
            className="  w-full px-3 text-base p-1 outline-none caret-transparent text-gray-500"
          />
        </div>
        {/* div for Remember me check box along with forgot password */}
        <div className="flex justify-between w-full">
          <div className="flex gap-1 items-center">
            <label className="text-base text-white font-bold ">
              Remember Me
            </label>
            <input type="checkbox" />
          </div>
          <span className="text-white font-bold text-base">
            Forgot Password
          </span>
        </div>
        {/* div for Login Button */}
        <div className="w-full bg-white text-center p-2 rounded-lg text-gray-500 text-lg cursor-pointer">
          Login
        </div>
        <div className="text-white font-bold cursor-pointer">
          New to Flipkart? Create an account
        </div>
        <div>{/* Footer */}</div>
      </div>
    </div>
  );
};

export default LoginPage;
