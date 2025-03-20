import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
const LoginPage = () => {
  const [phoneOrEmail, setPhoneOrEmail] = useState("");

  return (
    <div className="flex justify-center items-center bg-gray-200 min-h-screen">
      <div>
        {/* div for icon */}
        <div>Icon</div>
        {/* div for User Login Text */}
        <div>USER LOGIN</div>
        {/* div for Username Input */}
        <div>
          <input />
        </div>
        {/* div for Password */}
        <div>
          <input />
        </div>
        {/* div for Remember me check box along with forgot password */}
        <div>
          <p>Remember Me</p>
          <span>Forgot Password</span>
        </div>
        {/* div for Login Button */}
        <div>Login</div>
      </div>
    </div>
  );
};

export default LoginPage;
