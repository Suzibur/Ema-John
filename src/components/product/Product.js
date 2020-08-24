import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    const { name, img, seller, price,stock} = props.product;
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <p><small>by:{seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock.</small></p>
                <button onClick={()=>props.handleAddProduct(props.product)} className="add2cart-btn"><FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>
            </div>
        </div>
    );
};

export default Product;