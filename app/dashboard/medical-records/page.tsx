'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import DashboardModal from "@/components/Modal/Modal";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import MedicalRecordDeleteConfirmation from "@/modules/medical-records/application/form/medical-record.delete-confirmation";
import MedicalRecordForm from "@/modules/medical-records/application/form/medical-record.form";
import MedicalRecordListTable from "@/modules/medical-records/application/list/medical-record.list-table";
import { MedicalRecord, defaultMedicalRecord, medicalRecordMapper } from "@/modules/medical-records/domain/medical-record";
import { deleteAMedicalRecord, getMedicalRecordsWithFilter, getTotalMedicalRecords, getTotalMedicalRecordsWithFilter, searchMedicalRecords } from "@/modules/medical-records/domain/medical-records.actions";
import { MR_STATUS } from "@/modules/medical-records/domain/medical-records.constants";
import { useEffect, useState } from "react";
import moment from "moment";
import { statusEquals } from "@/modules/visits/domain/visit.specifications";
import { dateRangeFilter } from "@/modules/medical-records/domain/medical-record.specifications";
import { DatePicker } from "@mui/x-date-pickers";
import MedicalRecordView from "@/modules/medical-records/application/medical-record.view";
import { useTranslations } from "next-intl";

const MedicalRecordsDashboardPage = () => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const {accessToken} = useUserContext();
  const {openSnackbarNotification} = useAlertContext();
  const [activeMedicalRecord, setActiveMedicalRecord] = useState(defaultMedicalRecord);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const t = useTranslations();
  const [fromDate, setFromDate] = useState<Date|null>(null);
  const [toDate, setToDate] = useState<Date|null>(null);
  
  const [filter, setFilter] = useState<object>({ _and: [ statusEquals(MR_STATUS.complete) ] })

  const fetchMedicalRecords = (newFilter:object) => {
    setDataLoaded(false);
    getMedicalRecordsWithFilter(accessToken, newFilter, 1)
      .then( res => {
        let records:MedicalRecord[] = [];
        res?.map( (record) => { records.push(medicalRecordMapper(record)); });
        setMedicalRecords(records);
        setDataLoaded(true);
      });
    getTotalMedicalRecordsWithFilter(accessToken, newFilter)
      .then( res => {
        let total = res[0].count? parseInt(res[0].count) : 0;
        let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
        setTotalPages(pages);
      });
    setFilter(newFilter);
  }

  useEffect( () => {
    if (!dataLoaded || medicalRecords.length == 0) {
      searchMedicalRecords(accessToken, filter, 1)
        .then( res => {
          let records:MedicalRecord[] = [];
          res?.map( (record) => { records.push(medicalRecordMapper(record)); });
          setMedicalRecords(records);
          setDataLoaded(true);
        });
      getTotalMedicalRecordsWithFilter(accessToken, filter)
        .then( res => {
          let total = res[0].count? parseInt(res[0].count) : 0;
          let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
          setTotalPages(pages);
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
    getMedicalRecordsWithFilter(accessToken, filter, value)
      .then( res => {
        let records:MedicalRecord[] = [];
        res?.map( (record) => { records.push(medicalRecordMapper(record)); });
        setMedicalRecords(records);
        setDataLoaded(true);
      });
  }

  const handleDelete = () => {
    deleteAMedicalRecord(accessToken, activeMedicalRecord.id)
      .then( () => {
        openSnackbarNotification(t("alert_msg.success"), "success");
        window.location.reload();
      }).catch( () => {
        openSnackbarNotification(t("alert_msg.server_error"), "error");
      })
  }

  const onFromChange = (val:Date|undefined) => {
    if (typeof(val) === "undefined") {
      return;
    }
    setFromDate(val);

    if (toDate === null) {
      return;
    }
    let newFilter:object = { _and: [ statusEquals(MR_STATUS.complete), dateRangeFilter(val, toDate) ] }
    fetchMedicalRecords(newFilter);
  }

  const onToChange = (val:Date|undefined) => {
    if (typeof(val) === "undefined") {
      return;
    }
    setToDate(val);
    
    if (fromDate === null) {
      return;
    }
    let newFilter:object = { _and: [ statusEquals(MR_STATUS.complete), dateRangeFilter(fromDate, val) ] }
    fetchMedicalRecords(newFilter);
  }
  
  return (
    <>
      <DashboardModal open={editModalOpen} handleClose={ () => handleModal(true, true) } children={ <MedicalRecordView medicalRecord={activeMedicalRecord} /> } title="Medical Record Detail" />
      <DashboardModal open={deleteModalOpen} handleClose={ () => handleModal(true, false) } children={ <MedicalRecordDeleteConfirmation handleClose={ () => handleModal(true, false)} handleDelete={handleDelete} /> } title="" />
      <Breadcrumb pageName={t("menu.medical_records")} />

      <div className="flex flex-row gap-3 mb-3">
        <DatePicker label={t('from')} onChange={ e => onFromChange(e?.toDate()) } maxDate={moment(toDate)} />
        <DatePicker label={t('to')} onChange={ e => onToChange(e?.toDate()) } minDate={moment(fromDate)} />
      </div>

      <div className="flex flex-col gap-10">
        { !dataLoaded && <div className="flex"><div className="h-16 w-16 m-auto animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" /></div> }    
        { dataLoaded && <MedicalRecordListTable medicalRecords={medicalRecords} handleModal={handleModal} totalPages={totalPages} handlePageChange={handlePageChange} setActiveMedicalRecord={setActiveMedicalRecord} /> }
      </div>
    </>
  );
};

export default MedicalRecordsDashboardPage;