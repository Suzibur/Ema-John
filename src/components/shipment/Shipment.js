import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'
import { UserContext } from '../../App'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
    const [loginUser, setLoginUser] = useContext(UserContext);
    return (
        <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
            <p>Your full name:</p>
            <input name="name" Placeholder="Your Name..." defaultValue={loginUser.name} ref={register({ required: true })} />
            {errors.exampleRequired && <span className='error'>Name is required</span>}
            <p>Your email:</p>
            <input name="email" Placeholder="Your Email..." defaultValue={loginUser.email} ref={register({ required: true })} />
            {errors.exampleRequired && <span className='error'>Email is required</span>}
            <p>Your address:</p>
            <input name="address" Placeholder="Your Address..." ref={register({ required: true })} />
            {errors.exampleRequired && <span className='error'>Address is required</span>}
            <input type="submit" />
        </form>
    );
};

export default Shipment;