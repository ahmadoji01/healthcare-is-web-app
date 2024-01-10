import { createContext, useContext, useEffect, useState } from 'react';
 
interface DataModalContextType {
    editModalOpen: boolean,
    deleteModalOpen: boolean,
    handleModal: (closeModal: boolean, whichModal: boolean) => void,
}

export const DataModalContext = createContext<DataModalContextType | null>({
    editModalOpen: false,
    deleteModalOpen: false,
    handleModal: (closeModal: boolean, whichModal: boolean) => {},
});
 
export const DataModalProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const handleModal = (closeModal:boolean, whichModal: boolean) => {
        if(closeModal) {
          setEditModalOpen(false);
          setDeleteModalOpen(false);
          return;
        }
    
        if (whichModal) {
          setEditModalOpen(true);
          setDeleteModalOpen(false);
        } else {
          setEditModalOpen(false);
          setDeleteModalOpen(true);
        }
    }

    return (
        <DataModalContext.Provider value={{ editModalOpen, deleteModalOpen, handleModal }}>
            {children}
        </DataModalContext.Provider>
    );
};
 
export const useDataModalContext = () => {
    const context = useContext(DataModalContext);
    
    if (!context) {
        throw new Error('useThemeContext must be used inside the ThemeProvider');
    }
    
    return context;
};