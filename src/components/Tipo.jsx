import { useEffect } from "react";

// components
import { Inputs, Input } from "./Input/Input";

// datas
import Valores from "../Valores";

const Table = ({
  data,
  setData
}) => {

  const handleTable = ( event ) => {
    const selectTableId = Number(event.target.value); 
    setData(( values ) => ({...values, valor: {...values.valor, tabela: (selectTableId)}}))
  }

  return (
    <Inputs>
      <Input
        label="Tabela"
        type="select"
        onChange={handleTable}
        value={data.valor.tabela}
        options={Valores.map((table) => ({
          value: table.id,
          label: table.nome,
        }))}
      />
    </Inputs>
  );
  
};

const Race = ({
  data,
  setData
}) => {

  const handleInput = ( event ) => {
    const type = event.target.name;
    const value = Number(event.target.value);
    setData(( values ) => ({...values, valor: {...values.valor, [type]: (value)}}));
  }

  return (
    <Inputs>
      <Input
        label="Valor por hora"
        type="currency"
        className="font right"
        name="valorHora"
        value={data.valor.valorHora}
        onChange={(element) => {
          handleInput(element);
        }}
      />
      <Input
        label="Mínimo de hora"
        className="font right"
        name="minimoDeHoras"
        type="text"
        inputMode="numeric"
        value={data.valor.minimoDeHoras}
        onChange={handleInput}
      />
    </Inputs>
  );

};

const Tipo = ({
  data,
  setData,
  pastType
}) => {

  const { diarias, tipo } = data;

  const handleType = ( event ) => {
    const type = event.target.type;

    if( type === 'tabela'){
      const roundHours = diarias.map(diaria => ({...diaria, horas: Math.round(diaria.horas)}));
      setData(values => ({...values, diarias: (roundHours), tipo: type}));
      console.log('Horas quebradas arredondadas automaticamente!');
    }else{
      setData(values => ({...values, tipo: type}));
    }

  };

  const SelectInputsByType = {
    'tabela': Table,
    'corrida': Race
  }[tipo];

  useEffect(() => {
    const element = document.querySelector(`.type-box li[type=${pastType}]`);
    const width = element.offsetWidth;
    const left = element.offsetLeft;
    document.querySelector('.type-box .nav_indicator').style = `width: ${width}px; left: ${left}px`;
  });

  return (
    <>
      <ul className="select-box type-box">
        <i className="nav-background"></i>
        <i className="nav_indicator"></i>
        <li onClick={handleType} type="tabela">Tabela</li>
        <li onClick={handleType} type="corrida">Corrida</li>
        <li onClick={handleType} type="pacote">Pacote</li>
      </ul>

      <br/>

      {
        tipo !== 'pacote' && (
          <SelectInputsByType
            data={data} 
            setData={setData}
          />
        )
      }

    </>
  );

};
export default Tipo;