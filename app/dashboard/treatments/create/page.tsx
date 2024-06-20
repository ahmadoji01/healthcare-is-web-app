'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import { searchCategories } from "@/modules/categories/domain/categories.actions";
import { categoryMapper, defaultCategory } from "@/modules/categories/domain/category";
import ItemForm from "@/modules/items/application/form/item.form";
import { Item, defaultItem, itemCreatorMapper } from "@/modules/items/domain/item";
import { createAnItem, itemExistsChecker } from "@/modules/items/domain/items.actions";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const TreatmentCreatePage = () => {
  const [item, setItem] = useState(defaultItem);
  const {accessToken, organization} = useUserContext();
  const [superParent, setSuperParent] = useState(defaultCategory);
  const {openSnackbarNotification} = useAlertContext();
  const {t} = useTranslation();
  const router = useRouter();

  useEffect( () => {
    searchCategories(accessToken, "Treatments", 1)
      .then( res => { 
        if (res.length <= 0)
          return;
        let cat = categoryMapper(res[0]);
        setSuperParent(cat);
      });
  }, [])

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

    item.stock = 99999999;
    createAnItem(accessToken, itemCreatorMapper(item, superParent.id, organization.id))
      .then( () => {
        openSnackbarNotification(t("alert_msg.success"), "success");
        router.push("/dashboard/treatments");
      }).catch( () => {
        openSnackbarNotification(t("alert_msg.server_error"), "error");
      })
  }

  return (
    <>
      <Breadcrumb pageName="Add Treatment" />
      <ItemForm handleSubmit={handleSubmit} initItem={item} showCategory={false} showStock={false} />
    </>
  );
};

export default TreatmentCreatePage;