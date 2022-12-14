import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import React from 'react'
import Home from '../components/Home'
import Details from '../components/Details'
import CreateProduct from '../components/CreateProduct'
import Favorite from '../components/Favorite'

function AppRouter() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/details/:id" element={<Details/>}/>
            <Route path="/addproduct" element={<CreateProduct/>}/>
            <Route path="/favoriteproduct" element={<Favorite/>}/>
        </Routes>
    </Router>
  )
}

export default AppRouter