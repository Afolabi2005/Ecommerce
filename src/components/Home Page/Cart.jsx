import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = React.useState([]);
  const [open, setOpen] = React.useState(false);

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
    <div className="public-sans">
      <Navbar bgColor={true} cart={cart} setCart={setCart} />

      <div className="px-8 md:px-20 py-10">
        <h1 className="text-[32px] font-bold mb-4 md:tracking-[-1.5px]">
          Your cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[18px] text-gray-600 mb-4">Your cart is empty</p>
            <button
              onClick={() => navigate("/shop")}
              className="px-6 py-2 bg-black text-white"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-1">
              <div className="pb-4 mb-4">
                {cart.map((item, idx) => (
                  <div
                    key={`${item.id}-${item.size}-${idx}`}
                    className="flex gap-4 py-4 border-b"
                  >
                    <div className="w-[150px] h-[150px] bg-[#c4c4c4]">
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-600">Size: {item.size}</p>
                      <p className="text-lg font-semibold mt-2">
                        ${item.price.toFixed(2)}
                      </p>
                      <div className="flex gap-3 mt-3 items-center">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="border px-2 py-1"
                        >
                          −
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              item.quantity + 1
                            )
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
                <div>
                  <div className="border-b py-3">
                    <h2 className="text-[22px] font-bold pt-8">
                      Order Information
                    </h2>
                  </div>
                  <div className="text-[16px] text-[#909090] md:tracking-[-0.4px] public-sans flex flex-col gap-2 pt-4">
                    <div className="flex justify-between border-b">
                      <span>Return Policy</span>
                      <span>+</span>
                    </div>
                    <div className="flex justify-between border-b">
                      <span>Shipping</span>
                      <span>+</span>
                    </div>
                    <div className="flex justify-between border-b">
                      <span>Total</span>
                      <span>+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="p-6 h-fit">
              <h2 className="text-[22px] font-bold mb-4">Order Summary</h2>
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
              <button
                onClick={() => navigate("/address")}
                className="w-full bg-black text-white py-3 font-semibold hover:bg-gray-800"
              >
                Continue to checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
