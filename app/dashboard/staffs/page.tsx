'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import DashboardModal from "@/components/Modal/Modal";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { useUserContext } from "@/contexts/user-context";
import { Staff, staffMapper, defaultStaff, staffPatcherMapper } from "@/modules/staffs/domain/staff";
import StaffForm from "@/modules/staffs/application/form/staff.form";
import StaffDeleteConfirmation from "@/modules/staffs/application/form/staff.delete-confirmation";
import StaffListTable from "@/modules/staffs/application/list/staff.list-table";
import { deleteAStaff, getAllStaffs, getTotalSearchStaffs, getTotalStaffs, searchStaffs, updateAStaff } from "@/modules/staffs/domain/staffs.actions";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAlertContext } from "@/contexts/alert-context";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

let activeTimeout = null;

const StaffsDashboardPage = () => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [activeStaff, setActiveStaff] = useState<Staff>(defaultStaff);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {accessToken} = useUserContext();
  const {openSnackbarNotification} = useAlertContext();
  const t = useTranslations();
  const router = useRouter();

  const fetchAllStaffs = () => {
    getAllStaffs(accessToken, 1)
      .then( res => {
        let stfs:Staff[] = [];
        res?.map( (staff) => { stfs.push(staffMapper(staff)); });
        setStaffs(stfs);
        setDataLoaded(true);
      });
    getTotalStaffs(accessToken)
      .then( res => {
        let total = res[0].count? parseInt(res[0].count) : 0;
        let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
        setTotalPages(pages);
      })
  }

  useEffect( () => {
    if (!dataLoaded || staffs.length == 0) {
      fetchAllStaffs();
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
    getAllStaffs(accessToken, 1)
      .then( res => {
        let stfs:Staff[] = [];
        res?.map( (staff) => { stfs.push(staffMapper(staff)); });
        setStaffs(stfs);
        setDataLoaded(true);
      });
  };

  const handleSubmit = (staff:Staff) => {
    updateAStaff(accessToken, staff.id, staffPatcherMapper(staff))
      .then( () => {
        openSnackbarNotification(t('alert_msg.success'), "success");
        router.refresh();
      }).catch( () => {
        openSnackbarNotification(t('alert_msg.error'), "error");
      })
  } 

  const handleSearch = (query:string) => {
    if (query.length > 3) {
      setDataLoaded(false);
      searchStaffs(accessToken, query, 1).then( res => {
        let stfs:Staff[] = [];
        res?.map( (staff) => { stfs.push(staffMapper(staff)); });
        setStaffs(stfs);
        setDataLoaded(true);
      });
      getTotalSearchStaffs(accessToken, query)
        .then( res => {
          let total = res[0].count? parseInt(res[0].count) : 0;
          let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
          setTotalPages(pages);
        });
    }
    if (query.length === 0) {
      setDataLoaded(false);
      fetchAllStaffs();
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
    deleteAStaff(accessToken, activeStaff.id)
      .then( () => {
        openSnackbarNotification(t('alert_msg.success'), "success");
        router.refresh();
      }).catch( () => {
        openSnackbarNotification(t('alert_msg.server_error'), "error");
      })
  }

  return (
    <>
      <DashboardModal open={editModalOpen} handleClose={ () => handleModal(true, true) } children={ <StaffForm initStaff={activeStaff} handleSubmit={handleSubmit} /> } title={t('staffs_detail')} />
      <DashboardModal open={deleteModalOpen} handleClose={ () => handleModal(true, false) } children={ <StaffDeleteConfirmation handleDelete={handleDelete} staff={activeStaff} handleClose={ () => handleModal(true, false)} /> } title="" />
      <Breadcrumb pageName={t('staffs')} />

      <div className="relative mb-4">
        <button className="absolute left-0 top-1/2 -translate-y-1/2" onClick={() => handleChange(searchQuery)}>
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
        { !dataLoaded && <div className="flex"><div className="h-16 w-16 m-auto animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" /></div> }    
        { dataLoaded && <StaffListTable setActiveStaff={setActiveStaff} totalPages={totalPages} staffs={staffs} handlePageChange={handlePageChange} handleModal={handleModal} /> }
      </div>
    </>
  );
};

export default StaffsDashboardPage;