import React, { useCallback } from "react";
import { StyleSheet, View, Text } from "@react-pdf/renderer";
import Total from "../../../components/Total";

const styles = StyleSheet.create({
  headerBox: {
    width: '100%',
    padding: '30px 30px 10px 30px',
  },
  headerTitleBox: {
    width: '100%',
    paddingBottom: 7,
    marginBottom: 20,
    borderBottom: '2px solid #000'
  },  
  headerInfoBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userInfos: {

  },
  minutaInfos: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  textBigSize: {
    fontWeight: 'black',
    fontSize: 35
  },
  textMediumSize: {
    fontSize: 17,
    margin: '5px 0',
    fontWeight: 'black'
  },
  textBold: {
    fontWeight: 'bold'
  },
  textUppercase: {
    textTransform: 'uppercase'
  },
  textUppAndBold: {
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  lineSmall: {
    width: 40,
    height: 2,
    marginBottom: 5,
    backgroundColor: '#000'
  }
});

const Cabecalho = ({
  data
}) => {

  const totalValue = useCallback(() => Total( data ), [data]);

  return (
    <>
      <View style={styles.headerBox}>
        <View style={styles.headerTitleBox}>
          <Text style={[styles.textBigSize, styles.textUppercase]}>Minuta</Text>
          <Text style={styles.textUppAndBold}>São Paulo, 23 de abril de 2023</Text>
        </View> 

        <View style={styles.headerInfoBox}>
          <View style={styles.userInfos}>
            <Text style={styles.textUppAndBold}>De:</Text>
            <Text style={styles.textMediumSize}>João Victor Santos</Text>
            <Text>43.717.567/0001-96</Text>
            <Text>joaovictorcgdossantos@gmail.com</Text>
            <Text>(11) 9 7678-3553</Text>
            <Text>Assist. de set (objeto)</Text>
            <Text>DRT 269/2022</Text>
          </View>
          <View style={styles.minutaInfos}>
            <Text style={styles.textUppAndBold}>Total</Text>
            <Text style={styles.textMediumSize}>{totalValue().total}</Text>
            <View style={styles.lineSmall}></View>
            <Text>N. 0001</Text>
            <Text>20/08/2003</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default Cabecalho;