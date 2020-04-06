import React, {useState, useContext, useEffect} from "react"
import {Context} from "../Context"

function CartItem({item}) {
    const {removeProduct, setCartItemPriceArr, cartItemsArr, userCountry, userCurrency, cartItemPriceArr, setNewlyAddedPrices, hasMoreItems, setHasMoreItems} = useContext(Context)
    const [quantity, setQuantity] = useState(1)
    const price = item.prices[userCountry].amount
    const productTotalPrice = (price * quantity).toFixed(2)

    useEffect(() => {
        const hasMore = cartItemPriceArr.every(itemPrice => itemPrice !== price)
        if(!hasMore){
            const itemCount = cartItemPriceArr.filter(item => item === price)
            const finalCount = itemCount.length + 1;
            setQuantity(finalCount)
        } else if(hasMore) {
            setQuantity(1)
        }
    }, [hasMoreItems, quantity])

    function incrementProduct() {
        setQuantity(prevQ => prevQ + 1)
        setCartItemPriceArr(prevPrice => [...prevPrice, price])
        setHasMoreItems(true)
    }

    function decrementProduct(id) {
        if(quantity > 1) {
            setQuantity(prevQ => prevQ - 1)
            decrementPrice()
        } else if(quantity === 1) {
            decrementPrice()
            removeProduct(id)
        }
    }

    function decrementPrice() {
        const index = cartItemPriceArr.indexOf(price)
        if (index > -1) {
            cartItemPriceArr.splice(index, 1);
        }
        setCartItemPriceArr(cartItemPriceArr)
    }

    function deleteProduct(id) {
        const deletedPrices = cartItemPriceArr.filter(prevPrice => prevPrice !== price)
        setCartItemPriceArr(deletedPrices)
        removeProduct(id)
    }

    const totalPriceCartItems = () => {
        if(cartItemPriceArr.length === 0){
            setNewlyAddedPrices(0)
        } else {
            const initialPrices = cartItemsArr.reduce((acc, item) => acc + item.prices[userCountry].amount, 0)
            const addedPriceArr = cartItemPriceArr.reduce((acc, item) => acc + item, 0)
            const finalPrice = (initialPrices + addedPriceArr).toFixed(2)
            setNewlyAddedPrices(finalPrice)
        }
    }

    useEffect(() => {
        totalPriceCartItems()
    }, [cartItemsArr, cartItemPriceArr, quantity])
    

    return (
        <div className="cart-item">
            <i className="cart-item-delete ri-delete-bin-line" onClick={() => deleteProduct(item.id)}></i>
            <h3 className="cart-item-title">{item.title}</h3>
            <img className="cart-item-img" src={item.imageUrl}/>
            <h4 className="cart-item-price">
                {productTotalPrice} {userCurrency}
            </h4>
            <div className="cart-item-btns-quantity-div">
                 <button className="cart-item-btn-plus" onClick={() => incrementProduct()}>+</button>
                <h4 className="cart-item-quantity">
                    {quantity}
                </h4>
                <button className="cart-item-btn-minus" onClick={() => decrementProduct(item.id)}>-</button>    
            </div>
        </div>
    )
}

export default CartItem