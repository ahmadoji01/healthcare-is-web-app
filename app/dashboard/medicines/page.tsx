'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import MedicineListTable from "@/modules/medicines/application/list/medicine.list-table";
import { Medicine, defaultMedicine, medicineMapper } from "@/modules/medicines/domain/medicine";
import { getAllMedicines } from "@/modules/medicines/domain/medicines.actions";
import { useEffect, useState } from "react";

const MedicinesDashboardPage = () => {
  
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const {accessToken} = useUserContext();
  const {openSnackbarNotification} = useAlertContext();
  const [activeMedicine, setActiveMedicine] = useState<Medicine>(defaultMedicine);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect( () => {
    if (!dataLoaded || medicines.length == 0) {
      getAllMedicines(accessToken, 1)
        .then( res => {
          let meds:Medicine[] = [];
          res?.map( (medicine) => { meds.push(medicineMapper(medicine)); });
          setMedicines(meds);
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
    getAllMedicines(accessToken, 1)
      .then( res => {
        let meds:Medicine[] = [];
        res?.map( (medicine) => { meds.push(medicineMapper(medicine)); });
        setMedicines(meds);
        setDataLoaded(true);
      });
  };
  
  return (
    <>
      <Breadcrumb pageName="Medicines" />

      <div className="flex flex-col gap-10">
        <MedicineListTable medicines={medicines} totalPages={totalPages} handleModal={handleModal} handlePageChange={handlePageChange} setActiveMedicine={setActiveMedicine} />
      </div>
    </>
  );
};

export default MedicinesDashboardPage;