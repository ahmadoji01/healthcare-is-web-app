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
import { Medicine, defaultMedicine, medicineMapper, medicinePatcherMapper } from "@/modules/medicines/domain/medicine";
import { getAllMedicineCategories } from "@/modules/medicines/domain/medicine-categories.actions";
import MedicineCategory, { medicineCategoryMapper } from "@/modules/medicines/domain/medicine-category";
import { deleteAMedicine, getAllMedicines, getTotalMedicines, getTotalSearchMedicines, searchMedicines, updateAMedicine } from "@/modules/medicines/domain/medicines.actions";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

let activeTimeout = null;

const MedicinesDashboardPage = () => {
  
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<MedicineCategory[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [activeMedicine, setActiveMedicine] = useState<Medicine>(defaultMedicine);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {accessToken} = useUserContext();
  const {openSnackbarNotification} = useAlertContext();
  
  const fetchAllMedicines = () => {
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
      });
  }

  useEffect( () => {
    getAllMedicineCategories(accessToken, 1)
      .then(res => {
        let cats:MedicineCategory[] = [];
        res?.map( category => { cats.push(medicineCategoryMapper(category)) });
        setCategories(cats);
      })
  }, []);

  useEffect( () => {
    if (!dataLoaded || medicines.length == 0) {
      fetchAllMedicines();
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
  }

  const handleSubmit = (medicine:Medicine) => {
    updateAMedicine(accessToken, medicine.id, medicinePatcherMapper(medicine))
      .then( () => {
        openSnackbarNotification(t("alert_msg.success"), "success");
        window.location.reload();
      }).catch( () => {
        openSnackbarNotification(t("alert_msg.server_error"), "error");
      })
  } 

  const handleSearch = (query:string) => {
    if (query.length > 3) {
      setDataLoaded(false);
      searchMedicines(accessToken, query, 1).then( res => {
        let meds:Medicine[] = [];
        res?.map( (medicine) => { meds.push(medicineMapper(medicine)); });
        setMedicines(meds);
        setDataLoaded(true);
      });
      getTotalSearchMedicines(accessToken, query)
        .then( res => {
          let total = res[0].count? parseInt(res[0].count) : 0;
          let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
          setTotalPages(pages);
        });
    }
    if (query.length === 0) {
      setDataLoaded(false);
      fetchAllMedicines();
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

  const handleDelete = () => {
    deleteAMedicine(accessToken, activeMedicine.id)
      .then( () => {
        openSnackbarNotification(t("alert_msg.success"), "success");
        window.location.reload();
      }).catch( () => {
        openSnackbarNotification(t("alert_msg.server_error"), "error");
      })
  }

  const handleSubmitQty = (medicine:Medicine) => {
    updateAMedicine(accessToken, medicine.id, { stock: medicine.stock })
      .then( () => {
        openSnackbarNotification(t("alert_msg.success"), "success");
      }).catch( () => {
        openSnackbarNotification(t("alert_msg.server_error"), "error");
      })
  } 

  const handleQtyChange = (action:string, medicine:Medicine, index:number, qty:number) => {
    if (typeof(medicine) === 'undefined') {
        return;
    }
    let newMeds = [...medicines];
    let med = {...medicines[index]};
    let stock = med.stock;
    if (action === 'substract' && stock === 1) {
      return;
    }
    if (action === 'substract') {
      stock--;
    }
    if (action === 'add') {
      stock++;
    }
    if (action === 'input') {
      stock = qty;
    }
    med.stock = stock;
    newMeds[index] = med;
    setMedicines(newMeds);
    handleSubmitQty(med);
    return;
  }
  
  return (
    <>
      <DashboardModal open={editModalOpen} handleClose={ () => handleModal(true, true) } children={ <MedicineForm setCategoryName={setCategoryName} categories={categories} initMedicine={activeMedicine} handleSubmit={handleSubmit} /> } title="Doctor's Detail" />
      <DashboardModal open={deleteModalOpen} handleClose={ () => handleModal(true, false) } children={ <MedicineDeleteConfirmation medicine={activeMedicine} handleDelete={handleDelete} handleClose={ () => handleModal(true, false)} /> } title="" />
      <Breadcrumb pageName="Medicines" />

      <div className="relative mb-4">
        <button className="absolute left-0 top-1/2 -translate-y-1/2">
          <FontAwesomeIcon icon={faSearch} width={20} />
        </button>

        <input
          type="search"
          placeholder={ t("type_to_search") }
          onChange={e => {handleChange(e.target.value) }}
          className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
          />
      </div>

      <div className="flex flex-col gap-10">
        { !dataLoaded && <div className="flex"><Spinner /></div> }    
        { dataLoaded && <MedicineListTable handleQtyChange={handleQtyChange} medicines={medicines} totalPages={totalPages} handleModal={handleModal} handlePageChange={handlePageChange} setActiveMedicine={setActiveMedicine} /> }
      </div>
    </>
  );
};

export default MedicinesDashboardPage;