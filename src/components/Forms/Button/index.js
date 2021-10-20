import React from 'react'
import styles from './index.module.css'

export const Button = ({children, ...props}) => {
    return (
        <button {...props} className={styles.button}>
            {children}
        </button>
    )
}

export default Button