import React, { Fragment } from 'react'
import { CgMouse } from 'react-icons/all';
import "./Home.css"

const Home = () => {
    return (
        <Fragment>
            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                        Scroll <CgMouse/>
                    </button>
                </a>

                <h2 className="homeHeading">Featured Products</h2>
            </div>
        </Fragment>
    );
}

export default Home;
