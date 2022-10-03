import { Search } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()


  return (
    <div className="navbar h-[60px] shadow-md relative z-10">
      <div className="wrapper px-[20px] py-[10px] flex justify-between items-center">
        <div className="left flex flex-1 items-center">
          <div className="language cursor-pointer text-sm">Search</div>
          <div className="searchInput flex border-2 border-solid border-lightgrey rounded-md items-center ml-2 p-1 focus-within:border-[#FFEC5C] transition-all">
            <input type="text" className="input outline-none" />
            <Search className="" style={{ fontSize: "1rem" }} />
          </div>
        </div>
        <div className="flex-1 center text-center ">
          <div className="logo font-bold text-2xl">Shophere</div>
        </div>
        <div className="right flex flex-1 items-center justify-end">
          <div className="text-sm cursor-pointer ml-3" onClick={()=> navigate('/')}>Home</div>
          <div className="text-sm cursor-pointer ml-3" onClick={()=> navigate('/addproduct')}>Add New Product</div>

          <div className="text-sm cursor-pointer ml-3">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
