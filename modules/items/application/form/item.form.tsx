'use client';

import SubmitButton from '@/components/Dashboard/Submit';
import { Item } from '../../domain/item';
import { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Category } from '@/modules/categories/domain/category';
import { useTranslation } from 'react-i18next';

interface ItemFormProps {
    initItem: Item,
    categories: Category[],
    handleSubmit: (item:Item) => void,
    setCategoryName: (categoryName:string) => void,
}

const ItemForm = ({ initItem, categories, handleSubmit, setCategoryName }:ItemFormProps) => {
    const [item, setItem] = useState(initItem);
    const [cats, setCats] = useState<string[]>([]);

    const {t} = useTranslation();

    useEffect(() => {
        let cas:string[] = [];
        categories?.map( (cat) => cas.push(cat.name));
        setCats(cas);
    }, [categories]);

    return (
        <>
            <div className="grid gap-9">
                <form onSubmit={e => { e.preventDefault(); handleSubmit(item) } }>
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        { t("name") }
                                    </label>
                                    <input
                                        type="text" 
                                        defaultValue={item.name}
                                        required
                                        onChange={ e => setItem({ ...item, name: e.target.value })}
                                        placeholder={ t("input_medicines_name") }
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        { t("category") }
                                    </label>
                                    <div className="relative">
                                        <Autocomplete
                                            defaultValue={item.category?.name}
                                            onChange={(event: any, newValue: string | null) => {
                                                setCategoryName(newValue? newValue:'');
                                            }}
                                            onInputChange={ (e:any, value:string) => {
                                                setCategoryName(value? value:'');
                                            }}
                                            freeSolo
                                            options={cats}
                                            disablePortal
                                            renderInput={(params) => <TextField {...params} label="" />}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        { t("stock") }
                                    </label>
                                    <div className="relative">
                                    <input
                                        type="number"
                                        defaultValue={item.stock}
                                        min={0}
                                        required
                                        onChange={ e => setItem({ ...item, stock: parseInt(e.target.value) })}
                                        placeholder="Input the Stock"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        { t("price") }
                                    </label>
                                    <div className="relative">
                                    <input
                                        type="number"
                                        defaultValue={item.price}
                                        required
                                        onChange={ e => setItem({ ...item, price: parseInt(e.target.value) })}
                                        placeholder="Input the Price"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SubmitButton />
                </form>
            </div>
        </>
    )
}

export default ItemForm;