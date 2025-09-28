/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { valideURLConvert } from "../../../../../server/utils/valideURLConvert.js";
import CategoryWiseProductDisplay from "../CategoryWiseProductDisplay/CategoryWiseProductDisplay.jsx";

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductListpage = (id, cat) => {
    console.log(id, cat);
    const subcategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id == id;
      });

      return filterData ? true : null;
    });
    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(
      subcategory.name
    )}-${subcategory._id}`;

    navigate(url);
    console.log(url);
  };
  return (
    <section className="">
      <div className=" mx-auto border flex flex-col items-center justify-center text-center h-full p-6 ">
        <h1 className="text-5xl font-bold text-gray-900">
          Delicious Food, Delivered Fast!
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          Order your favorite meals from your neighbour.
        </p>

        <div className="mt-6 space-x-4">
          <button className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg hover:bg-red-600">
            Order Now
          </button>
          <button className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow-lg text-lg hover:bg-gray-400">
            View Menu
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10  gap-2">
        {loadingCategory
          ? new Array(12).fill(null).map((c, index) => {
              return (
                <div
                  key={index + "loadingcategory"}
                  className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
                >
                  <div className="bg-blue-100 min-h-24 rounded"></div>
                  <div className="bg-blue-100 h-8 rounded"></div>
                </div>
              );
            })
          : categoryData.map((cat, index) => {
              return (
                // <div key={cat._id+"displayCategory"} className='w-full h-full' onClick={()=>handleRedirectProductListpage(cat._id,cat.name)}>
                //   <div>
                //       <img
                //         src={cat.image}
                //         className='w-full h-full object-scale-down'
                //       />
                //   </div>
                // </div>
                <div
                  key={cat._id + "displayCategory"}
                  className="w-full h-full cursor-pointer group"
                  onClick={() =>
                    handleRedirectProductListpage(cat._id, cat.name)
                  }
                >
                  <div className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-200 h-24">
                    <img
                      src={cat.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <h3 className="text-white font-semibold text-xs text-center drop-shadow-lg">
                        {cat.name}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>

      {/***display category product */}
      {categoryData?.map((c, index) => {
        return (
          <CategoryWiseProductDisplay
            key={c?._id + "CategorywiseProduct"}
            id={c?._id}
            name={c?.name}
          />
        );
      })}
    </section>
  );
};

export default Home;
