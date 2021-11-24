import './App.css'
import Header from './components/layout/Header/Header.js'
import {
  BrowserRouter, Routes , Route 
} from "react-router-dom"
import Webfont from "webfontloader"
import React from 'react'
import Footer from './components/layout/Footer/Footer.js'
import Home from './components/Home/Home.js'
import ProductDetail from './components/Product/ProductDetail.js'
import Products from './components/Product/Products.js'
import Search from './components/Product/Search.js'

function App() {

  React.useEffect(() => {
    Webfont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka']
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/product/:id" element={<ProductDetail/>}></Route>
        <Route exact path="/products" element={<Products/>}></Route>
        <Route  path="/products/:keyword" element={<Products/>}></Route>
        <Route exact path="/search" element={<Search/>}></Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
