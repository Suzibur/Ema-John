import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/index'
import Product from '../product/Product';

const Detail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey);
    return (
        <div>
            <h1>{productKey} Product detail will coming soon.............</h1>
            <Product product={product} key={productKey} addShowCart={false}></Product>
        </div>
    );
};

export default Detail;