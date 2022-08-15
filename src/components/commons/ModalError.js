import React from 'react';

const ModalError = ({ title, text, handleOnClick, param }) => {
    return (
        <div className='modalErrorContainer' onClick={handleOnClick} >
            <h3 className='modalErrorTitle'> {title} </h3>
            <label className='modalErrorText'> {param} </label>
        </div>   
    )
};

export default ModalError;