'use client';

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BodyComponent } from 'reactjs-human-body';
import PatientOverview from './patient-overview';
import MedicalRecordForm from '@/modules/medical-records/application/form/medical-record.form';

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
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
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
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="w-full">
            <Box>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab label="Patient Overview" {...a11yProps(0)} />
                    <Tab label="Diagnosis" {...a11yProps(1)} />
                    <Tab label="Lab Results" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <PatientOverview />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <div className="flex flex-col md:flex-row">
                <div className="w-full p-2 h-[calc(100vh-12rem)] overflow-y-scroll overscroll-contain">
                  <MedicalRecordForm />
                </div>
                <div className="w-full p-2">
                  <h3 className="text-lg text-center font-bold text-black dark:text-white">Head to Toe Checkup</h3>
                  <h3 className="text-md text-center font-light text-black dark:text-white">Tap one of body part below to input the physical checkup result</h3>
                  <BodyComponent bodyModel='male' />
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
        </div>
    );
}

export default MedicalRecord;