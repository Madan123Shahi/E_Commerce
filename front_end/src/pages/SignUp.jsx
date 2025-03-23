import logo from "../images/logo.jpg";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center mt-10 mb-10">
      <div className="flex flex-col space-y-5">
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
        <form className="w-full max-w-md">
          <fieldset className="border border-gray-300 p-10">
            <legend className="text-2xl font-medium">Create Account</legend>
            <div className="flex gap-4">
              <label htmlFor="name" className="text-gray-900 font-medium">
                Your Name
              </label>
              <input
                type="text"
                className="border border-gray-500 outline-none focus:ring-2 focus:ring-blue-500 rounded "
              />
            </div>
            <div>
              <label></label>
            </div>
            <div>
              <label></label>
            </div>
            <div>
              <label></label>
            </div>
            <div>
              <label></label>
            </div>
            <div>
              <label></label>
            </div>
            <div>
              <label></label>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
