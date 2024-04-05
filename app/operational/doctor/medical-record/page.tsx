'use client';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BodyComponent } from 'reactjs-human-body';
import PatientOverview from './patient-overview';
import MedicalRecordForm from '@/modules/medical-records/application/form/medical-record.form';
import MedicationForm from '@/modules/medical-records/application/form/medication.form';
import { useMedicalRecordContext } from '@/contexts/medical-record-context';
import { useEffect, useState } from 'react';
import { MedicineDoses } from '@/modules/medical-records/domain/medical-record';

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
    const [medications, setMedications] = useState<MedicineDoses[]>([]);
    const {activeMedicalRecord, setActiveMedicalRecord} = useMedicalRecordContext();

    if (activeMedicalRecord.id === 0) {
      window.location.href = '/operational/doctor/patients-list';
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
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
                    <MedicalRecordForm />
                  </div>
                  <div className="w-full p-2">
                    <MedicationForm medications={medications} setMedications={setMedications} />    
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
    );
}

export default MedicalRecord;