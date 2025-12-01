import React from "react";
import { useNavigate } from "react-router-dom";
import Paypal from '../../assets/PayPal.svg'
import ApplePay from '../../assets/apple-pay.svg'
import Navbar from "../Home Page/Navbar";
import { toast } from "react-toastify";

const Payment = () => {
  const navigate = useNavigate();
  const [cart, setCart] = React.useState([]);
  React.useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    setCart(savedCart ? JSON.parse(savedCart) : []);
  }, []);

  const [shippingInfo, setShippingInfo] = React.useState({
    cardName: "",
    cardNumber: "",
    month: "",
    year: "",
    cvc: "",
  });

  const handleAdress = (e) => {
    e.preventDefault();
    if (
      !shippingInfo.cardName ||
      !shippingInfo.cardNumber ||
      !shippingInfo.month ||
      !shippingInfo.year ||
      !shippingInfo.cvc
    ) {
      toast.warn("Please fill all the fields", { position: "top-right" });
      return;
    }
    navigate("/");
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
              <span onClick={() => navigate('/address')} className="bg-white z-5 px-2">Address</span>
              <span onClick={() => navigate('/shipping')} className="bg-white z-5 px-2">Shipping</span>
              <span onClick={() => navigate('/checkout')} className="bg-white z-5 px-2 font-bold">Payment</span>
              <hr className="w-[70%] absolute top-3.5" />
            </div>
            <div className="flex gap-2 py-8">
                <div className="py-2 px-8 border border-[#1D4D90]">
                    <img src={Paypal} alt="" />
                </div>
                <div className="py-2 px-12 border bg-black">
                    <img src={ApplePay} alt="" />
                </div>
            </div>
            <form onSubmit={handleAdress}>
              <div className="pt-8 flex flex-col max-w-[400px] gap-2">
                <h2 className="text-[20px] mb-4">Payment Details</h2>
                <input
                  type="text"
                  value={shippingInfo.cardName}
                  required
                  onChange={(e) =>
                    setShippingInfo((s) => ({
                      ...s,
                      cardName: e.target.value,
                    }))
                  }
                  placeholder="Cardholder Name"
                  className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-[#A9ABBD] py-4 px-2"
                />
                <input
                  type="tel"
                  value={shippingInfo.cardNumber}
                  required
                  onChange={(e) =>
                    setShippingInfo((s) => ({
                      ...s,
                      cardNumber: e.target.value,
                    }))
                  }
                  placeholder="Card Number"
                  className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-[#A9ABBD] py-4 px-2"
                />
                <div className="flex justify-between gap-2">
                  <div className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-[#A9ABBD]">
                    <select
                      value={shippingInfo.month}
                      onChange={(e) =>
                        setShippingInfo((s) => ({
                          ...s,
                          month: e.target.value,
                        }))
                      }
                      className="py-3 px-2 outline-none text-[14px] font-normal"
                      name="month"
                      id="month"
                    >
                      <option value="" disabled selected>
                        Month
                      </option>
                      <option value="Jan">1</option>
                      <option value="Feb">2</option>
                      <option value="Mar">3</option>
                      <option value="Apr">4</option>
                    </select>
                  </div>
                  <div className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-[#A9ABBD]">
                    <select
                      value={shippingInfo.year}
                      onChange={(e) =>
                        setShippingInfo((s) => ({
                          ...s,
                          year: e.target.value,
                        }))
                      }
                      className="py-3 px-2 outline-none text-[14px] font-normal"
                      name="year"
                      id="year"
                    >
                      <option value="" disabled selected>
                        Year
                      </option>
                      <option value="1">2025</option>
                      <option value="2"> 2026</option>
                      <option value="3">2027</option>
                      <option value="4">2028</option>
                    </select>
                  </div>
                  <input
                    type="number"
                    value={shippingInfo.cvc}
                    required
                    onChange={(e) =>
                      setShippingInfo((s) => ({
                        ...s,
                        cvc: e.target.value,
                      }))
                    }
                    placeholder="CVC"
                    className="w-full outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-[#A9ABBD] py-4 px-2"
                  />
                </div>

                <div className="flex justify-between mt-4">
                  <label className="text-[14px] text-blaxk" htmlFor="remember">
                    {" "}
                    Save card data for future payments
                  </label>
                  <input
                    className="accent-black"
                    type="checkbox"
                    name="remember"
                    id="remember"
                  />
                </div>
                <button
                  type="submit"
                  onClick={() => navigate("/shipping")}
                  className="w-full bg-black text-white py-3 font-semibold hover:bg-gray-800"
                >
                  Pay with card
                </button>
              </div>
            </form>
          </div>

          <div className="md:col-span-1 max-w-[600px] p-10">
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

export default Payment;
