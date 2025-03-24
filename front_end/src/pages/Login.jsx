import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center  mt-10 mb-10 bg-gray-100 ">
      <div className="flex flex-col justify-center items-center rounded p-10 space-y-5">
        {/* div for icon */}
        <div className="text-7xl text-white bg-blue-500 rounded-lg p-4">
          <FontAwesomeIcon icon={faUser} />
        </div>
        {/* div for User Login Text */}
        <form className="">
          <fieldset className="border-4 border-blue-500 p-6 text-center space-y-5 ">
            <legend className="text-blue-500 font-medium text-2xl mb-5">
              User Login
            </legend>
            {/* div for Username Input */}
            <div className="flex gap-2 w-full bg-white items-center p-2 rounded-lg border-2 border-blue-500 focus-within:ring-4 focus-within:ring-blue-500 focus-within:ring-offset-2 ">
              <div className="flex items-center pr-3 border-r text-gray-500">
                <FontAwesomeIcon icon={faUser} className="ml-2" />
              </div>
              <input
                type="text"
                placeholder="Phone Or Email"
                className=" p-1 px-3 text-base outline-none caret-transparent text-gray-500"
              />
            </div>

            {/* div for Username Input */}
            <div className="flex gap-2 w-full bg-white items-center p-2 rounded-lg border-2 border-blue-500 focus-within:ring-4 focus-within:ring-blue-600 focus-within:ring-offset-2 ">
              <div className="flex items-center pr-3 border-r text-gray-500">
                <FontAwesomeIcon icon={faEyeSlash} className="ml-1" />
              </div>
              <input
                type="text"
                placeholder="Password"
                className=" px-3 text-base p-1 outline-none caret-transparent text-gray-500"
              />
            </div>
            {/* div for Remember me check box along with forgot password */}
            <div className="flex justify-between w-full">
              <div className="flex gap-1 items-center">
                <label className="text-base text-blue-500 font-medium cursor-pointer ">
                  Remember Me
                </label>
                <input type="checkbox" className="cursor-poin" />
              </div>
              <span className=" font-medium text-base cursor-pointer text-blue-500">
                Forgot Password
              </span>
            </div>
            <div className="text-xs">
              By continuing, you agree to Flipkart's{" "}
              <span className="text-blue-500">Terms of Use </span> and
              <span className="text-blue-500"> Privacy Policy.</span>
            </div>
            {/* div for Login Button */}
            <div className=" bg-blue-500 text-white text-center p-2 rounded-lg text-2xl cursor-pointer">
              Login
            </div>
            <div
              className=" font-medium cursor-pointer text-blue-500"
              onClick={() => navigate("/signup")}
            >
              New to Flipkart? Create an account
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
