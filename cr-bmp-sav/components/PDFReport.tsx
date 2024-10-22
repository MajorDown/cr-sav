import { useEffect, useState } from 'react';
import { Page, Text, Image, View, Document, StyleSheet } from '@react-pdf/renderer';
import { SAV, Refurbishment } from '@/constants/types';
import { useRefurbContext} from '@/contexts/RefurbContext';
import { useSAVContext } from '@/contexts/SAVContext';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    margin: 20,
    fontSize: 12,
  },
  content: {
    flexDirection: 'column',
    backgroundColor: 'transparent',  
  },
  intervention: {
    backgroundColor: 'orange',
  },
  isDone: {
    backgroundColor: 'green'
  }
});

// Create Document Component
const PdfReport = () => {
    const {listOfRefurb} = useRefurbContext();
    const {listOfSAV} = useSAVContext();

    const defineActualDate = () => {
        const date = new Date();
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }

    const formatDate = (date: Date) => {
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <Text>Rapport des SAV et reconditionnements du {defineActualDate()}</Text>
                </View>
                <View>
                    <Text>Liste des SAV</Text>
                    {listOfSAV?.map((sav) => (<View style={styles.content}>
                        <Text>{sav.id} : {sav.product.constructor} {sav.product.model} vendu le {formatDate(sav.product.saleDate)} : {sav.log[sav.log.length-1].status}</Text>
                        {sav.log[sav.log.length-1].interventions.map((intervention) => (<Text style={intervention.isDone ? styles.isDone : styles.intervention}>{intervention.todo}{intervention.isDone? " : ✓" : ""}</Text>))}
                    </View>)
                    )}
                </View>
                <View>
                    <Text>Liste des Reconditionnements</Text>
                    {listOfRefurb?.map((sav) => (<View style={styles.content}>
                        <Text>{sav.id} : {sav.product.constructor} {sav.product.model} vendu le {formatDate(sav.product.buyDate)} : {sav.log[sav.log.length-1].status}</Text>
                        {sav.log[sav.log.length-1].interventions.map((intervention) => (<Text style={styles.intervention}>{intervention.todo}{intervention.isDone? " : ✓" : ""}</Text>))}
                    </View>)
                    )}
                </View>
            </Page>
        </Document>
    );
};

export default PdfReport;