import React, {useState, useEffect} from "react"

const Context = React.createContext()

function ContextProvider(props) {
    const [productsArr, setProductsArr] = useState([])
    const [cartItemsArr, setCartItemsArr] = useState([])
    const [cartItemPriceArr, setCartItemPriceArr] = useState([])
    
    const [location, setLocation] = useState({})
    const [userCountry, setUserCountry] = useState(0)
    const [userCurrency, setUserCurrency] = useState("")
 
    const [newlyAddedPrices, setNewlyAddedPrices] = useState(0)

    const [hasMoreItems, setHasMoreItems] = useState(false)

    function handleCountry(location) {
        const userInSweden = location.country_code === "SE";

        if(userInSweden) {
            setUserCountry(0)
            setUserCurrency("SEK")

        }else if(!userInSweden){
            setUserCountry(1)
            setUserCurrency("EUR")
        }
    }

    useEffect(() => {
        fetch('http://api.ipstack.com/check?access_key=specialKeyHere')
        .then(response => response.json())
        .then(data => {
            setLocation(data)
            handleCountry(location)
        })
    }, [userCountry])

    useEffect(() => {
        fetch('http://localhost:8181/products')
        .then(response => response.json())
        .then(data => setProductsArr(data))
    }, [])

    function addProduct(newProduct, cartItems) {     
        const isItNewItem = cartItems.find(item => item.id === newProduct.id)   
        if(!isItNewItem){
            setCartItemsArr(prevProducts => [...prevProducts, newProduct])
        }
    }

    function removeProduct(id) {
        setCartItemsArr(prevItems => prevItems.filter(item => item.id !== id))
    }

    return (
        <Context.Provider value={{productsArr, 
                                  cartItemsArr, 
                                  setCartItemsArr,
                                  cartItemPriceArr,
                                  setCartItemPriceArr,
                                  userCountry,
                                  userCurrency,
                                  addProduct,
                                  removeProduct,
                                  newlyAddedPrices,
                                  setNewlyAddedPrices,
                                  hasMoreItems, 
                                  setHasMoreItems
                                  }}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}