'use client';

import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';
import { MedicalRecord } from '@/modules/medical-records/domain/medical-record';
import { ITEM_TYPE } from '@/modules/items/domain/item.constants';
import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    width: 'auto',
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: 'row',
  },
  titleCol: {
    width: '30%',
  }, 
  totalCol: {
    width: '60%',
    padding: 5,
    textAlign: 'right',
    fontWeight: 'extrabold',
  },  
  colSeparator: {
    width: '2%',
  },
  tableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
  },
  emptyCol: {
    width: '20%',
    padding: 5,
  },
  tableCellHeader: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 5,
  },
  orderDate: {
    marginBottom: 10,
  },
});

interface PrescriptionProps {
    medicalRecord: MedicalRecord,
}

const Prescription = ({ medicalRecord }:PrescriptionProps) => {
  const {t} = useTranslation();

  return (
    <PDFViewer className="w-full h-screen">
      <Document>
        <Page size="A5" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.header}>{t('prescription')}</Text>
          </View>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableCellHeader]}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{t('medicine_name')}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{t('doses')}</Text>
              </View>
            </View>

            {medicalRecord.items.map((item, index) => (
                item.type === ITEM_TYPE.medicine &&
                <View key={index} style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{item.items_id.name}</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{item.notes}</Text>
                    </View>
                </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
};

export default Prescription;