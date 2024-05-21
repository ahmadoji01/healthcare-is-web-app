'use client';

import { useUserContext } from "@/contexts/user-context";
import MedicineCategoryForm from "@/modules/medicines/application/form/medicine-category.form";
import MedicineCategoryListTable from "@/modules/medicines/application/list/medicine-category.list-table";
import { getAllMedicineCategories } from "@/modules/medicines/domain/medicine-categories.actions";
import MedicineCategory, { defaultMedicineCategory, medicineCategoryMapper } from "@/modules/medicines/domain/medicine-category";
import { useEffect, useState } from "react";

const MedicineCategoryPage = () => {

    const [categories, setCategories] = useState([defaultMedicineCategory]);
    const [dataLoaded, setDataLoaded] = useState(false);

    const {accessToken} = useUserContext();

    useEffect( () => {
        getAllMedicineCategories(accessToken, 1).then( res => {
            let cats:MedicineCategory[] = [];
            res?.map( (category) => { cats.push(medicineCategoryMapper(category)); });
            setCategories(cats);
            setDataLoaded(true);
        });
    }, []);

    const handleSubmit = (category:MedicineCategory) => {
        console.log(category);
    }

    return (
        <>
            <MedicineCategoryListTable categories={categories}  />
        </>
    )

}

export default MedicineCategoryPage;