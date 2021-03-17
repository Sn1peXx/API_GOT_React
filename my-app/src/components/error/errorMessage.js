import React from 'react';
import img from './20160626_shd_g86_442.jpg';

const ErrorMessage = () => {
    return (
        <>
            <span >Something was wrang</span>
            <img src={img} alt="ERROR"/>
        </>
    );
};

export default ErrorMessage;