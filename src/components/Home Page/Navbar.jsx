import React from "react";
import Cart from "../../assets/shopping-bag.svg";
import CartBlack from "../../assets/ShoppingbagBlack.svg";
import search from "../../assets/Search.svg";
import searchBlack from "../../assets/SearchBlack.svg";
import MenuIcon from "../../assets/Menu.svg";
import CloseIcon from "../../assets/Delete.svg";
import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ bgColor = true, cart, setCart }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (setCart) {
      setCart(savedCart ? JSON.parse(savedCart) : []);
    }

    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }, [setCart]);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-Api-Key": import.meta.env.VITE_API_KEY,
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  function handleSearch(e) {
    if (e.key === "Enter") {
      navigate(`/search/${searchQuery}`);
    }
  }

  const NavLink = [
    { id: 1, name: "Shop", path: "/shop" },
    { id: 2, name: "Stories", path: "/stories" },
    { id: 3, name: "About", path: "/about" },
  ];
  function handleNavigate(path) {
    navigate(path);
  }
  const cartCount = Array.isArray(cart)
    ? cart.reduce((sum, item) => sum + (item.quantity || 1), 0)
    : 0;

  return (
    <>
      <div
        className="inter py-4 border-b-[0.5px] cursor-pointer"
        style={{
          backgroundColor: bgColor ? "white" : "black",
          color: bgColor ? "black" : "white",
          borderColor: bgColor ? "black" : "white",
        }}
      >
        <nav className="flex px-2 md:px-16 flex-row justify-between items-center">
          <div className="flex flex-row gap-8">
            <Link to={"/"}>
              <h1 className="text-[20px] -mt-1 font-bold">Ecommerce</h1>
            </Link>
            <ul className="md:flex hidden flex-row gap-6 text-[17px] cursor-pointer">
              {NavLink.map((item) => (
                <li key={item.id} onClick={() => handleNavigate(item.path)}>
                  {item.name}
                </li>
              ))}
            </ul>
            {bgColor === true ? (
              <img src={search} alt="" />
            ) : (
              <img src={searchBlack} alt="" />
            )}
            <input
              onKeyDown={handleSearch}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="search"
              placeholder="Search"
              className="placeholder:text-[17px] text-[14px] outline-none indent-4 -ml-4 text-[#979797]"
            />
          </div>
          <div className="md:flex hidden flex-row gap-6">
            {bgColor === true ? (
              <div className="relative">
                <img src={Cart} className="" alt="cart" />
                <span
                  onClick={() => navigate("/cart")}
                  className="absolute -top-1 left-6 text-[14px] cursor-pointer text-amber-600"
                >
                  {cartCount > 0 && cartCount}
                </span>
              </div>
            ) : (
              <div className="relative">
                <img src={CartBlack} className="" alt="cart" />
                <span
                  onClick={() => navigate("/cart")}
                  className="absolute -top-1 left-6 text-[14px] cursor-pointer text-amber-600"
                >
                  {cartCount > 0 && cartCount}
                </span>
              </div>
            )}
            {isLoggedIn ? (
              <p className="text-[17px]" onClick={handleLogout}>
                Logout
              </p>
            ) : (
              <p className="text-[17px]" onClick={() => navigate("/login")}>
                Login
              </p>
            )}
          </div>
          <div className="md:hidden">
            <button
              type="button"
              aria-expanded={open}
              aria-label="Toggle menu"
              onClick={() => setOpen((prev) => !prev)}
            >
              {open === false ? (
                <img src={MenuIcon} alt="Menu" />
              ) : (
                <img src={CloseIcon} alt="Close" />
              )}
              {open && (
                <div className="absolute right-0 mt-2 py-4 w-[150px] bg-white border border-black">
                  <ul className="flex flex-col gap-4 text-[17px] cursor-pointer">
                    {NavLink.map((item) => (
                      <li
                        className="text-left ml-4"
                        key={item.id}
                        onClick={() => handleNavigate(item.path)}
                      >
                        {item.name}
                      </li>
                    ))}
                    <div className="flex flex-col gap-6">
                      {bgColor === true ? (
                        <img src={Cart} className="w-[25px] ml-4 " alt="cart" />
                      ) : (
                        <img src={CartBlack} alt="cart" />
                      )}
                      {isLoggedIn ? (
                        <p className="text-[17px]" onClick={handleLogout}>
                          Logout
                        </p>
                      ) : (
                        <p
                          className="text-[17px]"
                          onClick={() => navigate("/login")}
                        >
                          Login
                        </p>
                      )}
                    </div>
                  </ul>
                </div>
              )}
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
