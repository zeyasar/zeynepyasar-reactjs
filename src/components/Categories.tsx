import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import place from '../assets/placeholder-image.png'
import { getCategory } from "../features/ProductSlice";




const Categories = () => {

  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.product.categories);
 
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
//  console.log(categories)
    

  return (
    <div className="grid grid-cols-5  p-5 mobile:flex-col">
      <button>
        <div className="flex-1 m-2 shadow-lg rounded-md overflow-hidden relative">
          <img src={place} className="w-[100%]" alt="category_img" />
          <div className="justify-center">
            <h2 className="font-medium text-m">All Categories</h2>
          </div>
        </div>
      </button>
      {

      }
      <button>
      <div className="flex-1 m-2 shadow-lg rounded-md overflow-hidden relative">
          <img src={place} className="w-[100%]" alt="category_img" />
          <div className="justify-center">
            <h2 className="font-medium text-m">Men's Clothing</h2>
          </div>
        </div>
      </button>
      <button>
      <div className="flex-1 m-2 shadow-lg rounded-md overflow-hidden relative">
          <img src={place} className="w-[100%]" alt="category_img" />
          <div className="justify-center">
            <h2 className="font-medium text-m">Women's Clothing</h2>
          </div>
        </div>
      </button>
      <button>
      <div className="flex-1 m-2 shadow-lg rounded-md overflow-hidden relative">
          <img src={place} className="w-[100%]" alt="category_img" />
          <div className="justify-center">
            <h2 className="font-medium text-m">Jewelery</h2>
          </div>
        </div>
      </button>
      <button>
      <div className="flex-1 m-2 shadow-lg rounded-md overflow-hidden relative">
          <img src={place} className="w-[100%]" alt="category_img" />
          <div className="justify-center">
            <h2 className="font-medium text-m">Electronics</h2>
          </div>
        </div>
      </button>
    </div>
  );
};

export default Categories;
