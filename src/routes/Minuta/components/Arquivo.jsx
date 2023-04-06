import React from "react";
import { StyleSheet, Font, Document, Page } from "@react-pdf/renderer";

// This Components
import Tabela from "./Tabela"
import Cabecalho from "./Cabecalho";
import Corpo from "./Corpo";

// fonts
import RobotoRegular from "../../../fonts/Roboto/Roboto-Regular.ttf";
import RobotoMedium from "../../../fonts/Roboto/Roboto-Medium.ttf";
import RobotoBold from "../../../fonts/Roboto/Roboto-Bold.ttf";
import RobotoBlack from "../../../fonts/Roboto/Roboto-Black.ttf";

Font.register({ 
  family: 'Roboto', 
  fonts: [
    {
      src: RobotoRegular
    },
    {
      src: RobotoMedium,
      fontWeight: 'medium'
    },
    {
      src: RobotoBold,
      fontWeight: 'bold'
    },
    {
      src: RobotoBlack,
      fontWeight: 'black'
    }
  ]
});

const styles = StyleSheet.create({
  document: {
    width: '100%',
    height: '100%',
    fontFamily: 'Roboto',
    fontSize: 11
  }
});

const Arquivo = ({ 
  data
}) => (
  <Document style={styles.document}>
    <Page>
      <Cabecalho data={data}/>
      <Corpo data={data}/>
      <Tabela data={data}/>
    </Page>
  </Document>
);

export default Arquivo;