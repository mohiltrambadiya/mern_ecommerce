import React from 'react'
import {Link} from "react-router-dom"
import ReactStars from "react-rating-stars-component"



const ProductCard = ({product}) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        value: product.rateings,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25
    }
    return (
        <Link className="productCard" to={`/products/${product._id}`}>
            <img src={product.images[0].url} alt="!opps"/>
            <p>{product.name}</p>
            <div>
                <ReactStars {...options}/> 
                <span>({product.num_of_reviews} reviews)</span>
            </div>
            <span>{`$${product.price}`}</span>
        </Link>
    )
}

export default ProductCard
