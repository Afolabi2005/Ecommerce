import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Home Page/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../api/Axios";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = React.useState(1);
  const [cart, setCart] = React.useState([]);
  const [selectedSize, setSelectedSize] = React.useState(null);
  const [products, setProducts] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/products/${id}`);
        setProducts(response.data.data);
        console.log("Fetched product:", response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  React.useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    setCart(savedCart ? JSON.parse(savedCart) : []);
  }, []);

  const productData = products || {
    id: id,
    name: "Product Not Found", // ✅ use name instead of title
    price: "0",
    description: "This product could not be found.",
    image: "",
    product_sizes: { XS: {}, S: {}, M: {}, L: {}, XL: {} }, // ✅ match API shape
  };

  const productSize = Object.keys(productData.product_sizes || {});

  const handleAddToCart = () => {
    const priceString = String(productData.price || "$0");
    const newItem = {
      id: productData.id,
      title: productData.name,
      price: parseFloat(priceString.replace("$", "")),
      quantity,
      size: selectedSize,
      image: productData.image,
      description: productData.description,
    };

    const existingItemIndex = cart.findIndex(
      (item) => item.id === newItem.id && item.size === selectedSize
    );

    let updatedCart;
    if (existingItemIndex >= 0) {
      updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      updatedCart = [...cart, newItem];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success(`${quantity}× ${productData.name} added to cart`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
    });
    setQuantity(1);
  };

  const priceString = String(productData.price || "$0");
  const totalPrice = parseFloat(priceString.replace("$", "")) * quantity;

  if (loading) {
    return (
      <div className="public-sans">
        <Navbar bgColor={false} cart={cart} setCart={setCart} />
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="public-sans">
      <Navbar bgColor={false} cart={cart} setCart={setCart} />
      <ToastContainer />

      <div className="flex justify-center mx-auto pt-20 gap-15 px-8">
        {/* Product Images */}
        <div className="grid grid-cols-2 gap-2 max-w-[554px] max-h-[553px]">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-[180px] h-[180px] bg-[#c4c4c4] flex items-center justify-center"
            >
              {productData.image ? (
                <img
                  src={productData.image}
                  alt={`${productData.title} ${i}`}
                />
              ) : (
                <span className="text-gray-500"></span>
              )}
            </div>
          ))}
        </div>

        {/* Product Details */}
        <div className="flex flex-col max-w-[500px]">
          <h1 className="public-sans text-[36px] font-semibold tracking-[-1.5px]">
            {productData.name}
          </h1>
          <p className="text-[18px] font-semibold mt-2">{productData.price}</p>
          <p className="text-[18px] mt-4 text-gray-700">
            {productData.description}
          </p>

          {/* Size Selection */}
          <p className="text-[18px] mt-6 text-[#00000070] font-medium">Size</p>
          <div className="flex flex-row gap-2 mt-3 flex-wrap">
            {productSize.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`text-[16px] border py-2 px-4 font-semibold transition ${
                  selectedSize === size
                    ? "bg-black text-white border-black"
                    : "bg-white border-black hover:bg-gray-100"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Add to Cart */}
          <div className="mt-8 flex flex-row gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`font-semibold py-2 px-8 text-white ${
                selectedSize
                  ? "bg-black cursor-pointer hover:bg-gray-800"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Add to Cart - ${totalPrice.toFixed(2)}
            </button>

            {/* Quantity Controls */}
            <div className="flex gap-2 px-4 border border-black items-center">
              <button
                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                className="cursor-pointer text-lg"
              >
                −
              </button>
              <span className="px-4 font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="cursor-pointer text-lg"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
