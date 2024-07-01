'use client';

import React, { useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment/min/moment-with-locales';
import Currency from '../../../components/Currency';
import { useTranslation } from 'react-i18next';
import { useDocumentContext } from '../../../contexts/document-context';
import { useUserContext } from '../../../contexts/user-context';
import { orderItemDisplayName } from "../../../modules/orders/domain/order.specifications";
import { useRouter } from 'next/navigation';
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
  header2: {
    fontSize: 16,
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
    padding: 5,
  },
  tableCol: {
    width: '25%',
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
  alignRight: {
    textAlign: 'right',
  },
  bullet: {
    height: '100%',
  }
});

const OrderDocument = () => {
  const {ordersDocument, from, to} = useDocumentContext();
  const {t} = useTranslation();
  const router = useRouter();
  const {organization} = useUserContext();

  useEffect( () => {
    if (ordersDocument.length <= 0) {
      router.push('/dashboard/orders');
    }
  }, []);

  return (
    <PDFViewer className="w-screen h-screen">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.header}>{t('order_detail')}</Text>
            <Text style={styles.header2}>{organization.name}</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.emptyCol}>
                  <Text style={styles.alignRight}>{t('from')}</Text>
                </View>
                <View style={styles.colSeparator}>
                  <Text style={styles.orderDate}>:</Text>
                </View>
                <View style={styles.emptyCol}>
                  <Text style={styles.orderDate}>{from}</Text>
                </View>
                <View style={styles.emptyCol}>
                  <Text style={styles.alignRight}>{t('to')}</Text>
                </View>
                <View style={styles.colSeparator}>
                  <Text style={styles.orderDate}>:</Text>
                </View>
                <View style={styles.emptyCol}>
                  <Text style={styles.orderDate}>{to}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableCellHeader]}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{t('patients_name')}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{t('visit_date')}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{t('ordered_items')}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{t('total')}</Text>
              </View>
            </View>

            {ordersDocument.map((order, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{order.patient?.name}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{moment(order.date_created).locale('id').format("Do MMMM YYYY")}</Text>
                </View>
                <View style={styles.tableCol}>
                  <View style={styles.table}>
                    {order.order_items?.map( (orderItem) => 
                      <View style={styles.tableRow}>
                        <View style={styles.bullet}>
                          <Text>{'\u2022' + " "}</Text>
                        </View>
                        <Text>{orderItemDisplayName(orderItem)}</Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}><Currency value={order.total} /></Text>
                </View>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
};

export default OrderDocument;