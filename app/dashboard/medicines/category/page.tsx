'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import DashboardModal from "@/components/Modal/Modal";
import Spinner from "@/components/Spinner";
import { ALERT_MESSAGE } from "@/constants/alert";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import MedicineCategoryDeleteConfirmation from "@/modules/medicines/application/form/medicine-category.delete-confirmation";
import MedicineCategoryForm from "@/modules/medicines/application/form/medicine-category.form";
import MedicineCategoryListTable from "@/modules/medicines/application/list/medicine-category.list-table";
import { createAMedicineCategory, deleteAMedicineCategory, getAllMedicineCategories, getTotalMedicineCategories, getTotalSearchMedicineCategories, searchMedicineCategories, updateAMedicineCategory } from "@/modules/medicines/domain/medicine-categories.actions";
import MedicineCategory, { defaultMedicineCategory, medicineCategoryCreatorMapper, medicineCategoryMapper } from "@/modules/medicines/domain/medicine-category";
import { faAdd, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";

let activeTimeout = null;

const MedicineCategoryPage = () => {

    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [categories, setCategories] = useState([defaultMedicineCategory]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [activeCategory, setActiveCategory] = useState(defaultMedicineCategory);
    const [searchQuery, setSearchQuery] = useState("");
    
    const {accessToken, user, organization} = useUserContext();
    const {openSnackbarNotification} = useAlertContext();

    const fetchAllCategories = () => {
        getAllMedicineCategories(accessToken, 1).then( res => {
            let cats:MedicineCategory[] = [];
            res?.map( (category) => { cats.push(medicineCategoryMapper(category)); });
            setCategories(cats);
            setDataLoaded(true);
        });
        getTotalMedicineCategories(accessToken).then( res => { 
            let total = res[0].count? parseInt(res[0].count) : 0;
            let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
            setTotalPages(pages);
        })
    }

    useEffect( () => {
        getAllMedicineCategories(accessToken, 1).then( res => {
            let cats:MedicineCategory[] = [];
            res?.map( (category) => { cats.push(medicineCategoryMapper(category)); });
            setCategories(cats);
            setDataLoaded(true);
        });
        getTotalMedicineCategories(accessToken).then( res => { 
            let total = res[0].count? parseInt(res[0].count) : 0;
            let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
            setTotalPages(pages);
        })
    }, []);

    const handleModal = (closeModal:boolean, whichModal: boolean) => {
        if(closeModal) {
            setEditModalOpen(false);
            setDeleteModalOpen(false);
            setCreateModalOpen(false);
            return;
        }

        if (whichModal) {
            setEditModalOpen(true);
            setDeleteModalOpen(false);
            setCreateModalOpen(false);
        } else {
            setEditModalOpen(false);
            setDeleteModalOpen(true);
            setCreateModalOpen(false);
        }
    }

    const handleAddModal = () => {
        setEditModalOpen(false);
        setDeleteModalOpen(false);
        setCreateModalOpen(true);
    }

    const handleDelete = () => {
        deleteAMedicineCategory(accessToken, activeCategory.id)
          .then( () => {
            openSnackbarNotification(ALERT_MESSAGE.success, "success");
            window.location.reload();
          }).catch( () => {
            openSnackbarNotification(ALERT_MESSAGE.server_error, "error");
          })
    }

    const handleSearch = (query:string) => {
        if (query.length > 3) {
          setDataLoaded(false);
          searchMedicineCategories(accessToken, query, 1).then( res => {
            let cats:MedicineCategory[] = [];
            res?.map( (category) => { cats.push(medicineCategoryMapper(category)); });
            setCategories(cats);
            setDataLoaded(true);
          });
          getTotalSearchMedicineCategories(accessToken, query)
            .then( res => {
              let total = res[0].count? parseInt(res[0].count) : 0;
              let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
              setTotalPages(pages);
            });
        }
        if (query.length === 0) {
          setDataLoaded(false);
          fetchAllCategories();
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

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setDataLoaded(false);
        searchMedicineCategories(accessToken, searchQuery, value)
          .then( res => {
            let cats:MedicineCategory[] = [];
            res?.map( (category) => { cats.push(medicineCategoryMapper(category)); });
            setCategories(cats);
            setDataLoaded(true);
          });
    }

    const handleSubmit = async (category:MedicineCategory) => {
        let categoryExists = false;
        await searchMedicineCategories(accessToken, category.name, 1).then( res => {
            if (res.length !== 0) {
                categoryExists = true;
            }
        })

        if (categoryExists) {
            openSnackbarNotification(ALERT_MESSAGE.dataExists(category.name), "error");
            return;
        }

        updateAMedicineCategory(accessToken, category.id, {name: category.name}).then( res => {
            openSnackbarNotification(ALERT_MESSAGE.success, "success");
            window.location.reload();
        }).catch( err => {
            openSnackbarNotification(ALERT_MESSAGE.server_error, "error")
        });
    }

    const handleCreateSubmit = async (category:MedicineCategory) => {
        let categoryCreator = medicineCategoryCreatorMapper(category, organization.id);

        let categoryExists = false;
        await searchMedicineCategories(accessToken, category.name, 1).then( res => {
            if (res.length !== 0) {
                categoryExists = true;
            }
        })

        if (categoryExists) {
            openSnackbarNotification(ALERT_MESSAGE.dataExists(category.name), "error");
            return;
        }

        createAMedicineCategory(accessToken, categoryCreator).then( res => {
            openSnackbarNotification(ALERT_MESSAGE.success, "success");
            window.location.reload();
        }).catch( err => {
            openSnackbarNotification(ALERT_MESSAGE.server_error, "error")
        });
    }

    return (
        <>
            <DashboardModal open={editModalOpen} handleClose={ () => handleModal(true, true) } children={ <MedicineCategoryForm initCategory={activeCategory} handleSubmit={handleSubmit} /> } title="Edit a Medicine Category" />
            <DashboardModal open={deleteModalOpen} handleClose={ () => handleModal(true, false) } children={ <MedicineCategoryDeleteConfirmation category={activeCategory} handleClose={ () => handleModal(true, false)} handleDelete={handleDelete} /> } title="" />
            <DashboardModal open={createModalOpen} handleClose={ () => handleModal(true, false) } children={ <MedicineCategoryForm initCategory={defaultMedicineCategory} handleSubmit={handleCreateSubmit} /> } title="Create a Medicine Category" />
            <Breadcrumb pageName="Medicine Categories" />

            <div className="relative mb-4">
                <button className="absolute left-0 top-1/2 -translate-y-1/2">
                    <FontAwesomeIcon icon={faSearch} width={20} />
                </button>

                <input
                    type="search"
                    placeholder="Type to search..."
                    onChange={e => {handleChange(e.target.value) }}
                    className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
                    />
            </div>

            <div className="flex flex-col gap-10">
                { !dataLoaded && <Spinner /> }
                { dataLoaded && 
                    <>
                        <Link
                            href="#"
                            onClick={() => handleAddModal()}
                            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                            >
                            <span>
                                <FontAwesomeIcon icon={faAdd} />
                            </span>
                            Add a Category
                        </Link>
                        <MedicineCategoryListTable handleModal={handleModal} handlePageChange={handlePageChange} setActiveCategory={setActiveCategory} categories={categories} totalPages={totalPages} /> 
                    </>}
            </div>
        </>
    )

}

export default MedicineCategoryPage;