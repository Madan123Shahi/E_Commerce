import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center  mt-10 mb-10">
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
            <label className="text-base text-white font-bold cursor-pointer ">
              Remember Me
            </label>
            <input type="checkbox" className="cursor-pointer" />
          </div>
          <span className="text-white font-bold text-base cursor-pointer">
            Forgot Password
          </span>
        </div>
        <div className="text-xs text-white">
          By continuing, you agree to Flipkart's{" "}
          <span className="text-gray-950">Terms of Use </span> and
          <span className="text-gray-950"> Privacy Policy.</span>
        </div>
        {/* div for Login Button */}
        <div className="w-full bg-white text-center p-2 rounded-lg text-gray-500 text-lg cursor-pointer">
          Login
        </div>
        <div
          className="text-white font-bold cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          New to Flipkart? Create an account
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
