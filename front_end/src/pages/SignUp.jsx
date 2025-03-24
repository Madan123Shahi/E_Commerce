import logo from "../images/logo.jpg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { signupSchema } from "./../validations/SignupSchema";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center mt-10 mb-10">
      <div className="flex flex-col space-y-5 w-full max-w-md">
        {/* Div for logo  */}
        <div className="flex justify-center">
          <img
            width="100px"
            className="  rounded-lg cursor-pointer hover:opacity-90"
            src={logo}
            onClick={() => navigate("/login")}
          />
        </div>
        {/* Div for Sign Up Form */}

        <form>
          <fieldset className="border border-gray-300 p-6 space-y-5">
            <legend className="text-2xl font-medium">Create Account</legend>

            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-900 font-medium mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="First And Last Name"
                className=" pl-3 py-2
                 border border-gray-500 outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 rounded caret-transparent text-gray-900"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-900 font-medium mb-1">
                Mobile Number Or Email
              </label>
              <input
                type="text"
                placeholder="Mobile Number Or Email"
                className=" pl-3 py-2
                 border border-gray-500 outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 rounded caret-transparent text-gray-900"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-900 font-medium mb-1">
                Password
              </label>
              <input
                type="text"
                placeholder="At Least 6 Characters"
                className=" pl-3 py-2
                 border border-gray-500 outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 rounded caret-transparent text-gray-900"
              />
              <p className="mt-2 text-blue-500">
                <FontAwesomeIcon icon={faEyeSlash} className="mr-2" />
                Passwords must be at least 6 characters.
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-900 font-medium mb-1">
                Re-enter Password
              </label>
              <input
                type="text"
                className=" pl-3 py-2
                 border border-gray-500 outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 rounded caret-transparent text-gray-900"
              />
            </div>
            <div className="flex justify-center bg-blue-500 rounded-full p-2">
              <button
                type="submit"
                className="text-white font-bold text-xl"
                onClick={() => navigate("/login")}
              >
                Continue
              </button>
            </div>
            <div>
              By creating an account, you agree to PBSSMK's{" "}
              <span className="text-blue-500 underline cursor-pointer">
                Conditions of Use
              </span>{" "}
              and{" "}
              <span className="text-blue-500 underline cursor-pointer">
                Privacy Notice
              </span>
              .
            </div>
            <div>
              Already have an account?{" "}
              <span className="text-blue-500 cursor-pointer">
                Sign in {">"}
              </span>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
