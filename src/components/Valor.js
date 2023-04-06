import Valores from "../Valores";

export default function Valor({
   data, 
   diarie 
}) {

  const { valor, horas } = diarie;

  let EndValue = 0;
  if (data.tipo === 'tabela') {
    const getTable = Valores.find(table => table.id === data.valor.tabela);
    const getValue = getTable?.valores.find(value => value.horas === horas)?.valor;
    EndValue = getValue || 0;
  } else if (data.tipo === 'corrida') {
    const calc = horas * (data.valor.valorHora || 0);
    EndValue = calc;
  } else if (data.tipo === 'pacote') {
    EndValue = valor || 0;
  }

  const format = ( show ) => show
  ? EndValue.toLocaleString("pt-br", { style: "currency", currency: "BRL" })
  : EndValue;

  return {
    format: format
  };
};