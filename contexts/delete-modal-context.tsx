import { createContext, useContext, useEffect, useState } from 'react';
 
interface DeleteModalContextType {
    modalOpen: boolean,
    handleModal: (modalOpen: boolean) => void,
}

export const DeleteModalContext = createContext<DeleteModalContextType | null>({
    modalOpen: false,
    handleModal: () => {},
});
 
export const DeleteModalProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleModal = () => {
        setModalOpen(!modalOpen);
    }

    return (
        <DeleteModalContext.Provider value={{ modalOpen, handleModal }}>
            {children}
        </DeleteModalContext.Provider>
    );
};
 
export const useDeleteModalContext = () => {
    const context = useContext(DeleteModalContext);
    
    if (!context) {
        throw new Error('useThemeContext must be used inside the ThemeProvider');
    }
    
    return context;
};