import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData/index'
import OrderProducts from '../OrderProducts/OrderProducts';
import Cart from '../cart/Cart'
import { Link, useHistory } from 'react-router-dom';
import Image from '../../images/giphy.gif'

const Order = () => {
    const [carts, setCarts] = useState([]);
    const handleRemoveProduct = (key) => {
        const newCart = carts.filter(product => product.key !== key);
        setCarts(newCart);
        removeFromDatabaseCart(key);
    }
    const history = useHistory();
    const [orderPlaced, setOrderPlaced] = useState(false);
    const handlePlaceOrder = ()=>{
        setOrderPlaced(true);
        setCarts([]);
        processOrder();
        history.push('/shipment')
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        const cartProducts = productKey.map(key => {
            const products = fakeData.find(product => product.key === key);
            products.quantity = savedCart[key];
            return products;
        })
        setCarts(cartProducts);
    }, [])
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    carts.map(cart => <OrderProducts handleRemoveProduct={handleRemoveProduct} cart={cart} key={cart.key}></OrderProducts>)
                }
                {orderPlaced && <img src={Image}></img>}
            </div>
            <div className="cart-container">
                <Cart cart={carts}>
                    <Link><button onClick={handlePlaceOrder} className="add2cart-btn">Place Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Order;