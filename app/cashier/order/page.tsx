'use client';

import React, { useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment/min/moment-with-locales';
import Currency from '@/components/Currency';
import { useDocumentContext } from '@/contexts/document-context';
import { DoctorName } from '@/utils/doctor-name-format';
import { useUserContext } from '@/contexts/user-context';
import { useRouter } from 'next/navigation';
import dynamic from "next/dynamic";
import { useTranslations } from 'next-intl';
import { Order } from '@/modules/orders/domain/order';

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
  },
  tableCol: {
    width: '20%',
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
    fontWeight: 700,
  },
  tableCell: {
    padding: 5,
  },
  orderDate: {
    marginBottom: 10,
  },
});

interface OrderDocumentProps {
  order: Order,
}

const Receipt = ({ order }:OrderDocumentProps) => {
  const {organization} = useUserContext();
  const t = useTranslations();
  const router = useRouter();

  useEffect( () => {
    if (order.id === "") {
      router.push('/dashboard/orders');
    }
  }, []);

  return (
    <PDFViewer className="w-full h-screen">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.header}>{t('order_detail')}</Text>
            <Text style={styles.header2}>{organization.name}</Text>
            <View style={styles.table}>
                { order.visit?.patient?.name &&
                  <>
                    <View style={styles.tableRow}>
                      <View style={styles.titleCol}>
                        <Text style={styles.orderDate}>{t('patients_name')}</Text>
                      </View>
                      <View style={styles.colSeparator}>
                        <Text style={styles.orderDate}>:</Text>
                      </View>
                      <View style={styles.titleCol}>
                        <Text style={styles.orderDate}>{ order.visit.patient.name }</Text>
                      </View>
                    </View>
                  </>
                }
                <View style={styles.tableRow}>
                  <View style={styles.titleCol}>
                    <Text style={styles.orderDate}>{t('visit_date')}</Text>
                  </View>
                  <View style={styles.colSeparator}>
                    <Text style={styles.orderDate}>:</Text>
                  </View>
                  <View style={styles.titleCol}>
                    <Text style={styles.orderDate}>{moment(order.date_created).locale('id').format("Do MMMM YYYY")}</Text>
                  </View>
                </View>
                { order.visit?.doctor?.name &&
                  <>
                    <View style={styles.tableRow}>
                      <View style={styles.titleCol}>
                        <Text style={styles.orderDate}>{t('doctor_visited')}</Text>
                      </View>
                      <View style={styles.colSeparator}>
                        <Text style={styles.orderDate}>:</Text>
                      </View>
                      <View style={styles.titleCol}>
                        <Text style={styles.orderDate}>{ DoctorName(order.visit.doctor.name, order.visit.doctor.specialization) }</Text>
                      </View>
                    </View>
                  </>
                }
              </View>
          </View>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableCellHeader]}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{t('item_name')}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{t('quantity')}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{t('unit')}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{t('unit_price')}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{t('subtotal')}</Text>
              </View>
            </View>

            {order.order_items.map((orderItem, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{orderItem.item.name}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{orderItem.quantity}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{orderItem.item.unit}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}><Currency value={orderItem.item.price} /></Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}><Currency value={orderItem.quantity * orderItem.item.price} /></Text>
                </View>
              </View>
            ))}
              <View style={styles.tableRow}>
                <View style={styles.emptyCol}></View>
                <View style={styles.totalCol}>
                  <Text style={styles.tableCell}>Total ({t('with_exam_fee_and_tax')} {organization.tax_rate}%)</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}><Currency value={order.total} /></Text>
                </View>
              </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
};

export default Receipt;