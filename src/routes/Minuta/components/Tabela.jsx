import React, { useCallback } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment';

// components
import Valor from '../../../components/Valor';
import Total from '../../../components/Total';

// Estilo da tabela
const styles = StyleSheet.create({
  table: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    fontSize: 10,
    padding: '0 30px'
  },  
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 'auto'
  },
  highlight: {
    backgroundColor: '#000',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'medium',
    fontSize: 11
  },  
  col: {
    width: 'auto',
    height: 25,
    padding: 5,
    borderBottom: '1px solid #000',
    borderLeft: '1px solid #000',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center'
  },
  junction: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  textBold: {
    fontWeight: 'bold'
  }
});

// Define a célula da tabela
const Cell = ({ style, text }) => (
  <View style={[styles.col, style]}>
    <Text>{text}</Text>
  </View>
);

const Header = ({ cols }) => (
  <View style={[styles.row, styles.highlight, { borderRight: '1px solid #000', borderTop: '1px solid #000' }]}>
    {cols.map((item) => {
      const { title, size } = item;
      return <Cell style={{ width: size }} text={title} />;
    })}
  </View>
);

const Body = ({ data, colsSize }) => {
  const { diarias, tipo } = data;
  const formatCurrency = value => value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });

  // Define o componente para linhas adicionais
  const Additional = ({ adicional }) => (
    <>
      {adicional.map(( item ) => {
        const { ocorrencia, valor } = item;

        return (
          <View style={styles.row} key={ocorrencia}>
            <Cell style={{ width: "75%"}} text={`Adicional de ${ocorrencia}`} />
            <Cell style={{ width: colsSize[4] }} text={formatCurrency( valor )} />
          </View>
        );
      })}
    </>
  );

  return (
    <View style={({ borderRight: '1px solid #000' })}>
      {
        diarias.map(( item ) => {

          const { inicio, horas, ocorrencia, valor, adicional } = item;

          // Calcula o tamanho da coluna de 'data'
          const resizeData = ((adicional.length + 1) * styles.col.height); 
          // Calcula o valor da diaría com base no 'tipo' da minuta
          const value = tipo !== "pacote" ? Valor({ data: data, diarie: item }).format(true) : valor;

          // Define o componente período
          const period = () => {
            const startDate = moment(inicio);
            const endDate = moment(inicio).add(horas, 'hour');

            // Se 'startDate' for igual à 'endDate' display format retorna 'hora' caso contrario 'data e hora'
            const isSameDate = Number(startDate.format('DD')) === Number(endDate.format('DD'));
            const displayFormat = isSameDate ? 'HH:mm' : 'DD/MM HH:mm';
            
            return `${startDate.format(displayFormat)} as ${endDate.format(displayFormat)}`;
          };
          

          return (
            <View style={styles.row}>
              <Cell
                style={{ height: resizeData, width: colsSize[0] }}
                text={moment(inicio).format("DD/MM/YYYY")}
              />

              <View style={styles.junction}>
                <View style={styles.row}>
                  <Cell style={{ width: colsSize[1] }} text={ocorrencia} />
                  <Cell style={{ width: colsSize[2] }} text={period()} />
                  <Cell style={{ width: colsSize[3] }} text={horas} />
                  <Cell style={{ width: colsSize[4] }} text={value} />
                </View>

                <Additional adicional={adicional} />
              </View>
            </View>
          );
        })
      }
    </View>
  );
};

const Foot = ({ data, colsSize }) => {
  const { tipo } = data;

  // Importa o resultado total
  const totalValues = useCallback(() => Total( data ), [data]);
  // Define célula em branco para manter o tamanhos iguais das linhas
  const BlankCell = () => ( <Cell style={{ width: "75%", border: "none" }}/> );

  // Define as linhas do rodapé
  const Rows = ({ text, value, style }) => (
    <View style={[styles.row, { justifyContent: "flex-end" }]}>
      <BlankCell />
      <Cell style={[style, { width: colsSize[3] }]} text={text} />
      <Cell style={[style, { width: colsSize[4] }]} text={value} />
    </View>
  );

  return (
    <View style={{ marginTop: 10, borderRight: "1px solid #000" }}>
      <Rows
        value={tipo === "pacote" ? totalValues().diaries : totalValues().hours}
        text={tipo === "pacote" ? "Diárias" : "Horas"}
        style={{ borderTop: "1px solid #000" }}
      />
      <Rows value={totalValues().additional} text={"Adicional"} />
      <Rows value={totalValues().total} text={"Total"} style={styles.textBold} />
    </View>
  );
};

const Tabela = ({ data, style }) => {

  // Define o titulo e tamanho de cada coluna desejada
  const cols = [
    {
      title: 'Data',
      size: '15%'
    },
    {
      title: 'Ocorrência',
      size: '30%'
    },
    {
      title: 'Período',
      size: '30%'
    },
    {
      title: 'Horas',
      size: '15%'
    },
    {
      title: 'Total',
      size: '25%'
    },
  ];
  // Define o tamanho das colunas com base em 'cols'
  const colsSize = cols.map( item => item.size );

  return (
    <View style={[styles.table, {...style}]}>
      <Header cols={cols} />
      <Body data={data} colsSize={colsSize} />
      <Foot data={data} colsSize={colsSize} />
    </View>
  );
};

export default Tabela;
