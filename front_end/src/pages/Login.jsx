import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
const LoginPage = () => {
  const [phoneOrEmail, setPhoneOrEmail] = useState("");

  return (
    <div className="flex justify-center items-center bg-gray-300 min-h-screen">
      <div className="flex flex-col items-center">
        <FontAwesomeIcon icon={faUser} className="text-6xl text-gray-500" />

        <p className="mt-4 p-3 text-lg font-medium text-gray-500">USER LOGIN</p>
        <div className="flex gap-3  px-4 py-2 text-gray-500  border border-gray-300 shadow-inner items-center bg-gray-100 mt-3">
          <FontAwesomeIcon
            icon={faUser}
            className="border-r-2 border-r-white pr-3"
          />

          <input
            type="text"
            placeholder="Phone Or Email"
            className=" flex-1 outline-none bg-transparent text-sm "
          />
        </div>
        <div className="flex gap-3  px-4 py-2 text-gray-500  border border-gray-300 shadow-inner items-center bg-gray-100 mt-4">
          <FontAwesomeIcon
            icon={faEyeSlash}
            className="border-r-2 border-r-white pr-3"
          />

          <input
            type="text"
            placeholder="Password"
            className=" flex-1 outline-none bg-transparent text-sm "
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
