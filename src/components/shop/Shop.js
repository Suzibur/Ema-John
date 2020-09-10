import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../product/Product';
import Cart from '../cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        const cartProducts = productKey.map(key => {
            const products = fakeData.find(pd => pd.key === key);
            products.quantity = savedCart[key]
            return products;
        })
        setCart(cartProducts);
    }, [])
    const handleAddProduct = (product) => {
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            newCart = [sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product
                        handleAddProduct={handleAddProduct}
                        product={product} key={product.key}
                        addShowCart={true}>
                    </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review"><button className="add2cart-btn">Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;