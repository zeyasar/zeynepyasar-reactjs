import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getIndiProduct } from '../features/ProductSlice';
import Navbar from "./Navbar";

function Details() {
  
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const indiviProd = useAppSelector((state) => state.product.indiviProd);
  const product = indiviProd[0];
  useEffect(() => {
    dispatch(getIndiProduct(id));
  }, [dispatch, id]);
  
  return (
    <div>
      <Navbar/>
      <div className="flex justify-center mobile:flex-col mobile:mt-4 mobile:p-3">
        <div className="flex-1 flex items-center justify-center">
          <img
            src={product?.avatar}
            className="product_img"
            alt="product_image"
          />
        </div>
        <div className="flex-[1.3] flex flex-col items-start  justify-items-center mt-10 mobile:items-center">
          <h1 className="title text-[40px] mobile:text-[30px]">
           {product?.name}
          </h1>
          <p className="font-bold text-lg"> Category :- {product?.category}</p>
          <p className="disription pr-[4rem] text-justify mt-4 mobile:pr-0">
          {product?.description}
          </p>
          <div className="flex flex-col place-self-start">
            <p className="mt-7 text-3xl">
              Price: <b>$${product?.price}</b>
            </p>
          </div>

          <button className="text-white bg-[#F23030] rounded-md shadow-md mt-[30px] p-3">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Details