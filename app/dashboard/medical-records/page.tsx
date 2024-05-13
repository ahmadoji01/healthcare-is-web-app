'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import DashboardModal from "@/components/Modal/Modal";
import { ALERT_MESSAGE } from "@/constants/alert";
import { useAlertContext } from "@/contexts/alert-context";
import { useMedicalRecordContext } from "@/contexts/medical-record-context";
import { useUserContext } from "@/contexts/user-context";
import MedicalRecordDeleteConfirmation from "@/modules/medical-records/application/form/medical-record.delete-confirmation";
import MedicalRecordForm from "@/modules/medical-records/application/form/medical-record.form";
import MedicalRecordListTable from "@/modules/medical-records/application/list/medical-record.list-table";
import { MedicalRecord, defaultMedicalRecord, medicalRecordMapper } from "@/modules/medical-records/domain/medical-record";
import { deleteAMedicalRecord, getAllMedicalRecords } from "@/modules/medical-records/domain/medical-records.actions";
import { useEffect, useState } from "react";

const MedicalRecordsDashboardPage = () => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const {accessToken} = useUserContext();
  const {openSnackbarNotification} = useAlertContext();
  const [activeMedicalRecord, setActiveMedicalRecord] = useState(defaultMedicalRecord);
  const [medicalRecords, setmedicalRecords] = useState<MedicalRecord[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect( () => {
    if (!dataLoaded || medicalRecords.length == 0) {
      getAllMedicalRecords(accessToken, 1)
        .then( res => {
          let records:MedicalRecord[] = [];
          res?.map( (record) => { records.push(medicalRecordMapper(record)); });
          setmedicalRecords(records);
          setDataLoaded(true);
        });
    }
  });

  const handleModal = (closeModal:boolean, whichModal: boolean) => {
    if(closeModal) {
      setEditModalOpen(false);
      setDeleteModalOpen(false);
      return;
    }

    if (whichModal) {
      setEditModalOpen(true);
      setDeleteModalOpen(false);
    } else {
      setEditModalOpen(false);
      setDeleteModalOpen(true);
    }
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setDataLoaded(false);
    getAllMedicalRecords(accessToken, 1)
      .then( res => {
        let records:MedicalRecord[] = [];
        res?.map( (record) => { records.push(medicalRecordMapper(record)); });
        setmedicalRecords(records);
        setDataLoaded(true);
      });
  }

  const handleView = (medicalRecord:MedicalRecord) => {
    
  } 

  const handleDelete = () => {
    deleteAMedicalRecord(accessToken, activeMedicalRecord.id)
      .then( () => {
        openSnackbarNotification(ALERT_MESSAGE.success, "success");
        window.location.reload();
      }).catch( () => {
        openSnackbarNotification(ALERT_MESSAGE.server_error, "error");
      })
  }
  
  return (
    <>
      <DashboardModal open={editModalOpen} handleClose={ () => handleModal(true, true) } children={ <MedicalRecordForm treatments={activeMedicalRecord.treatments} medicalRecord={activeMedicalRecord} setMedicalRecord={setActiveMedicalRecord} /> } title="Medical Record Detail" />
      <DashboardModal open={deleteModalOpen} handleClose={ () => handleModal(true, false) } children={ <MedicalRecordDeleteConfirmation handleClose={ () => handleModal(true, false)} handleDelete={handleDelete} /> } title="" />
      <Breadcrumb pageName="Medical Records" />

      <div className="flex flex-col gap-10">
        <MedicalRecordListTable medicalRecords={medicalRecords} handleModal={handleModal} totalPages={totalPages} handlePageChange={handlePageChange} setActiveMedicalRecord={setActiveMedicalRecord} />
      </div>
    </>
  );
};

export default MedicalRecordsDashboardPage;