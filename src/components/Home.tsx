import { Close } from "@mui/icons-material";
import React, { useState } from "react";
import Categories from "./Categories";
import Navbar from "./Navbar";
import Products from "./Products";

const Home = () => {
    return(
        <>
        <Navbar/>
        <Categories/>
        <Products/>
        </>
    )
}

export default Home