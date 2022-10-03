import { Close } from "@mui/icons-material";
import React, { useState } from "react";
import Categories from "./Categories";
import Navbar from "./Navbar";
import Products from "./Products";




const Home = () => {
    const [announceStyle, setAnnounceStyle] = useState('bg-[#F23030] text-white font-bold flex items-center justify-center')
    
    const handleClose =()=>{
        setAnnounceStyle(announceStyle +' hidden')
    }
    return(
        <>
        <div className={announceStyle}>
            <h2>Hurry up it's 40% off now!!!</h2>
            <Close className="cursor-pointer ml-2" onClick={handleClose}/> 
        </div>
        <Navbar/>
        <Categories/>
        <Products/>
        </>
    )
}

export default Home