import { useEffect, useState } from 'react';
import { Page, Text, Image, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    margin: 20,
    fontSize: 12,
  },
  text: {
    fontSize: 12,
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  supplierSection: {
    marginBottom: 20,
  },
  piecesList: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  pieceLine: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },
  isOrdered: {
    backgroundColor: 'rgb(222, 241, 210)'
  },
  isReceived: {
    backgroundColor: 'rgb(188, 214, 205)'
  }
});

// Create Document Component
const PdfReport = () => {

  const defineActualDate = () => {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.title}>
          <Text style={styles.text}>Rapport des Reconditionnement et SAV du {defineActualDate()}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfReport;