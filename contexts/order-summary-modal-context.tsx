import { createContext, useContext, useEffect, useState } from 'react';
 
interface OrderSummaryModalContextType {
    deleteModalOpen: boolean,
    itemModalOpen: boolean,
    checkoutModalOpen: boolean,
    handleModal: (deleteModalOpen: boolean, itemModalOpen: boolean, checkoutModalOpen: boolean) => void,
}

export const OrderSummaryModalContext = createContext<OrderSummaryModalContextType | null>({
    deleteModalOpen: false,
    itemModalOpen: false,
    checkoutModalOpen: false,
    handleModal: () => {},
});
 
export const OrderSummaryModalProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [itemModalOpen, setItemModalOpen] = useState<boolean>(false);
    const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);

    const handleModal = (deleteModal:boolean, itemModal:boolean, checkoutModal:boolean) => {
        if (deleteModal) {
            setDeleteModalOpen(true);
            setItemModalOpen(false);
            setCheckoutModalOpen(false);
            return;
        }
        if (itemModal) {
            setDeleteModalOpen(false);
            setItemModalOpen(true);
            setCheckoutModalOpen(false);
            return;
        }
        if (checkoutModal) {
            setDeleteModalOpen(false);
            setItemModalOpen(false);
            setCheckoutModalOpen(true);
            return;
        }
        setDeleteModalOpen(false);
        setItemModalOpen(false);
        setCheckoutModalOpen(false);
        return;
    }

    return (
        <OrderSummaryModalContext.Provider value={{ deleteModalOpen, itemModalOpen, checkoutModalOpen, handleModal }}>
            {children}
        </OrderSummaryModalContext.Provider>
    );
};
 
export const useOrderSummaryModalContext = () => {
    const context = useContext(OrderSummaryModalContext);
    
    if (!context) {
        throw new Error('useThemeContext must be used inside the ThemeProvider');
    }
    
    return context;
};