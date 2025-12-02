import React, { useState} from "react";
import Navbar from "../Home Page/Navbar";
import { signupUser } from "../../api/API";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    first_name: "",
    last_name: "",
    phoneNo: "",
    email: "",
    password: "",
    role: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!signupInfo.first_name.match(/^[A-Za-z]{2,}$/)) {
      newErrors.firstName = "First name must be at least 2 letters.";
    }
    if (!signupInfo.last_name.match(/^[A-Za-z]{2,}$/)) {
      newErrors.last_name = "Last name must be at least 2 letters.";
    }
    if (!signupInfo.phoneNo.match(/^\+?[0-9]{10,15}$/)) {
      newErrors.phone = "Phone number must be 10–15 digits.";
    }
    if (!signupInfo.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (
      !signupInfo.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/
      )
    ) {
      newErrors.password =
        "Password must be 8+ chars, include uppercase, lowercase, number, and special char.";
    }
    if (signupInfo.password !== signupInfo.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    setIsLoading(true)
    setError(null)

    try {
          const response = await signupUser({
            email: signupInfo.email,
            password: signupInfo.password,
            first_name: signupInfo.first_name,
            last_name: signupInfo.last_name,
            phoneNo: signupInfo.phoneNo,
            role: signupInfo.role
          });
    
          console.log("Signup successful:", response);
    
          
          if (response.access_token || response.token) {

            localStorage.setItem(
              "auth_token",
              response.access_token || response.token
            );
    
            if (response.user) {
              localStorage.setItem("user_data", JSON.stringify(response.user));
            }
            navigate("/");
          } else {
            setError("No authentication token received");
          }
        } catch (err) {
          setError(err.message || "Signup failed. Please check your credentials.");
          console.error("register error:", err);
        } finally {
          setIsLoading(false);
        }
  };

  return (
    <>
      <Navbar bgColor={false} />
      <div className="flex flex-col h-screen justify-center items-center">
        <p className="text-[36px] font-bold tracking-tight pb-4">Register</p>
        <form
          onSubmit={handleFormSubmit}
          className="flex w-full max-w-md flex-col gap-2"
        >
          <div className="flex flex-row gap-2">
            <div className="flex flex-col w-full">
              <input
                type="text"
                value={signupInfo.first_name}
                onChange={(e) =>
                  setSignupInfo((s) => ({ ...s, first_name: e.target.value }))
                }
                placeholder="Enter First Name"
                disabled={isLoading}
                className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-black py-4 px-2"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.first_name}</p>
              )}
            </div>

            <div className="flex flex-col w-full">
              <input
                type="text"
                value={signupInfo.last_name}
                onChange={(e) =>
                  setSignupInfo((s) => ({ ...s, last_name: e.target.value }))
                }
                placeholder="Enter Last Name"
                disabled={isLoading}
                className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-black py-4 px-2"
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm">{errors.last_name}</p>
              )}
            </div>
          </div>

          <input
            type="tel"
            value={signupInfo.phoneNo}
            onChange={(e) =>
              setSignupInfo((s) => ({ ...s, phoneNo: e.target.value }))
            }
            placeholder="Phone number"
            disabled={isLoading}
            className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-black py-4 px-2"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phoneNo}</p>
          )}

          <input
            type="email"
            value={signupInfo.email}
            onChange={(e) =>
              setSignupInfo((s) => ({ ...s, email: e.target.value }))
            }
            placeholder="example@mail.com"
            disabled={isLoading}
            className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-black py-4 px-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <input
            type="password"
            value={signupInfo.password}
            onChange={(e) =>
              setSignupInfo((s) => ({ ...s, password: e.target.value }))
            }
            placeholder="Password"
            disabled={isLoading}
            className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-black py-4 px-2"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <input
            type="password"
            value={signupInfo.confirmPassword}
            onChange={(e) =>
              setSignupInfo((s) => ({ ...s, confirmPassword: e.target.value }))
            }
            placeholder="Confirm Password"
            disabled={isLoading}
            className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-black py-4 px-2"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
          <div className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-black">
            <select
              value={signupInfo.role}
              onChange={(e) =>
                setSignupInfo((s) => ({
                  ...s,
                  role: e.target.value,
                }))
              }
              className="py-3 px-2 outline-none w-[90%] text-[14px] text-[#00000070] font-normal"
              name="role"
              id="role"
              disabled={isLoading}
            >
              <option value="" disabled selected>
                Role
              </option>
              <option value="vendor">Vendor</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full outline-none text-[16px] font-semibold indent-4 border border-[#A9ABBD] bg-black text-white py-3 px-2"
          >
            Sign Up
          </button>
        </form>
        <p
          className="text-[14px] text-[#A9ABBD] mt-4 font-medium cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Already have an account?
        </p>
      </div>
    </>
  );
};

export default Signup;
