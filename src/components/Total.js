import Valores from "../Valores";
import Valor from "./Valor";

const calculateTotalHours = ( diarias ) => {
  return diarias.reduce(( total, item ) => total + item.horas, 0);
};

const calculateExtraTotal = ( diarias, data ) => {
  const minValue = Valores.find(( item ) => item.id === data.valor.tabela).valores[0].valor;
  return calculateTotalValue( diarias, data ) - minValue * diarias.length;
};

const calculateOvertime = ( diarias, data ) => {
  const minHours = Valores.find(( item ) => item.id === data.valor.tabela).valores[0].horas;
  return calculateTotalHours( diarias ) - minHours * diarias.length;
};

const calculateAdditionalTotal = ( diarias ) => {
  const sumAdditional = diarias.reduce(( total, item ) => {
    const additionalTotal = item.adicional.reduce(( total, item ) => total + item.valor, 0);
    return total + additionalTotal;
  }, 0);
  return sumAdditional;
};
const calculateTotalValue = ( diarias, data ) => {
  const sumDiaries = diarias.reduce(( total, item ) => {
    const diarieValue = Valor({ diarie: item, data: data }).format(false);
    return total + diarieValue;
  }, 0);
  return sumDiaries + calculateAdditionalTotal( diarias );
};

const formatCurrency = ( value ) => {
  return value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
};

// Função Main
const Total = ( data ) => {
  const { diarias, tipo } = data;
  const additional = formatCurrency( calculateAdditionalTotal( diarias ) );

  // Define a saida totalOBject com base no tipo 'pacote'
  if (tipo === "pacote") {
    const definePackageTotalObject = ( diarias ) => {
      return {
        diaries: diarias.length,
        additional: additional,
        total: formatCurrency( diarias.reduce(( total, item ) => total + item.valor, 0) ),
      };
    };
    return definePackageTotalObject(diarias);
  } else {
    // Define a saida totalObject com base nos tipos 'tabela' e 'corrida'
    // Adiciona valores 'hours' e 'total' à saida 'totalObject'
    const hours = calculateTotalHours(diarias);
    const total = formatCurrency( calculateTotalValue(diarias, data) );

    // Se tipo for igual 'tabela' returna com 'extraTotal' e 'overtime', exclusivos do tipo 'tabela'
    if (tipo === "tabela") {
      return {
        hours: hours,
        additional: additional,
        extraTotal: calculateExtraTotal(diarias, data),
        overtime: calculateOvertime(diarias, data),
        total: total,
      };
    }else{
      // Retorna valores correspondente ao tipo 'corrida'
      return {
        hours: hours,
        additional: additional,
        total: total,
      };
    }


  }
};

export default Total;
