import React from "react";
import { StyleSheet, Text } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    padding: '0 30px',
    margin: '0 0 10px 0'
  },  
});


const Corpo = ({ data }) => {

  return (
    <Text style={styles.body}>{`Serviço prestado como Assistente de Set (Objeto) para a empresa Seiva, CNPJ 43.717.567/0001-11, prestando serviços no Job Zé Delivery. A pedido de Camila Camargo.`}</Text>
  );
};

export default Corpo;