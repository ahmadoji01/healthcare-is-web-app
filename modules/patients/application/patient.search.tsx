import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

interface PatientSearchProps {
    handleChange: (name:string) => void,
}

const PatientSearch = ({ handleChange }:PatientSearchProps) => {
    
    const [name, setName] = useState("");

    const handleNameChange = (nameChange:string) => {
        setName(nameChange);
    }
        
    return (
        <form onSubmit={e => { e.preventDefault(); handleChange(name) }}>
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Search for a patient..."
                    onChange={e => handleNameChange(e.target.value)}
                    className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
                    />
                
                <button className="absolute right-0 top-1/2 -translate-y-1/2">
                    <FontAwesomeIcon icon={faSearch} width={20} />
                </button>
            </div>
        </form>
    );
}

export default PatientSearch;