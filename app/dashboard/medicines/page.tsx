'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import DashboardModal from "@/components/Modal/Modal";
import Spinner from "@/components/Spinner";
import { LIMIT_PER_PAGE } from "@/constants/request";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import { createACategory, getAllCategoriesWithFilter, searchCategories } from "@/modules/categories/domain/categories.actions";
import { Category, categoryCreatorMapper, categoryMapper, defaultCategory } from "@/modules/categories/domain/category";
import { medicineCategoriesFilter } from "@/modules/categories/domain/category.specifications";
import ItemDeleteConfirmation from "@/modules/items/application/form/item.delete-confirmation";
import ItemForm from "@/modules/items/application/form/item.form";
import ItemListTable from "@/modules/items/application/list/item.list-table";
import { Item, defaultItem, itemMapper, itemPatcherMapper } from "@/modules/items/domain/item";
import { ITEM_TYPE } from "@/modules/items/domain/item.constants";
import { medicineItemsFilter } from "@/modules/items/domain/item.specifications";
import { deleteAnItem, getItemsWithFilter, getTotalItems, getTotalItemsWithFilter, getTotalSearchItems, getTotalSearchItemsWithFilter, searchItemsWithFilter, updateAnItem } from "@/modules/items/domain/items.actions";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

let activeTimeout = null;

const MedicinesDashboardPage = () => {
  
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [superParent, setSuperParent] = useState(defaultCategory);
  const [items, setItems] = useState<Item[]>([]);
  const [activeItem, setActiveItem] = useState<Item>(defaultItem);
  const [totalPages, setTotalPages] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {accessToken, organization} = useUserContext();
  const {openSnackbarNotification} = useAlertContext();
  const t = useTranslations();
  const router = useRouter();
  
  const fetchAllMedicines = () => {
    getItemsWithFilter(accessToken, medicineItemsFilter, 1)
      .then( res => {
        let its:Item[] = [];
        res?.map( (item) => { its.push(itemMapper(item)); });
        setItems(its);
        setDataLoaded(true);
      });
    getTotalItemsWithFilter(accessToken, medicineItemsFilter)
      .then( res => { 
        let total = res[0].count? parseInt(res[0].count) : 0;
        let pages = Math.floor(total/LIMIT_PER_PAGE) + 1;
        setTotalPages(pages);
      });
    searchCategories(accessToken, "Medicines", 1)
      .then( res => { 
        if (res.length <= 0)
          return;
        let cat = categoryMapper(res[0]);
        setSuperParent(cat);
      });
  }

  useEffect( () => {
    getAllCategoriesWithFilter(accessToken, medicineCategoriesFilter)
      .then(res => {
        let cats:Category[] = [];
        res?.map( category => { cats.push(categoryMapper(category)) });
        setCategories(cats);
      })
  }, []);

  useEffect( () => {
    if (!dataLoaded && items.length == 0) {
      fetchAllMedicines();
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
    searchItemsWithFilter(accessToken, searchQuery, medicineItemsFilter, value)
      .then( res => {
        let its:Item[] = [];
        res?.map( (item) => { its.push(itemMapper(item)); });
        setItems(its);
        setDataLoaded(true);
      });
  }

  const handleSubmit = async (item:Item) => {
    let cats = categories.find(c => c.name === categoryName);
    let cat = defaultCategory;
    cat.name = categoryName;
    cat.children = [];
    cat.parent = superParent;
    cat.super_parent = superParent;
    if (typeof(cats) === 'undefined') {
      await createACategory(accessToken, categoryCreatorMapper(cat, organization.id)).then( res => {
        cat = categoryMapper(res);
      })
    } else {
      cat = cats;
    }

    item.category = cat;
    item.type = ITEM_TYPE.medicine;
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
      searchItemsWithFilter(accessToken, query, medicineItemsFilter, 1).then( res => {
        let its:Item[] = [];
        res?.map( (item) => { its.push(itemMapper(item)); });
        setItems(its);
        setDataLoaded(true);
      });
      getTotalSearchItemsWithFilter(accessToken, query, medicineItemsFilter)
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
    deleteAnItem(accessToken, activeItem.id)
      .then( () => {
        openSnackbarNotification(t("alert_msg.success"), "success");
        router.refresh();
      }).catch( () => {
        openSnackbarNotification(t("alert_msg.server_error"), "error");
      })
  }

  const handleSubmitQty = (item:Item) => {
    updateAnItem(accessToken, item.id, { stock: item.stock })
      .then( () => {
        openSnackbarNotification(t("alert_msg.success"), "success");
      }).catch( () => {
        openSnackbarNotification(t("alert_msg.server_error"), "error");
      })
  } 

  const handleQtyChange = (action:string, item:Item, index:number, qty:number) => {
    if (typeof(item) === 'undefined') {
        return;
    }
    let newItems = [...items];
    let itm = {...items[index]};
    let stock = itm.stock;
    let oldStock = itm.stock;
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
    itm.stock = stock;
    newItems[index] = itm;
    setItems(newItems);

    if (oldStock !== qty)
      handleSubmitQty(itm);

    return;
  }
  
  return (
    <>
      <DashboardModal open={editModalOpen} handleClose={ () => handleModal(true, true) } children={ <ItemForm setCategoryName={setCategoryName} categories={categories} initItem={activeItem} handleSubmit={handleSubmit} /> } title={t("medicines_detail")} />
      <DashboardModal open={deleteModalOpen} handleClose={ () => handleModal(true, false) } children={ <ItemDeleteConfirmation item={activeItem} handleDelete={handleDelete} handleClose={ () => handleModal(true, false)} /> } title="" />
      <Breadcrumb pageName={t("medicines")} />

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
        { dataLoaded && <ItemListTable handleQtyChange={handleQtyChange} items={items} totalPages={totalPages} handleModal={handleModal} handlePageChange={handlePageChange} setActiveItem={setActiveItem} /> }
      </div>
    </>
  );
};

export default MedicinesDashboardPage;