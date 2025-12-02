import React from "react";
import Navbar from "./Navbar";

const Login = () => {
  const [LoginInfo, setLoginInfo] = React.useState({
    email: "",
    password: "",
  });
  return (
    <div>
      <Navbar bgColor={false} />
      <div className="">
        <div className="flex flex-col h-screen justify-center items-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-lg">Login with email</p>
          <div className="pt-8 flex flex-col max-w-[600px] gap-2">
            <input
              type="text"
              value={LoginInfo.email}
              required
              onChange={(e) =>
                setLoginInfo((s) => ({
                  ...s,
                  email: e.target.value,
                }))
              }
              placeholder="Email"
              className="w-[400px] outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-[#A9ABBD] py-4 px-2"
            />
            <input
              type="tel"
              value={LoginInfo.password}
              required
              onChange={(e) =>
                setLoginInfo((s) => ({
                  ...s,
                  password: e.target.value,
                }))
              }
              placeholder="password"
              className="w-[400px] outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-[#A9ABBD] py-4 px-2"
            />
            <div className="justify-between flex items-center">
              <div className="flex gap-2 mt-4">
                <input
                  className="accent-black"
                  type="checkbox"
                  name="remember"
                  id="remember"
                />
                <label
                  className="text-[14px] text-[#A9ABBD]"
                  htmlFor="remember"
                >
                  {" "}
                  Remember Me
                </label>
              </div>
              <p className="text-[14px] text-[#A9ABBD]">forgot password?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
