'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import DashboardModal from "@/components/Modal/Modal";
import Spinner from "@/components/Spinner";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import CategoryDeleteConfirmation from "@/modules/categories/application/form/category.delete-confirmation";
import CategoryForm from "@/modules/categories/application/form/category.form";
import CategoryListTable from "@/modules/categories/application/list/category.list-table";
import { createACategory, deleteACategory, getAllCategoriesWithFilterPage, getTotalCategoriesWithFilter, getTotalSearchCategoriesWithFilter, searchCategories, searchCategoriesWithFilter, updateACategory } from "@/modules/categories/domain/categories.actions";
import { Category, categoryCreatorMapper, categoryMapper, defaultCategory } from "@/modules/categories/domain/category";
import { medicineCategoriesFilter } from "@/modules/categories/domain/category.specifications";
import { faAdd, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

let activeTimeout = null;

const MedicineCategoryPage = () => {

    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
    const [categories, setCategories] = useState([defaultCategory]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [activeCategory, setActiveCategory] = useState(defaultCategory);
    const [searchQuery, setSearchQuery] = useState("");
    const [superParent, setSuperParent] = useState(defaultCategory);
    
    const {accessToken, organization} = useUserContext();
    const {openSnackbarNotification} = useAlertContext();
    const t = useTranslations();
    const router = useRouter();

    const fetchAllCategories = () => {
        getAllCategoriesWithFilterPage(accessToken, medicineCategoriesFilter, 1).then( res => {
            let cats:Category[] = [];
            res?.map( (category) => { cats.push(categoryMapper(category)); });
            setCategories(cats);
            setDataLoaded(true);
        });
        getTotalCategoriesWithFilter(accessToken, medicineCategoriesFilter).then( res => { 
            let total = res[0].count? parseInt(res[0].count) : 0;
            let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
            setTotalPages(pages);
        })
        searchCategories(accessToken, "Medicines", 1)
            .then( res => { 
                if (res.length <= 0)
                    return;
                let cat = categoryMapper(res[0]);
                setSuperParent(cat);
            });
    }

    useEffect( () => {
        fetchAllCategories();
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
        deleteACategory(accessToken, activeCategory.id)
          .then( () => {
            openSnackbarNotification(t("alert_msg.success"), "success");
            router.refresh();
          }).catch( () => {
            openSnackbarNotification(t("alert_msg.server_error"), "error");
          })
    }

    const handleSearch = (query:string) => {
        if (query.length > 3) {
          setDataLoaded(false);
          searchCategoriesWithFilter(accessToken, query, medicineCategoriesFilter, 1).then( res => {
            let cats:Category[] = [];
            res?.map( (category) => { cats.push(categoryMapper(category)); });
            setCategories(cats);
            setDataLoaded(true);
          });
          getTotalSearchCategoriesWithFilter(accessToken, query, medicineCategoriesFilter)
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
        searchCategoriesWithFilter(accessToken, searchQuery, medicineCategoriesFilter, 1).then( res => {
            let cats:Category[] = [];
            res?.map( (category) => { cats.push(categoryMapper(category)); });
            setCategories(cats);
            setDataLoaded(true);
          });
    }

    const handleSubmit = async (category:Category) => {
        let categoryExists = false;
        category.parent = superParent;
        category.super_parent = superParent;
        category.children = [];
        await searchCategories(accessToken, category.name, 1).then( res => {
            if (res.length !== 0) {
                categoryExists = true;
            }
        })

        if (categoryExists) {
            openSnackbarNotification(t("alert_msg.data_exists"), "error");
            return;
        }

        updateACategory(accessToken, category.id, {name: category.name}).then( res => {
            openSnackbarNotification(t("alert_msg.success"), "success");
            router.refresh();
        }).catch( err => {
            openSnackbarNotification(t("alert_msg.server_error"), "error")
        });
    }

    const handleCreateSubmit = async (category:Category) => {
        category.parent = superParent;
        category.super_parent = superParent;
        category.children = [];
        let categoryCreator = categoryCreatorMapper(category, organization.id);

        let categoryExists = false;
        await searchCategories(accessToken, category.name, 1).then( res => {
            if (res.length !== 0) {
                categoryExists = true;
            }
        })

        if (categoryExists) {
            openSnackbarNotification(t("alert_msg.data_exists"), "error");
            return;
        }

        createACategory(accessToken, categoryCreator).then( res => {
            openSnackbarNotification(t("alert_msg.success"), "success");
            router.refresh();
        }).catch( err => {
            openSnackbarNotification(t("alert_msg.server_error"), "error")
        });
    }

    return (
        <>
            <DashboardModal open={editModalOpen} handleClose={ () => handleModal(true, true) } children={ <CategoryForm initCategory={activeCategory} handleSubmit={handleSubmit} /> } title={t('edit_a_category')} />
            <DashboardModal open={deleteModalOpen} handleClose={ () => handleModal(true, false) } children={ <CategoryDeleteConfirmation category={activeCategory} handleClose={ () => handleModal(true, false)} handleDelete={handleDelete} /> } title="" />
            <DashboardModal open={createModalOpen} handleClose={ () => handleModal(true, false) } children={ <CategoryForm initCategory={defaultCategory} handleSubmit={handleCreateSubmit} /> } title={t('add_a_category')} />
            <Breadcrumb pageName={t('medicine_categories')} />

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
                            {t('add_a_category')}
                        </Link>
                        <CategoryListTable handleModal={handleModal} handlePageChange={handlePageChange} setActiveCategory={setActiveCategory} categories={categories} totalPages={totalPages} /> 
                    </>}
            </div>
        </>
    )

}

export default MedicineCategoryPage;