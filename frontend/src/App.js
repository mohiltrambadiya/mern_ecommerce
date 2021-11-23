import './App.css';
import Header from './components/layout/Header/Header.js';
import {
  BrowserRouter, Routes , Route 
} from "react-router-dom";
import Webfont from "webfontloader";
import React from 'react';
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home.js';

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
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
