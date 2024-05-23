'use client';

import SubmitButton from '@/components/Dashboard/Submit';
import { Medicine } from '../../domain/medicine';
import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import MedicineCategory from '../../domain/medicine-category';

interface MedicineFormProps {
    initMedicine: Medicine,
    categories: MedicineCategory[],
    handleSubmit: (medicine:Medicine) => void,
    setCategoryName: (categoryName:string) => void,
}

const MedicineForm = ({ initMedicine, categories, handleSubmit, setCategoryName }:MedicineFormProps) => {
    const [medicine, setMedicine] = useState(initMedicine);

    return (
        <>
            <div className="grid gap-9">
                <form onSubmit={e => { e.preventDefault(); handleSubmit(medicine) } }>
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="flex flex-col gap-5.5 p-6.5">
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Name
                                    </label>
                                    <input
                                        type="text" 
                                        defaultValue={medicine.name}
                                        required
                                        onChange={ e => setMedicine({ ...medicine, name: e.target.value })}
                                        placeholder="Input Your Full Name"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Category
                                    </label>
                                    <div className="relative">
                                        <Autocomplete
                                            freeSolo
                                            id="free-solo-2-demo"
                                            disableClearable
                                            options={categories?.map((cat) => cat.name)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        type: 'search',
                                                    }}
                                                    onChange={ e => setCategoryName(e.target.value)}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Stock
                                    </label>
                                    <div className="relative">
                                    <input
                                        type="number"
                                        defaultValue={medicine.stock}
                                        required
                                        onChange={ e => setMedicine({ ...medicine, stock: parseInt(e.target.value) })}
                                        placeholder="Input the Stock"
                                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-3 block text-black dark:text-white">
                                        Price
                                    </label>
                                    <div className="relative">
                                    <input
                                        type="number"
                                        defaultValue={medicine.price}
                                        required
                                        onChange={ e => setMedicine({ ...medicine, price: parseInt(e.target.value) })}
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

export default MedicineForm;