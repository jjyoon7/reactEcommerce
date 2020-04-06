import React, {useContext} from "react";
import {Context} from "../Context";
import CartItem from "../components/CartItem"

function Cart() {
    const {cartItemsArr, cartItemPriceArr, userCountry, userCurrency, setHasMoreItems} = useContext(Context)
    
    const cartItemElements = cartItemsArr.map(item => <CartItem key={item.id} item={item}/>)

    const totalPrice = () => {
        if(cartItemPriceArr.length === 0){
            return cartItemsArr.reduce((acc, item) => acc + item.prices[userCountry].amount, 0).toFixed(2)
        } else if(cartItemPriceArr.length >= 1) {
            const initialPrices = cartItemsArr.reduce((acc, item) => acc + item.prices[userCountry].amount, 0)
            const addedPrices = cartItemPriceArr.reduce((acc, item) => acc + item, 0)
            const finalPrice = (initialPrices + addedPrices).toFixed(2)
            setHasMoreItems(true)
            return finalPrice
        }
    }

    return (
        <main className="cart-page main-grid">
            <h1 className="cart-page-title">Check out</h1>
            <div className="cart-page-items">
                {cartItemElements}
            </div>
            <p className="cart-page-total-cost">Total: {totalPrice()} {userCurrency}</p>
            <div className="cart-page-btn-div">
                <button className="cart-page-order-btn btn">Place Order</button>
            </div>
        </main>
    )
}

export default Cart
