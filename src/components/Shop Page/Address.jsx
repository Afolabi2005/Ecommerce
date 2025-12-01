import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Home Page/Navbar";
import { toast } from "react-toastify";

const Address = () => {
  const navigate = useNavigate();
  const [cart, setCart] = React.useState([]);
  React.useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    setCart(savedCart ? JSON.parse(savedCart) : []);
  }, []);

  const [shippingInfo, setShippingInfo] = React.useState({
    firstName: "",
    lastName: "",
    address: "",
    landmark: "",
    city: "",
    country: "",
    state: "",
    zipCode: "",
  });

  const handleAdress = (e) => {
    e.preventDefault();
    if (
      !shippingInfo.firstName ||
      !shippingInfo.lastName ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.landmark ||
      !shippingInfo.country ||
      !shippingInfo.state ||
      !shippingInfo.zipCode
    ) {
      toast.warn("Please fill all the fields", { position: "top-right" });
      return;
    }
    navigate("/shipping");
  };

  const removeItem = (id, size) => {
    const updatedCart = cart.filter(
      (item) => !(item.id === id && item.size === size)
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (id, size, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map((item) =>
      item.id === id && item.size === size
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cart.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <div>
      <Navbar bgColor={false} cart={cart} setCart={setCart} />
      <div className="px-8 md:px-20 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex text-[17px] cursor-pointer relative max-w-[400px] gap-10">
              <span onClick={() => navigate('/address')} className="bg-white z-5 px-2 font-bold">Address</span>
              <span onClick={() => navigate('/shipping')} className="bg-white z-5 px-2">Shipping</span>
              <span onClick={() => navigate('/checkout')} className="bg-white z-5 px-2">Payment</span>
              <hr className="w-[70%] absolute top-3.5" />
            </div>
            <form onSubmit={handleAdress}>
              <div className="pt-8 flex flex-col max-w-[400px] gap-2">
                <div className="flex flex-row gap-2">
                  <input
                    type="text"
                    value={shippingInfo.firstName}
                    required
                    onChange={(e) =>
                      setShippingInfo((s) => ({
                        ...s,
                        firstName: e.target.value,
                      }))
                    }
                    placeholder="Enter First Name"
                    className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-[#A9ABBD] py-4 px-2"
                  />
                  <input
                    type="text"
                    required
                    value={shippingInfo.lastName}
                    onChange={(e) =>
                      setShippingInfo((s) => ({
                        ...s,
                        lastName: e.target.value,
                      }))
                    }
                    placeholder="Enter Last Name"
                    className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-[#A9ABBD] py-4 px-2"
                  />
                </div>
                <input
                  type="text"
                  value={shippingInfo.address}
                  required
                  onChange={(e) =>
                    setShippingInfo((s) => ({
                      ...s,
                      address: e.target.value,
                    }))
                  }
                  placeholder="Address"
                  className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-[#A9ABBD] py-4 px-2"
                />
                <input
                  type="text"
                  value={shippingInfo.landmark}
                  required
                  onChange={(e) =>
                    setShippingInfo((s) => ({
                      ...s,
                      landmark: e.target.value,
                    }))
                  }
                  placeholder="Apartment, suite, etc (optional)"
                  className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-[#A9ABBD] py-4 px-2"
                />
                <input
                  type="text"
                  value={shippingInfo.city}
                  required
                  onChange={(e) =>
                    setShippingInfo((s) => ({
                      ...s,
                      city: e.target.value,
                    }))
                  }
                  placeholder="City"
                  className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-[#A9ABBD] py-4 px-2"
                />
                <div className="flex justify-between gap-2">
                  <div className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-[#A9ABBD]">
                    <select
                      value={shippingInfo.country}
                      onChange={(e) =>
                        setShippingInfo((s) => ({
                          ...s,
                          country: e.target.value,
                        }))
                      }
                      className="py-3 px-2 outline-none text-[14px] font-normal"
                      name="phone"
                      id="phone"
                    >
                      <option value="" disabled selected>
                        Country
                      </option>
                      <option value="234">+234</option>
                      <option value="1"> +1</option>
                      <option value="20">+20</option>
                      <option value="27">+27</option>
                    </select>
                  </div>
                  <div className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-[#A9ABBD]">
                    <select
                      value={shippingInfo.city}
                      onChange={(e) =>
                        setShippingInfo((s) => ({
                          ...s,
                          city: e.target.value,
                        }))
                      }
                      className="py-3 px-2 outline-none text-[14px] font-normal"
                      name="phone"
                      id="phone"
                    >
                      <option value="" disabled selected>
                        City
                      </option>
                      <option value="234">+234</option>
                      <option value="1"> +1</option>
                      <option value="20">+20</option>
                      <option value="27">+27</option>
                    </select>
                  </div>
                  <input
                    type="tel"
                    value={shippingInfo.zipCode}
                    required
                    onChange={(e) =>
                      setShippingInfo((s) => ({
                        ...s,
                        zipCode: e.target.value,
                      }))
                    }
                    placeholder="Zipcode"
                    className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-[#A9ABBD] py-4 px-2"
                  />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Optional"
                  className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-[#A9ABBD] py-4 px-2"
                />{" "}
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
                    Save contact information
                  </label>
                </div>
                <button type="submit"
                  className="w-full bg-black text-white py-3 font-semibold hover:bg-gray-800"
                >
                  Continue to shipping
                </button>
              </div>
            </form>
          </div>

          <div className="md:col-span-1 max-w-[600px] ">
            <h2 className="text-[20px] mb-4">Your cart</h2>
            <div className="pb-4 mb-4">
              {cart.map((item, idx) => (
                <div
                  key={`${item.id}-${item.size}-${idx}`}
                  className="flex gap-4 py-4 border-b"
                >
                  <div className="w-[150px] h-[150px] bg-[#c4c4c4]"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-gray-600">Size: {item.size}</p>
                    <p className="text-lg font-semibold mt-2">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex gap-3 mt-3 items-center">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity - 1)
                        }
                        className="border px-2 py-1"
                      >
                        −
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.size, item.quantity + 1)
                        }
                        className="border px-2 py-1"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id, item.size)}
                      className="text-red-600 text-sm mt-2 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <input
              type="text"
              placeholder="Enter coupon code here"
              className="indent-4 py-2 border mb-4 w-full"
            />
            <div className="flex text-[14px] justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex text-[14px] justify-between mb-4 border-b pb-4">
              <span>Shipping</span>
              <span className="text-[14px]">Calculated at the next step</span>
            </div>
            <div className="flex text-[14px] justify-between text-lg mb-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
