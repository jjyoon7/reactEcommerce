import React, {useContext} from "react"
import {Context} from "../Context"

function ProductItem({product}) {
    const {cartItemsArr, userCountry, userCurrency, addProduct} = useContext(Context)
    const price = product.prices[userCountry].amount    

    const addButton = () => {
        const alreadyInCart = cartItemsArr.some(item => item.id === product.id)
        if(alreadyInCart) {
            return <button className="product-item-btn-added btn" onClick={() => addProduct(product, cartItemsArr)}>added</button>
        } else {
            return <button className="product-item-btn btn" onClick={() => addProduct(product, cartItemsArr)}>add to cart</button>
        }
    }


    return (
        <div className="product-item">
            <img className="product-item-img" src={product.imageUrl}></img>
                <h3 className="product-item-title">{product.title}</h3>
                <h4 className="product-item-price">
                    {price} {userCurrency}
                </h4>
                {addButton()}
        </div>
    )
}

export default ProductItem