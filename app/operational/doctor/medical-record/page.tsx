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
import { Illness, IllnessPatcher, MedicineDosesPatcher, illnessPatcherMapper, medicalRecordPatcherMapper, medicineDosesPatcherMapper } from '@/modules/medical-records/domain/medical-record';
import Footer from '../common/Footer';
import { updateAMedicalRecord } from '@/modules/medical-records/domain/medical-records.actions';
import { useUserContext } from '@/contexts/user-context';
import { useAlertContext } from '@/contexts/alert-context';
import { ALERT_MESSAGE } from '@/constants/alert';
import { Medicine, medicineMapper } from '@/modules/medicines/domain/medicine';
import { getAllMedicines } from '@/modules/medicines/domain/medicines.actions';
import { getAllTreatments } from '@/modules/treatments/domain/treatments.actions';
import { Treatment, TreatmentPatcher, treatmentMapper, treatmentPatcherMapper } from '@/modules/treatments/domain/treatment';
import { VISIT_STATUS } from '@/modules/visits/domain/visit.constants';
import { useVisitContext } from '@/contexts/visit-context';
import { updateVisit } from '@/modules/visits/domain/visits.actions';
import { defaultOrder, orderMapper } from '@/modules/orders/domain/order';
import { getOrdersWithFilter, updateOrder } from '@/modules/orders/domain/order.actions';
import { ORDER_STATUS } from '@/modules/orders/domain/order.constants';
import OrderItem, { OrderItemCreator, orderItemCreatorMapper } from '@/modules/orders/domain/order-item';
import { visitFilter } from '@/modules/orders/domain/order.specifications';

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
    const {activeMedicalRecord, setActiveMedicalRecord, medicineDoses, setMedicineDoses} = useMedicalRecordContext();
    const {activeVisit} = useVisitContext();
    const [order, setOrder] = useState(defaultOrder);
    const {user, accessToken} = useUserContext();
    const {openSnackbarNotification} = useAlertContext();
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [treatments, setTreatments] = useState<Treatment[]>([]);

    useEffect( () => {
      getAllMedicines(accessToken, 1).then( res => {
        let meds:Medicine[] = [];
        res?.map( (medicine) => { meds.push(medicineMapper(medicine)); });
        setMedicines(meds);
      });
      getAllTreatments(accessToken, 1).then( res => {
        let treats:Treatment[] = [];
        res?.map( (treatment) => { treats.push(treatmentMapper(treatment)); });
        setTreatments(treats);
      });
      getOrdersWithFilter(accessToken, visitFilter(activeVisit.id), 1).then( res => {
        if (res.length > 0) {
          let order = orderMapper(res[0]);
          setOrder(order);
        }
      });
    }, [])

    if (activeMedicalRecord.id === 0) {
      window.location.href = '/operational/doctor/patients-list';
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const handleSubmit = async () => {
      let treatmentPatchers:TreatmentPatcher[] = [];
      let medicineDosesPatchers:MedicineDosesPatcher[] = [];
      let illnessPatchers:IllnessPatcher[] = [];
      let orderItems:OrderItemCreator[] = [];

      activeMedicalRecord.treatments?.map( (treatment) => { 
        treatmentPatchers.push(treatmentPatcherMapper(treatment, user.organizationID));
        orderItems.push(orderItemCreatorMapper(null, treatment, user.organizationID));
      })
      medicineDoses.map( (med) => { 
        medicineDosesPatchers.push(medicineDosesPatcherMapper(med, user.organizationID));
        orderItems.push(orderItemCreatorMapper(med, null, user.organizationID));
      });
      activeMedicalRecord.illnesses?.map( (illness) => { illnessPatchers.push(illnessPatcherMapper(illness)) });
      
      let medicalRecordPatcher = medicalRecordPatcherMapper(activeMedicalRecord, illnessPatchers, medicineDosesPatchers, treatmentPatchers);
      await updateAMedicalRecord(accessToken, medicalRecordPatcher.id, medicalRecordPatcher).then( () => {})
        .catch( err => { openSnackbarNotification(ALERT_MESSAGE.server_error, 'error'); console.log(err); return; });

      let visit = { status: VISIT_STATUS.examined };
      updateVisit(accessToken, activeVisit.id, visit).then( () => {
      }).catch( err => { openSnackbarNotification(ALERT_MESSAGE.server_error, 'error'); console.log(err); return; });

      let orderUpdate = { order_items: orderItems, status: ORDER_STATUS.waiting_to_pay };
      updateOrder(accessToken, order.id, orderUpdate).then( () => {
        location.reload();
        openSnackbarNotification(ALERT_MESSAGE.success, 'success');
        window.location.href = "/operational/doctor/patients-list";
        return;
      }).catch( err => { openSnackbarNotification(ALERT_MESSAGE.server_error, 'error'); console.log(err); return; });
    }

    return (
      <form onSubmit={e => { e.preventDefault(); handleSubmit() } }>
        <div className="w-full">
          { activeMedicalRecord.id !== 0 &&
            <>
              <Box>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                      <Tab label="Patient Overview" {...a11yProps(0)} />
                      <Tab label="Diagnosis" {...a11yProps(1)} />
                      <Tab label="Lab Results" {...a11yProps(2)} />
                  </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <PatientOverview medicalRecord={activeMedicalRecord} />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <div className="flex flex-col md:flex-row">
                  <div className="w-full p-2 h-[calc(100vh-12rem)] overflow-y-scroll overscroll-contain">
                    <MedicalRecordForm treatments={treatments} medicalRecord={activeMedicalRecord} setMedicalRecord={setActiveMedicalRecord} />
                  </div>
                  <div className="w-full p-2">
                    <MedicationForm medicines={medicines} medicineDoses={medicineDoses} setMedicineDoses={setMedicineDoses} />    
                  </div>
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                  <div className="flex">
                    <div className="w-full p-1 h-[calc(100vh-7.5rem)] overflow-y-scroll overscroll-contain">
                      <h2 className="text-xl text-center font-extrabold text-black dark:text-white">Lab Results</h2>
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