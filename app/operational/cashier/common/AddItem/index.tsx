import Loader from "@/components/Dashboard/Loader";
import { faArrowAltCircleUp, faArrowCircleRight, faArrowDown, faArrowRight, faExpand, faExpandArrowsAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ItemCard from "./item-card";
import Medicine from "@/modules/medicines/domain/medicine";
import { medicinesFakeData } from "@/modules/medicines/infrastructure/medicines.fakes";
import { Treatment } from "@/modules/treatments/domain/treatment";
import { useOrderSummaryContext } from "@/contexts/order-summary-context";
import Medication from "@/modules/medical-records/domain/medication";
import OrderItem from "@/modules/orders/domain/order-item";
import { v4 as uuidv4 } from 'uuid';

function isAMedicine(obj: Medicine|Treatment) {
    if (obj.hasOwnProperty('category')) {
        return true;
    }
    return false;
}

const AddItem = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMsg, setSnackbarMsg] = useState<string>("");
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    
    const { selectedOrder, handleModal, setSelectedOrder } = useOrderSummaryContext();

    useEffect(() => {
        setMedicines(medicinesFakeData);
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const handleChange = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnackbar(false);
    };

    const handleAddItem = (item:Medicine|Treatment, quantity:number) => {
        if (typeof(selectedOrder) === 'undefined') {
            setOpenSnackbar(true);
            setSnackbarMsg("No active order is selected");
            return;
        }
        let newSelectedOrder = {...selectedOrder};
        let items = [...newSelectedOrder.orderItems];

        let orderItem:OrderItem = { id: Math.floor(Math.random()*100000000000), medication: null, treatment: null, name: item.name, price: item.price, description: "", quantity: 1, total: item.price, image: "" } 
        if (isAMedicine(item)) {
            let medication:Medication = { medicine: item, doses: "", quantity: quantity };
            orderItem.medication = medication;
            orderItem.quantity = quantity;
            orderItem.total = item.price * quantity;
        } else {
            orderItem.treatment = item;
        }
        newSelectedOrder.orderItems[items.length] = orderItem;
        setSelectedOrder(newSelectedOrder);
        setOpenSnackbar(true);
        setSnackbarMsg("Item has successfully been added");
        return;   
    }

    return (
        <div className="">
            <div className="relative mb-4">
                <button className="absolute left-0 top-1/2 -translate-y-1/2">
                    <FontAwesomeIcon icon={faSearch} width={20} />
                </button>

                <input
                    type="text"
                    placeholder="Type to search..."
                    onChange={handleChange}
                    className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
                    />
                
                <button className="absolute right-0 top-1/2 -translate-y-1/2">
                    <FontAwesomeIcon icon={faArrowRight} width={20} />
                </button>
            </div>
            { loading && <div className="flex"><div className="h-16 w-16 m-auto animate-spin rounded-full border-4 border-solid border-primary border-t-transparent" /></div> }
            { !loading &&
            <> 
                <Accordion defaultExpanded sx={{ backgroundColor: 'transparent', boxShadow: 0 }}>
                    <AccordionSummary
                        expandIcon={<FontAwesomeIcon icon={faArrowAltCircleUp} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        <h4 className="font-extrabold">Items and Medicines</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                        { medicines?.map( (medicine) => (
                            <ItemCard item={medicine} showQtyHandler={true} handleAddItem={handleAddItem} />
                        )) }
                    </AccordionDetails>
                </Accordion>
                <Accordion defaultExpanded sx={{ backgroundColor: 'transparent', boxShadow: 0 }}>
                    <AccordionSummary
                        expandIcon={<FontAwesomeIcon icon={faArrowAltCircleUp} />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                        >
                        <h4 className="font-extrabold">Treatments</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </>
            }
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={openSnackbar} autoHideDuration={6000} onClose={handleClose} sx={{ zIndex: 2147483647 }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    { snackbarMsg }
                </Alert>
            </Snackbar>
        </div>
    );

}

export default AddItem;