import React, { useState } from "react";
import Navbar from "../Home Page/Navbar";
import { loginUser } from "../../api/API";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginInfo.email || !loginInfo.password) {
      setError("Please fill in all fields");
      return;
    }

    if (loginInfo.rememberMe) {
      localStorage.setItem("email", loginInfo.email);
      localStorage.setItem("password", loginInfo.password);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginInfo.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await loginUser({
        email: loginInfo.email,
        password: loginInfo.password,
      });

      console.log("Login successful:", response);

      // Handle successful login - adjust based on your API response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("auth_token", response.data.accessToken);
        localStorage.setItem(
          "user_data",
          JSON.stringify(response.data.userData)
        );
        navigate("/");
      } else {
        setError("No authentication token received");
      }
    } catch (err) {
      // Handle API errors
      setError(err.message || "Login failed. Please check your credentials.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar bgColor={false} />
      <div className="">
        <div className="flex flex-col h-screen justify-center items-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-lg">Login with email</p>

          <form
            onSubmit={handleSubmit}
            className="pt-8 flex flex-col max-w-[600px] gap-2"
          >
            <input
              type="email"
              value={loginInfo.email}
              required
              onChange={(e) =>
                setLoginInfo((s) => ({
                  ...s,
                  email: e.target.value,
                }))
              }
              placeholder="Email"
              className="w-[400px] outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-[#A9ABBD] py-4 px-2"
              disabled={isLoading}
            />
            <input
              type="password"
              value={loginInfo.password}
              required
              onChange={(e) =>
                setLoginInfo((s) => ({
                  ...s,
                  password: e.target.value,
                }))
              }
              placeholder="Password"
              className="w-[400px] outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-[#A9ABBD] py-4 px-2"
              disabled={isLoading}
            />

            {/* Error Message */}
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            <div className="justify-between flex items-center">
              <div className="flex gap-2 mt-4">
                <input
                  className="accent-black"
                  type="checkbox"
                  checked={loginInfo.rememberMe}
                  onChange={(e) =>
                    setLoginInfo((s) => ({
                      ...s,
                      rememberMe: e.target.checked,
                    }))
                  }
                  id="remember"
                  disabled={isLoading}
                />
                <label
                  className="text-[14px] text-[#A9ABBD]"
                  htmlFor="remember"
                >
                  Remember Me
                </label>
              </div>
              <p className="text-[14px] text-[#A9ABBD] cursor-pointer hover:text-black">
                Forgot password?
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-[400px] bg-black text-white py-3 px-4 rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-[14px] font-normal mt-4 text-[#A9ABBD]">
            or{" "}
            <span
              className="font-bold cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              create an account{" "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
