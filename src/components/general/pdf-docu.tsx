"use client";

import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import LogoComponent from "./logo";
import logo from "../../assets/logo/icon_green.svg";

const PDFDocument = () => {
  return (
    <Document>
      <Page size="A4" style={[styles.page, styles.container]}>
        <View>
          <LogoComponent logo={logo} state={"kwara state"} />
        </View>

        <View style={styles.header}>
          <Text style={[styles.headerText]}>Invoice</Text>
          <Text style={[styles.headerText]}>#INVVSTY</Text>
        </View>

        <View style={[styles.section, styles.container]}>
          <Text>Section #1</Text>
        </View>

        <View style={[styles.section, styles.container]}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFE8CC",
    gap: 20,
  },
  container: {
    border: 1,
    borderColor: "red",
    borderRadius: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    // flexGrow: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  headerText: {
    fontWeight: "bold",
  },
});
