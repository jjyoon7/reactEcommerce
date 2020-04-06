import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {Context} from "../Context";

function Header() {
    const {cartItemsArr} = useContext(Context)
    const cartClass = cartItemsArr.length > 0 ? "ri-shopping-cart-fill" : "ri-shopping-cart-line"
    return (
        <header className="header main-grid">
            <nav className="nav">
                <h1 className="header-product col">
                    <Link to="/">Products</Link>
                </h1>
                <div className="header-cart col">
                    <Link to="/cart">
                        {cartItemsArr !== [] ? <i className={`${cartClass} ri-fw ri-2x`}></i> : <i className="ri-shopping-cart-fill ri-fw ri-2x"></i> }
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Header