import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
const LoginPage = () => {
  const [phoneOrEmail, setPhoneOrEmail] = useState("");

  return (
    <div className="flex justify-center items-center bg-gray-400 min-h-screen">
      <div className="flex flex-col">
        <FontAwesomeIcon icon={faUser} className=" mt-8 text-7xl" />

        <p className="mt-2 text-2xl ">USER LOGIN</p>
      </div>
    </div>
  );
};

export default LoginPage;
