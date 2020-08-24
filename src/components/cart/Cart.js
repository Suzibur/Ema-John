import React from 'react';
import './Cart.css'
const cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total, pd) => total+pd.price, 0);
    let shipping = 0;
    if (total>50){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if (total< 15 && total>0){
        shipping = 11.99;
    }
    const tax = total/10;
    const grandTotal = tax+shipping+total;
    const formatNum = num =>{
        const precision = num.toFixed(2);
        return Number(precision)
    }
    return (
        <div>
            <h4>Order Summary.</h4>
            <p><small>Item Ordered: {cart.length}</small></p>
            <p><small>Product Price: ${formatNum(total)}</small></p>
            <p><small>Shipping & Handling: ${shipping}</small></p>
            <p><small>Total before tax: ${formatNum(tax)}</small></p>
            <h3 className="grandTotal">Order Total: ${formatNum(grandTotal)}</h3>
        </div>
    );
};
export default cart;