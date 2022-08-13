import React from 'react';

const Title = ({ text }) => {
    return (
        <div className='TitleComponent'>
            <label className='LabelTitleComponent'> {text} </label>
        </div>
    )
};


export default Title;