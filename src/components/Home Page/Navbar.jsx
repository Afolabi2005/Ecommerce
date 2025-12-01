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

  React.useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (setCart) {
      setCart(savedCart ? JSON.parse(savedCart) : []);
    }
  }, []);


  const NavLink = [
    { id: 1, name: "Shop", path: "/shop" },
    { id: 2, name: "Stories" },
    { id: 3, name: "About" },
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
            <p className="text-[17px] -ml-4 text-[#979797]">Search</p>
          </div>
          <div className="md:flex hidden flex-row gap-6">
            {bgColor === true ? (
              <div className="relative">
                <img src={Cart} className="" alt="cart" />
                <span onClick={() =>navigate('/cart')} className="absolute -top-1 left-6 text-[14px] cursor-pointer text-amber-600">
                  {cartCount > 0 && cartCount}
                </span>
              </div>
            ) : (
              <div className="relative">
                <img src={CartBlack} className="" alt="cart" />
                <span onClick={() =>navigate('/cart')} className="absolute -top-1 left-6 text-[14px] cursor-pointer text-amber-600">
                  {cartCount > 0 && cartCount}
                </span>
              </div>
            )}
            <p className="text-[17px]">Login</p>
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
                      <p className="text-[17px] text-left ml-4">Login</p>
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
