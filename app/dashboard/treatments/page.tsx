'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import DashboardModal from "@/components/Modal/Modal";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import { getAllCategoriesWithFilter, searchCategories } from "@/modules/categories/domain/categories.actions";
import { Category, categoryMapper, defaultCategory } from "@/modules/categories/domain/category";
import { treatmentCategoriesFilter } from "@/modules/categories/domain/category.specifications";
import ItemDeleteConfirmation from "@/modules/items/application/form/item.delete-confirmation";
import ItemForm from "@/modules/items/application/form/item.form";
import ItemListTable from "@/modules/items/application/list/item.list-table";
import { Item, defaultItem, itemMapper, itemPatcherMapper } from "@/modules/items/domain/item";
import { ITEM_TYPE } from "@/modules/items/domain/item.constants";
import { treatmentItemsFilter } from "@/modules/items/domain/item.specifications";
import { deleteAnItem, getItemsWithFilter, getTotalItemsWithFilter, getTotalSearchItemsWithFilter, searchItemsWithFilter, updateAnItem } from "@/modules/items/domain/items.actions";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

let activeTimeout = null;

const TreatmentsDashboardPage = () => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [activeItem, setActiveItem] = useState<Item>(defaultItem);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [superParent, setSuperParent] = useState(defaultCategory);

  const {openSnackbarNotification} = useAlertContext();
  const {accessToken} = useUserContext();
  const t = useTranslations();
  const router = useRouter();

  const fetchAllTreatments = () => {
    getItemsWithFilter(accessToken, treatmentItemsFilter, 1)
      .then( res => {
        let its:Item[] = [];
        res?.map( (item) => { its.push(itemMapper(item)); });
        setItems(its);
        setDataLoaded(true);
      });
    getTotalItemsWithFilter(accessToken, treatmentItemsFilter)
      .then( res => { 
        let total = res[0].count? parseInt(res[0].count) : 0;
        let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
        setTotalPages(pages);
      });
    searchCategories(accessToken, "Treatments", 1)
      .then( res => { 
        if (res.length <= 0)
          return;
        let cat = categoryMapper(res[0]);
        setSuperParent(cat);
      });
  }

  useEffect( () => {
    getAllCategoriesWithFilter(accessToken, treatmentCategoriesFilter)
      .then(res => {
        let cats:Category[] = [];
        res?.map( category => { cats.push(categoryMapper(category)) });
        setCategories(cats);
      })
  }, []);

  useEffect( () => {
    if (!dataLoaded && items.length == 0) {
      fetchAllTreatments();
    }
  }, [items]);

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
    searchItemsWithFilter(accessToken, searchQuery, treatmentItemsFilter, value)
      .then( res => {
        let its:Item[] = [];
        res?.map( (item) => { its.push(itemMapper(item)); });
        setItems(its);
        setDataLoaded(true);
      });
  }

  const handleSubmit = async (item:Item) => {
    item.category = superParent;
    item.type = ITEM_TYPE.treatment;
    updateAnItem(accessToken, item.id, itemPatcherMapper(item))
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
      searchItemsWithFilter(accessToken, query, treatmentItemsFilter, 1).then( res => {
        let its:Item[] = [];
        res?.map( (item) => { its.push(itemMapper(item)); });
        setItems(its);
        setDataLoaded(true);
      });
      getTotalSearchItemsWithFilter(accessToken, query, treatmentItemsFilter)
        .then( res => {
          let total = res[0].count? parseInt(res[0].count) : 0;
          let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
          setTotalPages(pages);
        });
    }
    if (query.length === 0) {
      setDataLoaded(false);
      fetchAllTreatments();
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
    deleteAnItem(accessToken, activeItem.id)
      .then( () => {
        openSnackbarNotification(t("alert_msg.success"), "success");
        router.refresh();
      }).catch( () => {
        openSnackbarNotification(t("alert_msg.server_error"), "error");
      })
  }

  return (
    <>
      <DashboardModal open={editModalOpen} handleClose={ () => handleModal(true, true) } children={ <ItemForm showStock={false} showCategory={false} initItem={activeItem} categories={categories} handleSubmit={handleSubmit} /> } title={t('treatments_detail')} />
      <DashboardModal open={deleteModalOpen} handleClose={ () => handleModal(true, false) } children={ <ItemDeleteConfirmation item={activeItem} handleDelete={handleDelete} handleClose={ () => handleModal(true, false)} /> } title="" />
      <Breadcrumb pageName={t('treatments')} />

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
        { dataLoaded && <ItemListTable showCategory={false} handleQtyChange={() => {}} showStock={false} totalPages={totalPages} items={items} setActiveItem={setActiveItem} handlePageChange={handlePageChange} handleModal={handleModal} /> }
      </div>
    </>
  );
};

export default TreatmentsDashboardPage;