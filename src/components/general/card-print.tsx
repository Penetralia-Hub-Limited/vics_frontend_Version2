import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {},
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const CardPrint = () => {
  return (
    <PDFViewer>
      <Document>
        <Page size="A4" style={styles.page}>
          <CardFront />
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default CardPrint;

const frontStyles = StyleSheet.create({
  view: {
    padding: 10,
    border: "solid",
    borderWidth: "1px",
    borderRadius: "10px",
  },
});

const CardFront = () => {
  return (
    <View style={frontStyles.view}>
      <Text>Section #1</Text>
    </View>
  );
};
