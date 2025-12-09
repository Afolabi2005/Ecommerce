import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../Home Page/Navbar";
import Footer from "../Home Page/Footer";
import axiosPublic from "../../api/AxiosPublic";

const Shop_Home = () => {
  const [active, setActive] = useState("all");
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState("popular");

  const ProductColor = [
    {
      color: "#DF9167",
      id: 1,
    },
    {
      color: "#7B61FF",
      id: 2,
    },
    {
      color: "#219653",
      id: 3,
    },
    {
      color: "#2F80ED",
      id: 4,
    },
    {
      color: "#EB5757",
      id: 5,
    },
    {
      color: "#56CCF2",
      id: 6,
    },
    {
      color: "#4F4F4F",
      id: 7,
    },
    {
      color: "#BB6BD9",
      id: 8,
    },
    {
      color: "white",
      id: 9,
    },
    {
      color: "#6FCF97",
      id: 10,
    },
  ];

  const categories = [
    "Jackets",
    "Fleece",
    "Sweatshirts & Hoodies",
    "Sweaters",
    "Shirts",
    "T-Shirts",
    "Pants & Jeans",
  ];

  const categoryMap = {
    "T-Shirts": 1,
    Jackets: 2,
    Fleece: 3,
    "Sweatshirts & Hoodies": 4,
    Sweaters: 5,
    Shirts: 6,
    "Pants & Jeans": 7,
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery().get("search");

  function handleCategories(category) {
    setCheckedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  }

  function handleClearFilters() {
    setCheckedCategories([]);
    setActive("all");
  }

  const FilteredList = products.filter((item) => {
    const matchesCategory =
      checkedCategories.length === 0 ||
      checkedCategories.some((cat) => categoryMap[cat] === item.category);

    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const SortedList = [...FilteredList].sort((a, b) => {
    if (sortBy === "price") {
      return parseFloat(b.price) - parseFloat(a.price);
    }
    if (sortBy === "priceDown") {
      return parseFloat(a.price) - parseFloat(b.price);
    }
    if (sortBy === "rating") {
      return (b.rating || 0) - (a.rating || 0);
    }
    return 0;
  });

  async function fetchProducts(pageIndex = 0, searchTerm = "") {
    try {
      setLoading(true);
      const response = await axiosPublic.get(
        `/products/?limit=20&offset=${pageIndex * 20}&search=${searchTerm}`
      );

      const newProducts = response.data.results || [];
      setProducts((prev) => [...prev, ...newProducts]);

      console.log("Fetched products:", newProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }
  console.log(products.map((p) => p.category));

  useEffect(() => {
    setProducts([]);
    setPage(0);
    fetchProducts(0, query || "");
  }, [query]);

  function handleLoadMore() {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage);
  }

  return (
    <>
      <Navbar bgColor={false} />
      <div className="public-sans">
        <div className="px-20 py-10 bg-black text-white">
          <p className="text-[36px] font-semibold tracking-[-3%]">Shop Men's</p>
          <p className="text-[18px] font-normal max-w-[480px] tracking-[-0.3px]">
            Revamp your style with the latest designer trends in men’s clothing
            or achieve a perfectly curated wardrobe thanks to our line-up of
            timeless pieces.{" "}
          </p>
        </div>
        <div className="public-sans grid grid-rows-1 md:grid-cols-[200px_auto] gap-4 px-10 md:px-20 py-10">
          <div className="public-sans w-[400px]">
            <h1 className="text-[22px] font-semibold">
              Filters
              <span
                onClick={handleClearFilters}
                className="ml-4 text-[#c4c4c4] font-normal underline text-[14px] cursor-default"
              >
                Clear filters
              </span>
            </h1>
            <p className="text-[14px] font-bold mt-4">Categories</p>
            <div className="tracking-[-0.4px]">
              {categories.map((cat, i) => {
                const id = `box-${i}`;
                return (
                  <div key={id}>
                    <input
                      type="checkbox"
                      name={id}
                      id={id}
                      checked={checkedCategories.includes(cat)}
                      onChange={() => handleCategories(cat)}
                      className="accent-black cursor-pointer"
                    />
                    <label htmlFor={id} className="text-[13px] ml-2">
                      {cat}
                    </label>
                  </div>
                );
              })}
            </div>
            <div className="max-w-[150px] py-4 gap-x-4 gap-y-2 grid grid-cols-5">
              {ProductColor.map((item, index) => (
                <div
                  key={`color-${item.id}`}
                  className="w-[25px] h-[25px] rounded-full border"
                  style={{
                    backgroundColor: `${item.color}`,
                  }}
                ></div>
              ))}
            </div>
          </div>

          {/* My product Grid */}
          <div className="">
            <div className="flex flex-col justify-start md:justify-end md:items-end pb-4 md:px-6">
              <div className="flex justify-center gap-2 border max-w-40 px-4 py-2">
                <p className="text-[13px] text-[#00000070]">Sort By</p>
                <select
                  className="text-[14px] font-bold outline-none cursor-pointer"
                  name="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  id="sort"
                >
                  <option value="popular">Popular</option>
                  <option value="price">Price &uarr; </option>
                  <option value="priceDown">Price &darr; </option>
                  <option value="rating">Rating</option>
                </select>
              </div>
              <p className="tracking-[-0.4px] public-sans text-[14px] mt-2">
                {`Showing ${SortedList.length} Products`}
              </p>
            </div>
            {SortedList.length > 0 ? (
              <div className="grid md:grid-cols-3 items-center gap-4">
                {SortedList.map((item, index) => (
                  <div
                    key={`product-${item.id}-${index}`}
                    className="cursor-pointer"
                    onClick={() => navigate(`/products/${item.id}`)}
                  >
                    <div className="h-[264px] w-[264px] bg-[#c4c4c4] border-none">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-[264px] w-[264px] object-cover"
                      />
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                      <p className="text-[14px] font-semibold">{item.name}</p>
                      <p className="text-[14px] font-semibold">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center p-12">
                <p className="text-[18px] text-black">
                  No products match your filters!
                </p>
              </div>
            )}

            <div className="flex justify-center py-10">
              <button
                onClick={handleLoadMore}
                className="px-16 items-center bg-white text-black hover:bg-black hover:text-white border py-2"
              >
                {loading ? "Loading..." : "Load more products"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop_Home;
