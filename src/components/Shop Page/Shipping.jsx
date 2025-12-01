import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Home Page/Navbar";
import { toast } from "react-toastify";

const Shipping = () => {
  const navigate = useNavigate();
  const [cart, setCart] = React.useState([]);
  React.useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    setCart(savedCart ? JSON.parse(savedCart) : []);
  }, []);

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
    <div className="bg-[#f5f5f5]">
      <Navbar bgColor={false} cart={cart} setCart={setCart} />
      <div className="px-8 md:px-20 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex text-[17px] cursor-pointer relative max-w-[400px] gap-10">
              <span onClick={() => navigate('/address')} className="bg-[#f5f5f5] z-5 px-2">Address</span>
              <span onClick={() => navigate('/shipping')} className="bg-[#f5f5f5] z-5 px-2 font-bold">Shipping</span>
              <span onClick={() => navigate('/checkout')} className="bg-[#f5f5f5] z-5 px-2">Payment</span>
              <hr className="w-[70%] absolute top-3.5" />
            </div>
            <div className="flex flex-col gap-4 py-14">
              <div className="bg-white p-4 border">
                <div className="flex gap-4">
                  <input required type="checkbox" name="surePost" id="surePost" />
                  <label htmlFor="surePost" className="text-[16px] font-bold">
                    UPS/USPS Surepost{" "}
                  </label>
                </div>
                <p className="text-[16px] font-normal ml-8">4-7 Business Days</p>
              </div>
              <div className="bg-white p-4 border">
                <div className="flex gap-4">
                  <input required type="checkbox" name="surePost" id="surePost" />
                  <label htmlFor="surePost" className="text-[16px] font-bold">
                    UPS Ground Shipping {" "}
                  </label>
                </div>
                <p className="text-[16px] ml-8 font-normal">3-5 Business Days</p>
              </div>
            </div>
            <button type="submit"
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-black text-white py-3 font-semibold hover:bg-gray-800"
                >
                  Continue to payment
                </button>
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

export default Shipping;
