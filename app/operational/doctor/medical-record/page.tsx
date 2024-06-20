'use client';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PatientOverview from './patient-overview';
import MedicalRecordForm from '@/modules/medical-records/application/form/medical-record.form';
import MedicationForm from '@/modules/medical-records/application/form/medication.form';
import { useMedicalRecordContext } from '@/contexts/medical-record-context';
import { useEffect, useState } from 'react';
import { IllnessPatcher, MRItemCreator, MedicalRecord, MedicalRecordItem, MedicineDosesPatcher, illnessPatcherMapper, medicalRecordMapper, medicalRecordPatcherMapper, medicineDosesPatcherMapper, mrItemCreatorMapper } from '@/modules/medical-records/domain/medical-record';
import Footer from '../common/Footer';
import { getCompleteMedicalRecords, updateAMedicalRecord } from '@/modules/medical-records/domain/medical-records.actions';
import { useUserContext } from '@/contexts/user-context';
import { useAlertContext } from '@/contexts/alert-context';
import { Medicine, medicineMapper } from '@/modules/medicines/domain/medicine';
import { getAllMedicines } from '@/modules/medicines/domain/medicines.actions';
import { getAllTreatments } from '@/modules/treatments/domain/treatments.actions';
import { Treatment, TreatmentOrg, treatmentMapper, treatmentOrgMapper } from '@/modules/treatments/domain/treatment';
import { VISIT_STATUS } from '@/modules/visits/domain/visit.constants';
import { useVisitContext } from '@/contexts/visit-context';
import { updateVisit } from '@/modules/visits/domain/visits.actions';
import { defaultOrder, orderMapper } from '@/modules/orders/domain/order';
import { getOrdersWithFilter, updateOrder } from '@/modules/orders/domain/order.actions';
import { ORDER_STATUS } from '@/modules/orders/domain/order.constants';
import { OrderItemCreator, orderItemCreatorMapper } from '@/modules/orders/domain/order-item';
import { visitFilter } from '@/modules/orders/domain/order.specifications';
import { MR_STATUS } from '@/modules/medical-records/domain/medical-records.constants';
import { useTranslation } from 'react-i18next';
import { getItemsWithFilter } from '@/modules/items/domain/items.actions';
import { medicineItemsFilter, treatmentItemsFilter } from '@/modules/items/domain/item.specifications';
import { Item, itemMapper } from '@/modules/items/domain/item';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
  
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const MedicalRecord = () => {
    const [value, setValue] = useState(0);
    const [medicines, setMedicines] = useState<Item[]>([]);
    const [mrMedicines, setMRMedicines] = useState<MedicalRecordItem[]>([]);
    const [treatments, setTreatments] = useState<Item[]>([]);
    const [mrTreatments, setMRTreatments] = useState<MedicalRecordItem[]>([]);
    const [order, setOrder] = useState(defaultOrder);
    const [medHistories, setMedHistories] = useState<MedicalRecord[]>([]);
    
    const {activeMedicalRecord, setActiveMedicalRecord, medicineDoses, setMedicineDoses} = useMedicalRecordContext();
    const {activeVisit} = useVisitContext();
    const {organization, accessToken} = useUserContext();
    const {openSnackbarNotification} = useAlertContext();
    const {t} = useTranslation();
    
    useEffect( () => {
      getItemsWithFilter(accessToken, medicineItemsFilter, 1).then( res => {
        let items:Item[] = [];
        res?.map( (item) => { items.push(itemMapper(item)); });
        setMedicines(items);
      });
      getItemsWithFilter(accessToken, treatmentItemsFilter, 1).then( res => {
        let items:Item[] = [];
        res?.map( (item) => { items.push(itemMapper(item)); });
        setTreatments(items);
      });
      getOrdersWithFilter(accessToken, visitFilter(activeVisit.id), 1).then( res => {
        if (res.length > 0) {
          let order = orderMapper(res[0]);
          setOrder(order);
        }
      });
      getCompleteMedicalRecords(accessToken, activeMedicalRecord.patient.id).then( res => {
        console.log(res);
        let mrs:MedicalRecord[] = [];
        res?.map( (mr) => { mrs.push(medicalRecordMapper(mr)); });
        setMedHistories(mrs);
      })
    }, []);

    if (activeMedicalRecord.id === 0) {
      window.location.href = '/operational/doctor/patients-list';
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const handleSubmit = async () => {
      let illnessPatchers:IllnessPatcher[] = [];
      let itemsCreator:MRItemCreator[] = [];
      let orderItems:OrderItemCreator[] = [];

      mrTreatments?.map( (treatment) => {
        itemsCreator.push(mrItemCreatorMapper(treatment, organization.id));
        orderItems.push(orderItemCreatorMapper(treatment, organization.id));
      });
      mrMedicines?.map( (medicine) => {
        itemsCreator.push(mrItemCreatorMapper(medicine, organization.id));
        orderItems.push(orderItemCreatorMapper(medicine, organization.id));
      })
      activeMedicalRecord.illnesses?.map( (illness) => { illnessPatchers.push(illnessPatcherMapper(illness)) });
      
      let medicalRecordPatcher = medicalRecordPatcherMapper(activeMedicalRecord, itemsCreator, illnessPatchers, [], [], organization.id, MR_STATUS.complete);
      
      await updateAMedicalRecord(accessToken, medicalRecordPatcher.id, medicalRecordPatcher).then( () => {})
        .catch( err => { openSnackbarNotification(t('alert_msg.server_error'), 'error'); return; });
      
      let visit = { status: VISIT_STATUS.examined };
      updateVisit(accessToken, activeVisit.id, visit).then( () => {
      }).catch( err => { openSnackbarNotification(t('alert_msg.server_error'), 'error'); return; });

      let orderUpdate = { order_items: orderItems, status: ORDER_STATUS.waiting_to_pay };
      
      updateOrder(accessToken, order.id, orderUpdate).then( () => {
        location.reload();
        openSnackbarNotification(t('alert_msg.success'), 'success');
        window.location.href = "/operational/doctor/patients-list";
        return;
      }).catch( err => { openSnackbarNotification(t('alert_msg.server_error'), 'error'); return; });
    }

    return (
      <form onSubmit={e => { e.preventDefault(); handleSubmit() } }>
        <div className="w-full">
          { activeMedicalRecord.id !== 0 &&
            <>
              <Box>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                      <Tab label={ t('patient_overview') } {...a11yProps(0)} />
                      <Tab label={ t('diagnosis') } {...a11yProps(1)} />
                  </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <PatientOverview medicalRecord={activeMedicalRecord} medicalHistories={medHistories} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <div className="flex flex-col md:flex-row mb-8">
                  <div className="w-full p-2 mb-8">
                    <MedicalRecordForm treatments={treatments} medicalRecord={activeMedicalRecord} setMRTreatments={setMRTreatments} setMedicalRecord={setActiveMedicalRecord} />
                    <span className="mb-8" />
                  </div>
                  <div className="w-full p-2">
                    <MedicationForm medicines={medicines} mrMedicines={mrMedicines} setMRMedicines={setMRMedicines} />    
                  </div>
                </div>
              </CustomTabPanel>
            </>
          }
        </div>
        <Footer />
      </form>
    );
}

export default MedicalRecord;