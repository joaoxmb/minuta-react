import moment from "moment";

// components
import { Input } from "../../../components/Input/Input";

// datas
import Valores from "../../../Valores";

export default function Termino({
  data,
  diarie,
  setDiarie
}){

  // Main
  const startDate = diarie.inicio;

  // functions 
    const handleFinish = ( event ) => {
      const hour = Number(event.target.value);
      setDiarie(( values ) => ({...values, horas: hour}))
    };
    
    const calc = {
      race(){
        const minimo = data.valor.minimoDeHoras;
      
        // create options hours
        let options = [];
        for (let i = 0; i < 21;i++){
          const value = i/2;
          options.push(`${moment(new Date(startDate)).add((minimo + value), 'hour')}`);
        }
      
        return options.map(( value, number ) => {
          const hour = number/2;
          return ({value: (minimo+hour), label: (`${moment(value).format('HH:mm')} | ${hour + minimo} h`)})
        });
      },
      table(){
        const getTable = Valores.find(value => value.id === data.valor.tabela).valores;
      
        return getTable.map(( tableValue ) => {
          const hours = tableValue.horas;
          return ({value: (hours), label: `${moment(startDate).add(hours ,'hour').format('HH:mm')} | ${hours} h`})
        });
      }
    }

  return (
    <>
      <Input
        type="select"
        onChange={handleFinish}
        value={diarie.horas}
        options={
          data.tipo === "tabela"
            ? calc.table()
            : data.tipo === "corrida"
            ? calc.race()
            : []
        }
      />
    </>
  );
};