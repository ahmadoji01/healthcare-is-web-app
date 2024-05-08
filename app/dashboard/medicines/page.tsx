'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import DashboardModal from "@/components/Modal/Modal";
import Spinner from "@/components/Spinner";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import MedicineDeleteConfirmation from "@/modules/medicines/application/form/medicine.delete-confirmation";
import MedicineForm from "@/modules/medicines/application/form/medicine.form";
import MedicineListTable from "@/modules/medicines/application/list/medicine.list-table";
import { Medicine, defaultMedicine, medicineMapper } from "@/modules/medicines/domain/medicine";
import { getAllMedicines, getTotalMedicines, searchMedicines } from "@/modules/medicines/domain/medicines.actions";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

let activeTimeout = null;

const MedicinesDashboardPage = () => {
  
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const {accessToken} = useUserContext();
  const {openSnackbarNotification} = useAlertContext();
  const [activeMedicine, setActiveMedicine] = useState<Medicine>(defaultMedicine);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect( () => {
    if (!dataLoaded || medicines.length == 0) {
      getAllMedicines(accessToken, 1)
        .then( res => {
          let meds:Medicine[] = [];
          res?.map( (medicine) => { meds.push(medicineMapper(medicine)); });
          setMedicines(meds);
          setDataLoaded(true);
        });
      getTotalMedicines(accessToken)
        .then( res => { 
          let total = res[0].count? parseInt(res[0].count) : 0;
          let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
          setTotalPages(pages);
        })
    }
  }, [medicines]);

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
    searchMedicines(accessToken, searchQuery, value)
      .then( res => {
        let meds:Medicine[] = [];
        res?.map( (medicine) => { meds.push(medicineMapper(medicine)); });
        setMedicines(meds);
        setDataLoaded(true);
      });
  };

  const handleSearch = (query:string) => {
    if (query.length > 3) {
      setDataLoaded(false);
      searchMedicines(accessToken, query, 1).then( res => {
        let meds:Medicine[] = [];
        res?.map( (medicine) => { meds.push(medicineMapper(medicine)); });
        setMedicines(meds);
        setDataLoaded(true);
      })
    }
  }

  const handleChange = (query:string) => {
    setSearchQuery(query);
    if (activeTimeout) {
      clearTimeout(activeTimeout);
    }
    
    activeTimeout = setTimeout(() => {
      handleSearch(query);
    }, 1000);
  }

  const handleSubmit = (medicine:Medicine) => {
    console.log(medicine);
  }
  
  return (
    <>
      <DashboardModal open={editModalOpen} handleClose={ () => handleModal(true, true) } children={ <MedicineForm initMedicine={activeMedicine} handleSubmit={handleSubmit} /> } title="Doctor's Detail" />
      <DashboardModal open={deleteModalOpen} handleClose={ () => handleModal(true, false) } children={ <MedicineDeleteConfirmation handleClose={ () => handleModal(true, false)} /> } title="" />
      <Breadcrumb pageName="Medicines" />

      <div className="relative mb-4">
        <button className="absolute left-0 top-1/2 -translate-y-1/2">
          <FontAwesomeIcon icon={faSearch} width={20} />
        </button>

        <input
          type="text"
          placeholder="Type to search..."
          onChange={e => {handleChange(e.target.value) }}
          className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
          />
      </div>

      <div className="flex flex-col gap-10">
        { !dataLoaded && <div className="flex"><Spinner /></div> }    
        { dataLoaded && <MedicineListTable medicines={medicines} totalPages={totalPages} handleModal={handleModal} handlePageChange={handlePageChange} setActiveMedicine={setActiveMedicine} /> }
        </div>
    </>
  );
};

export default MedicinesDashboardPage;