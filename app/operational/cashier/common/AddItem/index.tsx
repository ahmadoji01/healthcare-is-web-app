import Loader from "@/components/Dashboard/Loader";
import { faArrowAltCircleUp, faArrowCircleRight, faArrowDown, faArrowRight, faExpand, faExpandArrowsAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ItemCard from "./item-card";

const AddItem = () => {

    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const handleChange = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
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
                        <ItemCard name="Test" price={10000} />
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
        </div>
    );

}

export default AddItem;