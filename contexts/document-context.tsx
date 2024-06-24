'use client';

import { Order, defaultOrder } from '@/modules/orders/domain/order';
import { OrderItem, defaultOrderItem } from '@/modules/orders/domain/order-item';
import { Visit, defaultVisit } from '@/modules/visits/domain/visit';
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

interface DocumentContextType {
    orderDocument: Order,
    visit: Visit,
    orderItemsDocument: OrderItem[],
    setOrderDocument: Dispatch<SetStateAction<Order>>,
    setVisit: Dispatch<SetStateAction<Visit>>,
    setOrderItemsDocument: Dispatch<SetStateAction<OrderItem[]>>,
}

export const DocumentContext = createContext<DocumentContextType | null>({
    orderDocument: defaultOrder,
    visit: defaultVisit,
    orderItemsDocument: [],
    setOrderDocument: () => {},
    setVisit: () => {},
    setOrderItemsDocument: () => {},
});

export const DocumentProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
  const [orderDocument, setOrderDocument] = useState(defaultOrder);
  const [visit, setVisit] = useState(defaultVisit);
  const [orderItemsDocument, setOrderItemsDocument] = useState([defaultOrderItem]);

  return (
    <DocumentContext.Provider
      value={{
        orderDocument,
        visit,
        orderItemsDocument,
        setOrderDocument,
        setVisit,
        setOrderItemsDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};
 
export const useDocumentContext = () => {
    const context = useContext(DocumentContext);
    
    if (!context) {
        throw new Error('useDocumentContext must be used inside the DocumentProvider');
    }
    
    return context;
};