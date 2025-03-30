import logo from "../images/logo.jpg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState("");
  const [submitError, setSubmitError] = useState(false);

  // RegExp Initialization
  const contactRegexp = /^(\+\d{1,3}[- ]?)?\d{10}$|^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegexp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

  useEffect(() => {
    let errors = {};

    // Name Validation
    if (!name.trim()) {
      errors.name = "Name is required";
    } else if (name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    // Contact validation
    if (!contact.trim()) {
      errors.contact = "Mobile Number or Email is required";
    } else if (!contactRegexp.test(contact)) {
      errors.contact = "Please enter a valid email or mobile number";
    }

    // Password Validation
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (!passwordRegexp.test(password)) {
      errors.password =
        "Password must contain uppercase, lowercase, number, and special character";
    }

    // Confirm Password Validation
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    setDisabledButton(Object.keys(errors).length > 0);
  }, [name, contact, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    if (Object.keys(formErrors).length === 0) {
      // console.log("Form Submitted", { name, contact, password });
      // Here you would typically send the data to your backend
      setSubmitted(true);
      try {
        const userData = {
          name,
          contact,
          password,
        };
        // API End Point
        const response = await axios.post(
          "http://localhost:8000/api/users/register",
          userData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          console.log("Registration Successfull", response.data);
          // alert("User registered successfully");
          // setTimeout(() => {
          //   navigate("/login", {
          //     state: { registrationSuccess: true },
          //   });
          // }, 1000); // Delay navigation by 1 second
          navigate("/login", {
            state: {
              registrationSuccess: true,
            },
          });
        } else {
          setSubmitError(response.data.message || "Registration Failed");
        }
      } catch (error) {
        console.error("Registration Error:", error);
        if (error.response) {
          setSubmitError(error.response.data.message || "Registration Failed");
        } else if (error.request) {
          setSubmitError("No response from Server.Please try again.");
        } else {
          setSubmitError("Registraion Failed.Please try again");
        }
      } finally {
        setSubmitError(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword(!confirmShowPassword);
  };

  return (
    <div className="flex items-center justify-center mt-10 mb-10">
      <div className="flex flex-col space-y-5 w-full max-w-md">
        {/* Div for logo  */}
        <div className="flex justify-center">
          <img
            width="100px"
            className="rounded-lg cursor-pointer hover:opacity-90"
            src={logo}
            onClick={() => navigate("/login")}
            alt="Company Logo"
          />
        </div>
        {/* Div for Sign Up Form */}
        <form onSubmit={handleSubmit}>
          <fieldset className="border-4 border-blue-500 p-6 space-y-5">
            <legend className="text-center text-2xl font-medium">
              Create Account
            </legend>

            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-900 font-medium mb-1">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="First And Last Name"
                className="pl-3 py-2 border-2 border-blue-500 outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 rounded text-gray-900"
                required
                minLength="2"
                pattern="[A-Za-z ]+"
                title="Please enter your full name (letters and spaces only)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {formErrors.name && (
                <p className="text-red-500 text-base font-medium mt-1">
                  {formErrors.name}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="contact"
                className="text-gray-900 font-medium mb-1"
              >
                Mobile Number Or Email
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                autoComplete="username"
                placeholder="Mobile Number Or Email"
                className="pl-3 py-2 border-2 border-blue-500 outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 rounded text-gray-900"
                required
                // pattern="^(\+\d{1,3}[- ]?)?\d{10}$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                title="Please enter a valid mobile number or email address"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              {formErrors.contact && (
                <p className="text-red-500 text-base font-medium mt-1">
                  {formErrors.contact}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-gray-900 font-medium mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="At Least 8 Characters"
                  className="w-full pl-3 py-2 border-2 border-blue-500 outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 rounded text-gray-900"
                  required
                  minLength="8"
                  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
                  title="Password should have at least one uppercase, one lowercase, one digit and one special character"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              {formErrors.password ? (
                <p className="text-red-500 text-base font-medium mt-1">
                  {formErrors.password}
                </p>
              ) : (
                <p className="mt-2 text-blue-500 text-sm">
                  <FontAwesomeIcon icon={faEyeSlash} className="mr-2" />
                  Passwords must be at least 8 characters.
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="text-gray-900 font-medium mb-1"
              >
                Re-enter Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={confirmShowPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className="w-full pl-3 py-2 border-2 border-blue-500 outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 rounded text-gray-900"
                  required
                  minLength="8"
                  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$"
                  title="Password should have at least one uppercase, one lowercase, one digit and one special character"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={confirmShowPassword ? faEyeSlash : faEye}
                  />
                </button>
              </div>
              {formErrors.confirmPassword && (
                <p className="text-red-500 text-base font-medium mt-1">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={disabledButton}
                className={`w-full py-2 text-white font-bold text-xl rounded ${
                  disabledButton
                    ? "bg-red-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Continue
              </button>
            </div>

            <div className="text-sm">
              By creating an account, you agree to PBSSMK's{" "}
              <span className="text-blue-500 underline cursor-pointer hover:text-blue-700">
                Conditions of Use
              </span>{" "}
              and{" "}
              <span className="text-blue-500 underline cursor-pointer hover:text-blue-700">
                Privacy Notice
              </span>
              .
            </div>

            <div className="text-sm">
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:text-blue-700 hover:underline"
                onClick={() => navigate("/login")}
              >
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
