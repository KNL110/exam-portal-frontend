import React from 'react'

export const Button = ({ type = "submit", children, ...rest }) => {
    return (
        <button type={type} {...rest}>
            {children}
        </button>
    );
}

