// components
import { useState, useCallback } from "react";

import { Input } from "../../../components/Input/Input";

export default function Adicional({
  diarie,
  setDiarie
}) {

  const { adicional } = diarie;
  const [ fake, setFake ] = useState(false);

  const handleInputs = index => event => {
    const type = event.target.name;
    const value = type === 'valor' ? Number(event.target.value) : event.target.value;
    
    setDiarie(
      ( values ) => (
        {
          ...values,
          adicional: (
            adicional.map((item, key) => key === index ? ({ ...item, [type]: value }) : item)
          )
        }
      )
    );
  }

  const handleNew = () => {
      setFake(true)
      setDiarie(
        ( values ) => (
          {
            ...values,
            adicional: [...values.adicional.filter(( item ) => item.ocorrencia !== '' || item.valor !== 0), {
              ocorrencia: '',
              valor: 0
            }]
          }
        )
      )
  }
  const handleRemove = index => {
    setDiarie(
      ( values ) => (
        {
          ...values,
          adicional: [...values.adicional.filter(( item, itemIndex ) => itemIndex !== index)]
        }
      )
    )
  }

  const handleFocus = () => {
    setFake(true)
  }
  const handleParentBlur = useCallback((e) => {
      const currentTarget = e.currentTarget
      requestAnimationFrame(() => {
        if (!currentTarget.contains(document.activeElement)) {
          // parent blur 
          setFake(false)
          setDiarie(
            ( values ) => (
              {
                ...values,
                adicional: [...values.adicional.filter(( item ) => item.ocorrencia !== '' || item.valor !== 0)]
              }
            )
          )
        }
      });
  }, [setFake, setDiarie])
  
  return (
    <div className="adicional-box" onFocus={handleFocus} onBlur={handleParentBlur}>
      {
        adicional.map((item, index) => {

          return (
            <div key={index.toString()}>
              <Input 
                type="text"
                name="ocorrencia"
                placeholder="Ocorrência"
                value={item.ocorrencia}
                onChange={handleInputs(index)}
                autoFocus={fake}
              />
              <Input 
                type="currency"
                name="valor"
                value={item.valor}
                onChange={handleInputs(index)}
              />
              <button className="remove font red" onClick={() => handleRemove(index)}>x</button>
            </div>
          )
        })
      }
      {
        fake || adicional.length === 0 ? (
          <div className="fake" onClick={handleNew}>
            <button className="input">
              Ocorrência
            </button>
            <button className="input">
              R$ 0,00
            </button>
            <button className="add font green">+</button>
          </div>
        ) : null
      }
    </div>
  );
}