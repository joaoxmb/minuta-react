import React, { useState } from "react";

const toMoney = ( value ) => value
  .toLocaleString('pt-BR', {
    style: 'currency', 
    currency: 'BRL' 
  });
const unmask = ( value ) => Number(
    value.replace(/[^0-9,]*/g, '').replace(",", "")
  ) / 100

const Currency = ({
  name,
  className,
  placeholder,
  onChange
}) => {

  const [amount, setAmount] = useState(0)

  return (
    <>
      <input 
        className={className}
        type="text"
        name={name}
        placeholder={placeholder}
        inputMode="numeric"
        onChange={(e) => { 
          const value = e.currentTarget.value
          const unMasked = unmask(value)

          if (unMasked >= 0) {
            setAmount(unMasked)
          }
          onChange(e)
        }}
        value={
          toMoney(amount)
        }
      />
    </>
  );
};

export default Currency;