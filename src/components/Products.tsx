import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import loadingGif from '../assets/loading.gif'
import { addFavorite, getProduct, ProductObj } from "../features/ProductSlice";

const Products = () => {
    const navigate = useNavigate()
    const [hoverEffects , setHoverEffects]=useState(' opacity-0')
 
    const iconStyle = 'h-[40px] w-[40px] rounded-full bg-white flex items-center justify-center m-3 hover:bg-[#F23030] hover:text-white hover:scale-[1.1] ease-in duration-100 cursor-pointer'

    function handleHoverEnter() {
        setHoverEffects(' opacity-1 bg-[rgba(0,0,0,0.2)]')
    }

    function handleHoverExit(){
        setHoverEffects(' opacity-0')
    }

    const dispatch = useAppDispatch();
    const productList = useAppSelector((state) => state.product.productList);
    const isLoading = useAppSelector((state) => state.product.isLoading);
    const favProduct = useAppSelector((state) => state.product.favProduct);

    const productInfoNavigator = (id: string) => {
      navigate(`/details/${id}`);
    };
    // console.log(productList)
    // console.log(favProduct)
    useEffect(() => {
      dispatch(getProduct());
      // dispatch(getCategory());
    }, [dispatch]);

  function addFavorite(elem: any): any {
    throw new Error("Function not implemented.");
  }

    return (
      <>
      {isLoading ?(
        <div className="flex justify-center items-center content-center">
        <img
        src={loadingGif}
        alt="img"
      />
      </div>
      ) :
      
      (<div className="p-5 flex flex-wrap">
        {productList.map((product: ProductObj, index) => (
          <div key={index}
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
                <ShoppingCartOutlined/>
              </div>
              <div className={iconStyle}>
                <button onClick={() => dispatch(addFavorite(product))}>
                <FavoriteBorderOutlined/>
                </button>
              </div>

              <div className={iconStyle}>
              <button onClick={() => productInfoNavigator(product._id)}>
                <SearchOutlined/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>)
      }
    </> 
    );
};

export default Products;
