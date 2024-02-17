import Typography from '@mui/material/Typography';
import PatientReview from '@/modules/patients/application/patient.review';
import { usePatientContext } from '@/contexts/patient-context';
import VisitReview from '@/modules/visits/application/visit.review';
import { useVisitContext } from '@/contexts/visit-context';
import { useDoctorContext } from '@/contexts/doctor-context';
import { defaultVisit } from '@/modules/visits/domain/visit';
import { useEffect, useState } from 'react';

interface ReviewProps {
  status: string,
}

export default function Review({ status }:ReviewProps) {

  const [visit, setVisit] = useState(defaultVisit);

  const {activePatient} = usePatientContext();
  const {activeDoctor} = useDoctorContext();

  useEffect( () => { 
    let visit = defaultVisit; 
    visit.status = status; 
    setVisit(visit);
  }, [visit])

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Patient summary
      </Typography>
      <VisitReview visit={visit} doctor={activeDoctor} />
      <span className="mb-6" />
      <PatientReview patient={activePatient} />
    </>
  );
}