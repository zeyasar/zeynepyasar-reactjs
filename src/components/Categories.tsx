import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import place from "../assets/placeholder-image.png";
import { getCategory } from "../features/ProductSlice";
import loadingGif from "../assets/loading.gif";

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.product.categories);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  console.log(categories);

  return (
    <div className="grid grid-cols-6  p-5 mobile:flex-col">
      <button>
        <div className="flex-1 m-2 shadow-lg rounded-md overflow-hidden relative">
          <img src={place} className="w-[100%]" alt="category_img" />
          <div className="justify-center">
            <h2 className="font-medium text-m">All Categories</h2>
          </div>
        </div>
      </button>
      {categories ? (
        categories.map((category) => {
          return (
            <button key={category._id}>
              <div className="flex-1 m-2 shadow-lg rounded-md overflow-hidden relative">
                <img src={place} className="w-[100%]" alt="category_img" />
                <div className="justify-center">
                  <h2 className="font-medium text-m">{category.name}</h2>
                </div>
              </div>
            </button>
          );
        })
      ) : (
        <div className="flex justify-center items-center content-center">
          <img src={loadingGif} alt="img" />
        </div>
      )}
    </div>
  );
};

export default Categories;
