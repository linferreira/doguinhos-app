import React from 'react'
import styles from './index.module.css'

export const Input = ({label, type, name}) => {
    return (
        <div className={styles.wrapper}>
            <label className={styles.label} htmlFor={name}>{label}</label>
            <input name={name} id={name} className={styles.input} type={type} />
            <p className={styles.error}>Error</p>
        </div>
    )
}

export default Input