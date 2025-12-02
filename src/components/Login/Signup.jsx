import React from "react";
import Navbar from "../Home Page/Navbar";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = React.useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = React.useState({});

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!signupInfo.firstName.match(/^[A-Za-z]{2,}$/)) {
      newErrors.firstName = "First name must be at least 2 letters.";
    }
    if (!signupInfo.lastName.match(/^[A-Za-z]{2,}$/)) {
      newErrors.lastName = "Last name must be at least 2 letters.";
    }
    if (!signupInfo.phone.match(/^\+?[0-9]{10,15}$/)) {
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

    if (Object.keys(newErrors).length === 0) {
      // ✅ Submit form or call API
      console.log("Form submitted successfully:", signupInfo);
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
                value={signupInfo.firstName}
                onChange={(e) =>
                  setSignupInfo((s) => ({ ...s, firstName: e.target.value }))
                }
                placeholder="Enter First Name"
                className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-black py-4 px-2"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>

            <div className="flex flex-col w-full">
              <input
                type="text"
                value={signupInfo.lastName}
                onChange={(e) =>
                  setSignupInfo((s) => ({ ...s, lastName: e.target.value }))
                }
                placeholder="Enter Last Name"
                className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-black py-4 px-2"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
          </div>

          <input
            type="tel"
            value={signupInfo.phone}
            onChange={(e) =>
              setSignupInfo((s) => ({ ...s, phone: e.target.value }))
            }
            placeholder="Phone number"
            className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-black py-4 px-2"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}

          <input
            type="email"
            value={signupInfo.email}
            onChange={(e) =>
              setSignupInfo((s) => ({ ...s, email: e.target.value }))
            }
            placeholder="example@mail.com"
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
            className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-black py-4 px-2"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}

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
