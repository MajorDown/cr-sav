'use client'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Refurbishment, SAV } from '@/constants/types';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
    margin: 20,
    fontSize: 12,
  },
  title: {
    marginBottom: 10
  },
    lister: {
        flexDirection: 'column',
        backgroundColor: 'transparent',
        marginBottom: 10
    },
  content: {
    flexDirection: 'column',
    backgroundColor: 'transparent', 
    border: 1,
    padding: 5,
    width: '90%',
  },
  interventionsList: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    gap: 5
  },
  intervention: {
    backgroundColor: 'orange',
  },
  isDone: {
    backgroundColor: 'green',
  }
});

type PdfReportProps = {
    listOfRefurb: Refurbishment[];
    listOfSAV: SAV[];
}

// Create Document Component
const PdfReport = (props: PdfReportProps) => {

    const defineActualDate = () => {
        const date = new Date();
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    };

    const formatDate = (date: Date) => {
        const actualDate = new Date(date);
        return `${actualDate.getDate()}-${actualDate.getMonth() + 1}-${actualDate.getFullYear()}`;
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.title}>
                    <Text>Rapport des SAV et reconditionnements du {defineActualDate()}</Text>
                </View>

                {/* Liste des SAV */}
                <View style={styles.lister}>
                    <Text>Liste des SAV</Text>
                    {props.listOfSAV && props.listOfSAV.length > 0 ? (
                        props.listOfSAV.map((sav) => (
                            <View style={styles.content} key={sav.id}>
                                <Text>{sav.id} : {sav.product.constructor} {sav.product.model} vendu le {formatDate(sav.product.saleDate)} : {sav.log[sav.log.length - 1].status}</Text>
                                <View style={styles.interventionsList}>
                                    {sav.log[sav.log.length - 1].interventions.map((intervention, index) => (
                                        <Text key={index} style={intervention.isDone ? styles.isDone : styles.intervention}>
                                            {intervention.todo}{intervention.isDone ? " : fait" : ""}
                                        </Text>
                                    ))}
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text>Aucun SAV disponible</Text>
                    )}
                </View>

                {/* Liste des Reconditionnements */}
                <View style={styles.lister}>
                    <Text>Liste des Reconditionnements</Text>
                    {props.listOfRefurb && props.listOfRefurb.length > 0 ? (
                        props.listOfRefurb.map((sav) => (
                            <View style={styles.content} key={sav.id}>
                                <Text>{sav.id} : {sav.product.constructor} {sav.product.model} vendu le {formatDate(sav.product.buyDate)} : {sav.log[sav.log.length - 1].status}</Text>
                                <View style={styles.interventionsList}>
                                    {sav.log[sav.log.length - 1].interventions.map((intervention, index) => (
                                        <Text key={index} style={intervention.isDone ? styles.isDone : styles.intervention}>
                                            {intervention.todo}{intervention.isDone ? " : fait" : ""}
                                        </Text>
                                    ))}
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text>Aucun reconditionnement disponible</Text>
                    )}
                </View>
            </Page>
        </Document>
    );
};

export default PdfReport;
