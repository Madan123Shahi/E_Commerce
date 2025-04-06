// SignupWithFeatures.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import api from "../axios";
import cookies from "js-cookie";
// Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

const SignUpWithFeatures = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");
  const [contactExists, setContactExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("register");

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  const contactRegex = /^([+]?\d{1,3})?\d{10}$|^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const evaluatePasswordStrength = (pwd) => {
    if (pwd.length < 6) return "Weak";
    if (!passwordRegex.test(pwd)) return "Medium";
    return "Strong";
  };

  useEffect(() => {
    const errors = {};
    if (!name.trim()) errors.name = "Name is required.";
    if (!contactRegex.test(contact))
      errors.contact = "Valid email or phone required.";
    if (!passwordRegex.test(password)) errors.password = "Weak password.";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match.";
    if (!acceptTerms) errors.terms = "Accept terms to continue.";
    setFormErrors(errors);
  }, [name, contact, password, confirmPassword, acceptTerms]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (contactRegex.test(contact)) {
        api
          .post("/check-contact", { contact })
          .then((res) => setContactExists(res.data.exists))
          .catch(() => setContactExists(false));
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [contact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length > 0 || contactExists) return;
    setLoading(true);
    try {
      const res = await api.post("/register", {
        name,
        contact,
        password,
      });
      if (res.data.success) setStep("otp");
    } catch (err) {
      alert("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const token = cookies.get("Token");
    try {
      const res = await api.post("/verify-otp", {
        token,
        otp,
      });
      if (res.data.success) navigate("/login");
    } catch {
      alert("Invalid OTP");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      // Send token to your backend for verification and registration/login
      console.log("Google Login Success:", result.user);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <img
            src={logo}
            alt="Logo"
            className="w-20 mx-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {step === "register" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm">{formErrors.name}</p>
            )}

            <input
              type="text"
              placeholder="Email or Phone"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full p-2 border rounded"
            />
            {formErrors.contact && (
              <p className="text-red-500 text-sm">{formErrors.contact}</p>
            )}
            {contactExists && (
              <p className="text-red-500 text-sm">Contact already registered</p>
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordStrength(evaluatePasswordStrength(e.target.value));
                }}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                className="absolute top-2 right-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
              <p
                className={`text-sm mt-1 ${
                  passwordStrength === "Strong"
                    ? "text-green-600"
                    : passwordStrength === "Medium"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                Strength: {passwordStrength}
              </p>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                className="absolute top-2 right-2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                />
              </button>
            </div>
            {formErrors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {formErrors.confirmPassword}
              </p>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />
              <label className="ml-2 text-sm">Accept Terms & Conditions</label>
            </div>
            {formErrors.terms && (
              <p className="text-red-500 text-sm">{formErrors.terms}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Sign Up"}
            </button>

            <div className="text-center text-sm mt-2">
              Already have an account?{" "}
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="mt-4 w-full border p-2 rounded text-gray-700"
              >
                Sign Up with Google
              </button>
            </div>
          </form>
        )}

        {step === "otp" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-center">
              Enter OTP sent to your contact
            </h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter OTP"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpWithFeatures;
