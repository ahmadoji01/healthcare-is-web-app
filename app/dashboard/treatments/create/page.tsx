'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import { createACategory, getAllCategoriesWithFilter, searchCategories } from "@/modules/categories/domain/categories.actions";
import { Category, categoryCreatorMapper, categoryMapper, defaultCategory } from "@/modules/categories/domain/category";
import { medicineCategoriesFilter, treatmentCategoriesFilter } from "@/modules/categories/domain/category.specifications";
import ItemForm from "@/modules/items/application/form/item.form";
import { Item, defaultItem, itemCreatorMapper } from "@/modules/items/domain/item";
import { ITEM_TYPE } from "@/modules/items/domain/item.constants";
import { createAnItem, itemExistsChecker } from "@/modules/items/domain/items.actions";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const TreatmentCreatePage = () => {
  const [item, setItem] = useState(defaultItem);
  const [categories, setCategories] = useState<Category[]>([]);
  const [superParent, setSuperParent] = useState(defaultCategory);
  const [categoryName, setCategoryName] = useState("");
  const {accessToken, organization} = useUserContext();
  const {openSnackbarNotification} = useAlertContext();
  const {t} = useTranslation();
  const router = useRouter();

  useEffect( () => {
    getAllCategoriesWithFilter(accessToken, treatmentCategoriesFilter)
      .then(res => {
        let cats:Category[] = [];
        res?.map( category => { cats.push(categoryMapper(category)) });
        setCategories(cats);
      })
    searchCategories(accessToken, "Treatments", 1)
      .then( res => { 
        if (res.length <= 0)
          return;
        let cat = categoryMapper(res[0]);
        setSuperParent(cat);
      });
  }, []);

  const handleSubmit = async (item:Item) => {
    let itemExists = false;
    await itemExistsChecker(accessToken, item.name)
      .then( res => {
        if (res.length != 0) {
          itemExists = true;
          return;
        }
      });
    
    if (itemExists) { 
      openSnackbarNotification(t("alert_msg.data_exists"), "error");
      return;
    }

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
    
    item.type = ITEM_TYPE.treatment;
    createAnItem(accessToken, itemCreatorMapper(item, cat.id, organization.id))
      .then( () => {
        openSnackbarNotification(t("alert_msg.success"), "success");
        router.push("/dashboard/treatments");
      }).catch( () => {
        openSnackbarNotification(t("alert_msg.server_error"), "error");
      })
  }

  return (
    <>
      <Breadcrumb pageName={t('menu.add_treatment')} />
      <ItemForm showCategory={false} showStock={false} setCategoryName={setCategoryName} categories={categories} handleSubmit={handleSubmit} initItem={item} />
    </>
  );
};

export default TreatmentCreatePage;