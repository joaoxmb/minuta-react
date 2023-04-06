import Arquivo from "./components/Arquivo";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  viewer: {
    width: '100%',
    height: '100vh'
  }
});

const Minuta = ({
  data
}) => {

  return (
    <>
      <PDFViewer style={styles.viewer}>
        <Arquivo 
          data={data} 
        />
      </PDFViewer>
    </>
  );
};

export default Minuta;