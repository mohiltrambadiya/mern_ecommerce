import React, { Fragment, useEffect } from 'react'
import { CgMouse } from 'react-icons/all'
import "./Home.css"
import Product from './Product.js'
import MetaData from '../layout/MetaData'
import {getAllProduct} from '../../actions/productAction'
import {useSelector, useDispatch} from 'react-redux'


const Home = () => {

    const dispach = useDispatch()

    useEffect(() => {
        dispach(getAllProduct())
    }, [dispach])

    const {loading, error, products, productCount} = useSelector((state) => state.products)

    return (
        <Fragment>
            <MetaData title="ECOMMERCE"/>
            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                        Scroll <CgMouse/>
                    </button>
                </a>
                <h2 className="homeHeading">Featured Products</h2>
                <div className="container" id = "container">
                    {products && products.map((product) => (<Product product={product}></Product>))}
                </div>
            </div>
        </Fragment>
    );
}

export default Home;
