import React, {useContext} from 'react';
import {Context} from "../Context";
import PropTypes from "prop-types";
import ProductItem from "../components/ProductItem"

function Product() {
    const {productsArr} = useContext(Context)
    const productsMapped = productsArr.map( product => (
        <ProductItem key={product.id} product={product}/>
    ))
    
    return (
        <div className="product-page main-grid">
            {productsMapped}
        </div>
    )
}

Product.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired
    })
}

export default Product