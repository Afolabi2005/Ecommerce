import React, { useEffect, useState } from "react";
import Navbar from "../Home Page/Navbar";
import AddIcon from "../../assets/Addproduct.png";
import AddIconBlack from "../../assets/Addproduct-white.png";
import ordericon from "../../assets/orderwhite.png";
import ordericonblack from "../../assets/orderblack.png";
import editIconWhite from "../../assets/ManageWhite.png";
import editIconBlack from "../../assets/ManageBlack.png";
import axiosInstance from "../../api/Axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [active, setActive] = React.useState("Add a product");
  const handleActive = (e) => {
    setActive(e.name);
  };
  const VendorMenu = [
    { name: "Add a product", icon: AddIcon, active: AddIconBlack },
    { name: "Manage products", icon: ordericonblack, active: ordericon },
    { name: "View History", icon: editIconBlack, active: editIconWhite },
  ];
  const [isLoading, setIsLoading] = React.useState(false);

  const [AddProduct, setAddProduct] = React.useState({
    name: "",
    description: "",
    price: "",
    category: "",
    product_sizes: [{ size: "", height: "" }],
    image: null,
    product_colors: [{ color: "", quantity: "" }],
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (AddProduct.image) {
      const url = URL.createObjectURL(AddProduct.image);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [AddProduct.image]);

  function handleSizeChange(index, field, value) {
    setAddProduct((s) => {
      const updatedSizes = [...s.product_sizes];
      updatedSizes[index] = {
        ...updatedSizes[index],
        [field]: value,
      };
      return { ...s, product_sizes: updatedSizes };
    });
  }

  function handleAddSize() {
    setAddProduct((s) => ({
      ...s,
      product_sizes: [...s.product_sizes, { size: "", height: "" }],
    }));
  }

  function handleColorChange(index, field, value) {
    setAddProduct((s) => {
      const updatedColors = [...s.product_colors];
      updatedColors[index] = {
        ...updatedColors[index],
        [field]: value,
      };
      return { ...s, product_colors: updatedColors };
    });
  }

  function handleAddColor() {
    setAddProduct((s) => ({
      ...s,
      product_colors: [...s.product_colors, { color: "", quantity: "" }],
    }));
  }

  function handleDiscard() {
    setAddProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      product_sizes: [{ size: "", height: "" }],
      image: null,
      product_colors: [{ color: "", quantity: "" }],
    });
  }
  async function handleAddProduct(e) {
    e.preventDefault();

    if (isLoading) return;

    const errors = [];
    if (!AddProduct.name || !AddProduct.name.trim()) errors.push("Name is required");
    if (/\d/.test(AddProduct.name)) errors.push("Name must not contain numbers");
    if (
      !AddProduct.price ||
      isNaN(parseFloat(AddProduct.price)) ||
      parseFloat(AddProduct.price) <= 0 ||
      /[A-Za-z]/.test(String(AddProduct.price))
    )
      errors.push("Price must be a positive number");
    if (!AddProduct.category || isNaN(parseInt(AddProduct.category, 10)))
      errors.push("Category is required");
    if (!AddProduct.image) errors.push("Image is required");
    if (AddProduct.image && !AddProduct.image.type.startsWith("image/"))
      errors.push("Image must be an image file (png, jpg, ...)");
    if (AddProduct.image && AddProduct.image.size > 5 * 1024 * 1024)
      errors.push("Image must be smaller than 5MB");

    const validSizes = AddProduct.product_sizes.filter(
      (s) => (s.size || "").trim() !== ""
    );
    if (validSizes.length === 0) {
      errors.push("At least one Size is required");
    } else {
      if (validSizes.some((s) => /\d/.test(s.size)))
        errors.push("Size names must not contain numbers");
      if (validSizes.some((s) => s.height && isNaN(parseFloat(s.height))))
        errors.push("Size heights must be numeric when provided");
    }

    const validColors = AddProduct.product_colors.filter(
      (c) => (c.color || "").trim() !== ""
    );
    if (validColors.length === 0) {
      errors.push("At least one Color is required");
    } else {
      if (validColors.some((c) => /\d/.test(c.color)))
        errors.push("Color names must not contain numbers");
      const invalidColorQty = validColors.some(
        (c) => c.quantity !== "" && (isNaN(Number(c.quantity)) || Number(c.quantity) < 0)
      );
      if (invalidColorQty) errors.push("Color quantities must be non-negative numbers");
      const totalQty = validColors.reduce((sum, c) => sum + (parseInt(c.quantity, 10) || 0), 0);
      if (totalQty <= 0) errors.push("At least one color must have a quantity greater than 0");
    }

    if (errors.length) {
      alert(errors.join("; "));
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    if (AddProduct.image) {
      formData.append("image", AddProduct.image, AddProduct.image.name);
    }

    const sizesDictionary = AddProduct.product_sizes
      .filter((s) => s.size.trim() !== "")
      .reduce((acc, current) => {
        if (current.size) {
          acc[current.size] = {
            height: current.height || "",
          };
        }
        return acc;
      }, {});

    const colorsDictionary = AddProduct.product_colors
      .filter((c) => c.color.trim() !== "")
      .reduce((acc, current) => {
        if (current.color) {
          acc[current.color] = {
            quantity: parseInt(current.quantity, 10) || 0,
          };
        }
        return acc;
      }, {});

    const totalStock = AddProduct.product_colors.reduce(
      (sum, c) => sum + (parseInt(c.quantity, 10) || 0),
      0
    );

    // Build FormData using PHP-style nested keys as the backend expects
    formData.append("requestType", "inbound");
    formData.append("data[name]", AddProduct.name);
    formData.append("data[description]", AddProduct.description || "");
    formData.append("data[price]", AddProduct.price);
    formData.append("data[category]", parseInt(AddProduct.category, 10) || 0);
    // attach the image file under data[image]
    if (AddProduct.image) {
      formData.append("data[image]", AddProduct.image, AddProduct.image.name);
    }

    // include total stock as data[stock]
    formData.append("data[stock]", totalStock);

    // sizes -> data[product_sizes][SIZE][height]
    const sizesToAppend = AddProduct.product_sizes.filter((s) => (s.size || "").trim() !== "");
    sizesToAppend.forEach((s) => {
      formData.append(`data[product_sizes][${s.size}][height]`, s.height || "");
    });

    // colors -> data[product_colors][COLOR] = quantity
    const colorsToAppend = AddProduct.product_colors.filter((c) => (c.color || "").trim() !== "");
    colorsToAppend.forEach((c) => {
      formData.append(`data[product_colors][${c.color}]`, String(parseInt(c.quantity, 10) || 0));
    });

    // Debug: print formData entries so we can inspect what the server receives
    for (const [key, value] of formData.entries()) {
      console.log("formData entry:", key, value);
    }

    try {
      // Do not manually set Content-Type for FormData; let the browser set the boundary
      const res = await axiosInstance.post("/vendor-product/", formData);

      if (res.status >= 400) {
        throw new Error(`Failed to add product (status ${res.status})`);
      }

      const data = res.data;
      console.log("Product added:", data);
      alert("Product successfully added!");
      handleDiscard();
    } catch (err) {
      console.error("Error adding product:", err);
      alert(`Error adding product: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="public-sans">
      <Navbar bgColor={false} />
      <div className="grid grid-cols-[200px_auto] md:grid-cols-[350px_auto] text-white h-screen">
        <div className="bg-black sticky top-0 flex flex-col gap-8 border border-black">
          <div className="py-4">
            <div className="py-4 border-b">
              <h1 className="md:text-[28px] font-sans text-white font-semibold text-center">
                Vendor Dashboard{" "}
                <sup className="text-[14px] font-light">TM30</sup>
              </h1>
            </div>

            {VendorMenu.map((menu, index) => (
              <div
                key={index}
                onClick={() => handleActive(menu)}
                className={`${
                  active === menu.name
                    ? "text-black bg-white md:px-16 px-4 py-4"
                    : "md:px-16 px-4 py-4"
                } cursor-pointer`}
              >
                <ul className="md:text-[20px] flex gap-2 text-[14px]">
                  <img
                    className="h-[25px] w-[25px]"
                    // If active matches this menu name, show the 'active' (white) icon, else show the standard icon
                    src={
                      active === menu.name
                        ? menu.active || menu.icon
                        : menu.icon
                    }
                    alt=""
                  />

                  <li>{menu.name}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
        {active === "Add a product" && (
          <div className="px-16 py-8 text-black">
            <h1 className="text-black text-[28px] font-bold -mb-4">
              Add New Product
            </h1>
            <form onSubmit={handleAddProduct}>
              <div className="grid grid-cols-2 gap-8">
                <div className="pt-8 flex flex-col max-w-[600px] gap-2">
                  <div className="flex flex-col p-4 border rounded-lg border-[#a9abbd49] gap-4">
                    <label htmlFor="productName" className="text-black -mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={AddProduct.name}
                      required
                      name="productName"
                      id="productName"
                      onChange={(e) =>
                        setAddProduct((s) => ({
                          ...s,
                          name: e.target.value.replace(/\d+/g, ""),
                        }))
                      }
                      placeholder="Enter Product Name"
                      className="w-full outline-none rounded-lg h-10 text-[14px] font-normal indent-2 border border-[#A9ABBD] text-black py-4 px-2"
                    />
                    <label htmlFor="description" className="text-black -mb-2">
                      Description
                    </label>
                    <textarea
                      value={AddProduct.description || ""}
                      onChange={(e) =>
                        setAddProduct((s) => ({
                          ...s,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Enter product description or about"
                      className="w-full h-32 outline-none text-[14px] rounded-lg font-normal border border-[#A9ABBD] text-black py-2 px-2 resize-none"
                    />
                  </div>
                  <div className="flex flex-col p-4 border rounded-lg border-[#a9abbd49] gap-4">
                    <label htmlFor="category" className="text-black -mb-2">
                      Product Categories
                    </label>
                    <div className="w-full rounded-lg outline-none h-10 text-[14px] font-normal indent-4 border border-[#A9ABBD] text-black">
                      <select
                        value={AddProduct.category}
                        onChange={(e) =>
                          setAddProduct((s) => ({
                            ...s,
                            category: e.target.value,
                          }))
                        }
                        className="py-3 px-2 flex w-[97%] outline-none text-[14px] font-normal"
                        name="category"
                        id="category"
                        required
                      >
                        <option value="" disabled>
                          Select a Category
                        </option>
                        <option value="234">Jackets</option>
                        <option value="1"> Shirts</option>
                        <option value="20">Pants & Jeans</option>
                        <option value="27">+T-Shirts</option>
                      </select>
                    </div>
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black">
                        $
                      </span>

                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={AddProduct.price || ""}
                        onChange={(e) =>
                          setAddProduct((s) => ({
                            ...s,
                            price: e.target.value.replace(/[^0-9.]/g, ""),
                          }))
                        }
                        placeholder="Enter price"
                        required
                        className="w-full rounded-lg h-10 text-[14px] font-normal border border-[#A9ABBD] text-black py-2 pl-8 pr-2 outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="pt-8 flex flex-col max-w-[600px] gap-2">
                  <div className="flex flex-col p-4 border rounded-lg border-[#a9abbd49] gap-4">
                    <div className="flex flex-col gap-4">
                      {previewUrl && (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="mt-4 w-40 h-40 object-cover"
                        />
                      )}

                      <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        required
                        onChange={(e) =>
                          setAddProduct((s) => ({
                            ...s,
                            image: e.target.files[0],
                          }))
                        }
                        className="hidden"
                      />

                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer bg-black text-white px-4 py-2 rounded-md w-fit"
                      >
                        Upload Image
                      </label>

                      {AddProduct.image && (
                        <p className="text-sm text-black">
                          Selected: <strong>{AddProduct.image.name}</strong>
                        </p>
                      )}
                    </div>
                    <div>
                      <div className="flex flex-row justify-between">
                        <label className="text-black mb-2">Product Sizes</label>
                        <button
                          type="button"
                          onClick={handleAddSize}
                          className="text-black underline cursor-pointer text-[14px] font-semibold mb-2"
                        >
                          Add Size +
                        </button>
                      </div>

                      {AddProduct.product_sizes.map((item, index) => (
                        <div key={index} className="flex gap-4 mb-2">
                          <input
                            type="text"
                            value={item.size}
                            onChange={(e) =>
                              handleSizeChange(index, "size", e.target.value)
                            }
                            placeholder="Size (e.g., M, L)"
                            className="w-full rounded-lg h-10 text-[14px] font-normal border border-[#A9ABBD] text-black py-2 indent-4 outline-none"
                          />
                          <input
                            type="text"
                            value={item.height}
                            onChange={(e) =>
                              handleSizeChange(index, "height", e.target.value.replace(/[^0-9.]/g, ""))
                            }
                            placeholder="Height (e.g., 5.10)"
                            className="w-full rounded-lg h-10 text-[14px] font-normal border border-[#A9ABBD] text-black py-2 indent-4 outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col p-4 border rounded-lg border-[#a9abbd49] gap-4">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-row justify-between">
                        <label htmlFor="color" className="text-black">
                          Product Colors
                        </label>{" "}
                        <button
                          type="button"
                          onClick={handleAddColor}
                          className="text-black underline cursor-pointer text-[14px] font-semibold"
                        >
                          Add Colors +
                        </button>
                      </div>

                      {AddProduct.product_colors.map((item, index) => (
                        <div key={index} className="flex gap-4 ">
                          <input
                            type="text"
                            value={item.color}
                            onChange={(e) => handleColorChange(index, "color", e.target.value.replace(/\d+/g, ""))}
                            placeholder="Color"
                            className="w-full rounded-lg h-10 text-[14px] font-normal border border-[#A9ABBD] text-black py-2 indent-4 outline-none"
                          />
                          <input
                            type="number"
                            value={item.quantity || ""}
                            onChange={(e) => handleColorChange(index, "quantity", e.target.value.replace(/\D/g, ""))}
                            placeholder="Color Quantity"
                            className="w-full rounded-lg h-10 text-[14px] font-normal border border-[#A9ABBD] text-black py-2 indent-4 outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={handleDiscard}
                      className="py-3 bg-white text-black rounded-lg cursor-pointer px-8 text-[16px] font-semibold border border-black"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`py-3 bg-black text-white rounded-lg px-8 text-[16px] font-semibold border ${
                        isLoading
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      {isLoading ? "Adding Product..." : "Add Product"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {active === "Manage products" && (
          <div className="p-20">
            <div className="flex justify-center">
              <h1 className="text-black">Manage Product</h1>
            </div>
          </div>
        )}

        {active === "View History" && (
          <div className="p-20">
            <div className="flex justify-center">
              <h1 className="text-black">View History</h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
