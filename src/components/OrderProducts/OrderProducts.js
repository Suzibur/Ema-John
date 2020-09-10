import React from 'react';
import './OrderProducts.css'
const OrderProducts = (props) => {
    const { name, price, quantity, key } = props.cart;
    return (
        <div className="product">
            <div>
                <h4 className="product-name">{name}</h4>
                <p>${price}</p>
                <p>Quantity: {quantity}</p>
                <button onClick={()=>{props.handleRemoveProduct(key)}} className="add2cart-btn">Remove Cart</button>
            </div>
        </div>
    );
};

export default OrderProducts;