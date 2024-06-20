import { faArrowAltCircleUp, faArrowRight, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, AccordionDetails, AccordionSummary, Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import ItemCard from "./item-card";
import { Medicine, medicineMapper } from "@/modules/medicines/domain/medicine";
import { Treatment, treatmentMapper } from "@/modules/treatments/domain/treatment";
import { useOrderSummaryContext } from "@/contexts/order-summary-context";
import { OrderItem } from "@/modules/orders/domain/order-item";
import { getAllMedicines, searchMedicines } from "@/modules/medicines/domain/medicines.actions";
import { useUserContext } from "@/contexts/user-context";
import { getAllTreatments, searchTreatments } from "@/modules/treatments/domain/treatments.actions";
import { useTranslation } from "react-i18next";
import { useAlertContext } from "@/contexts/alert-context";
import { getAllItems, searchItems } from "@/modules/items/domain/items.actions";
import { Item, itemMapper } from "@/modules/items/domain/item";

function isAMedicine(obj: Medicine|Treatment) {
    if (obj.hasOwnProperty('category')) {
        return true;
    }
    return false;
}

let activeTimeout = null;

const AddItem = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMsg, setSnackbarMsg] = useState<string>("");
    const [item, setItems] = useState<Item[]>([]);
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [treatments, setTreatments] = useState<Treatment[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    
    const { selectedOrder, handleModal, setSelectedOrder } = useOrderSummaryContext();
    const {accessToken} = useUserContext();
    const {openSnackbarNotification} = useAlertContext();
    const { t } = useTranslation();

    const fetchAllData = () => {
        getAllItems(accessToken, 1).then( res => {
            let its:Item[] = [];
            res?.map( (item) => { its.push(itemMapper(item)); });
            setItems(its);
            setLoading(false);
        });
    }

    useEffect( () => {
        getAllItems(accessToken, 1).then( res => {
            let its:Item[] = [];
            res?.map( (item) => { its.push(itemMapper(item)); });
            setItems(its);
            setLoading(false);
        });
    }, []);  
    
    const handleSearch = (query:string) => {
        if (query.length > 3) {
            setLoading(true);
            searchItems(accessToken, query, 1).then( res => {
                let its:Item[] = [];
                res?.map( (item) => { its.push(itemMapper(item)); });
                setItems(its);
                setLoading(false);
            });
        }
        if (query.length === 0) {
            setLoading(false);
            fetchAllData();
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

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnackbar(false);
    };

    const handleAddItem = (item:Item, quantity:number) => {
        if (typeof(selectedOrder) === 'undefined') {
            openSnackbarNotification(t("alert_msg.no_order_selected"), "warning");
            return;
        }
        let newSelectedOrder = {...selectedOrder};
        let items = [...newSelectedOrder.order_items];

        let orderItem:OrderItem = { id: items.length, item: item, name: item.name, price: item.price, description: "", quantity: 1, total: item.price, type: item.type } 
        newSelectedOrder.order_items[items.length] = orderItem;
        setSelectedOrder(newSelectedOrder);
        openSnackbarNotification(t("alert_msg.item_added"), "success");
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
                    placeholder={ t("type_to_search") }
                    onChange={ e => handleChange(e.target.value)}
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
                        <h4 className="font-extrabold">{ t("medicines") }</h4>
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
                        <h4 className="font-extrabold">{ t("treatments") }</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                        { treatments?.map( (treatment) => (
                            <ItemCard item={treatment} showQtyHandler={false} handleAddItem={handleAddItem} />
                        )) }
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