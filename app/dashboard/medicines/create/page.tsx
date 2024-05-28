'use client';

import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import { ALERT_MESSAGE } from "@/constants/alert";
import { useAlertContext } from "@/contexts/alert-context";
import { useUserContext } from "@/contexts/user-context";
import MedicineForm from "@/modules/medicines/application/form/medicine.form";
import { Medicine, defaultMedicine, medicineCreatorMapper } from "@/modules/medicines/domain/medicine";
import { createAMedicineCategory, getAllMedicineCategories } from "@/modules/medicines/domain/medicine-categories.actions";
import MedicineCategory, { defaultMedicineCategory, medicineCategoryCreatorMapper, medicineCategoryMapper } from "@/modules/medicines/domain/medicine-category";
import { createAMedicine, medicineExistChecker } from "@/modules/medicines/domain/medicines.actions";

import { useEffect, useState } from "react";

const MedicineCreatePage = () => {
  const [medicine, setMedicine] = useState(defaultMedicine);
  const [categories, setCategories] = useState<MedicineCategory[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const {accessToken, organization} = useUserContext();
  const {setOpen, setMessage, setStatus} = useAlertContext();

  useEffect( () => {
    getAllMedicineCategories(accessToken, 1)
      .then(res => {
        let cats:MedicineCategory[] = [];
        res?.map( category => { cats.push(medicineCategoryMapper(category)) });
        setCategories(cats);
      })
  }, []);

  const handleSubmit = async (medicine:Medicine) => {
    let medicineExists = false;
    await medicineExistChecker(accessToken, medicine.name)
      .then( res => {
        if (res.length != 0) {
          medicineExists = true;
          return;
        }
      });
    
    if (medicineExists) { 
      setOpen(true);
      setMessage(ALERT_MESSAGE.dataExists('medicine'));
      setStatus("error");
      return;
    }

    let cats = categories.find(c => c.name === categoryName);
    let cat = defaultMedicineCategory;
    if (typeof(cats) === 'undefined') {
      await createAMedicineCategory(accessToken, medicineCategoryCreatorMapper(categoryName, organization.id)).then( res => {
        cat = medicineCategoryMapper(res);
      })
    } else {
      cat = cats;
    }
    
    let medicineCreator = medicineCreatorMapper(medicine, cat.id, organization.id);
    await createAMedicine(accessToken, medicineCreator).then( () => {
      setOpen(true);
      setMessage("Success! Medicine has been created!");
      setStatus("success");
      window.location.href = '/dashboard/medicines';
      return;
    }).catch( err => {
      setOpen(true);
      setMessage(ALERT_MESSAGE.server_error);
      setStatus("error");
      return;
    })
  }

  return (
    <>
      <Breadcrumb pageName="Add Medicine" />
      <MedicineForm setCategoryName={setCategoryName} categories={categories} handleSubmit={handleSubmit} initMedicine={medicine} />
    </>
  );
};

export default MedicineCreatePage;