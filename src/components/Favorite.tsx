import { SearchOutlined } from "@mui/icons-material";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ProductObj, removeFavorite } from "../features/ProductSlice";
import Navbar from "./Navbar";
const Favorite = () => {
  const navigate = useNavigate();
  const [hoverEffects, setHoverEffects] = useState(" opacity-0");

  const iconStyle =
    "h-[40px] w-[40px] rounded-full bg-white flex items-center justify-center m-3 hover:bg-[#F23030] hover:text-white hover:scale-[1.1] ease-in duration-100 cursor-pointer";

  function handleHoverEnter() {
    setHoverEffects(" opacity-1 bg-[rgba(0,0,0,0.2)]");
  }

  function handleHoverExit() {
    setHoverEffects(" opacity-0");
  }

  const dispatch = useAppDispatch();
  const favProduct = useAppSelector((state) => state.product.favProduct);
  console.log(favProduct);
  const productInfoNavigator = (id: string) => {
    navigate(`/details/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="p-5 flex flex-wrap">
      {favProduct.length > 0 ? (
        <>
          {favProduct.map((product: ProductObj, index) => (
            <div
              key={index}
              className="flex items-center justify-center flex-1 min-w-[280px] min-h-[350px] m-2 overflow-hidden rounded-md shadow-lg relative"
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverExit}
            >
              <img src={product.avatar} alt="product" />
              <div
                className={
                  `flex items-center justify-center absolute w-[100%] h-[100%] ease-in duration-100` +
                  hoverEffects
                }
              >
                <div className={iconStyle}>
                  <button onClick={() => dispatch(removeFavorite(product._id))}>
                    <ThumbDownAltIcon />
                  </button>
                </div>
                <div className={iconStyle}>
                  <button onClick={() => productInfoNavigator(product._id)}>
                    <SearchOutlined />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="text-2xl">There is no favorite product!!!</p>
      )}
      </div>
    </>
  );
};

export default Favorite;
