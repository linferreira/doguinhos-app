import React from "react";
import styles from "./index.module.css";

export const Input = ({ label, type, name, value, onChange, onBlur, error }) => {
  return (
    <div className={styles.wrapper}>
      <label
        className={styles.label}
        htmlFor={name}
        value={value}
        onChange={onChange}
      >
        {label}
      </label>
      <input
        name={name}
        id={name}
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
