import React from 'react'
import {Link} from "react-router-dom"
import { Rating } from "@material-ui/lab";



const ProductCard = ({product}) => {
    const options = {
        value: product.rateings,
        readOnly: true,
        precision: 0.5,
    }
    return (
        <Link className="productCard" to={`/products/${product._id}`}>
            <img src={product.images[0].url} alt="!opps"/>
            <p>{product.name}</p>
            <div>
                <Rating {...options}/> 
                <span>({product.num_of_reviews} reviews)</span>
            </div>
            <span>{`₹${product.price}`}</span>
        </Link>
    )
}

export default ProductCard
