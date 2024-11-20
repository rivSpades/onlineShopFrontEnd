import React, { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export const useOrderContext = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orderData, setOrderData] = useState(null);

  const saveOrderData = (data) => {
    setOrderData(data);
  };

  return (
    <OrderContext.Provider value={{ orderData, saveOrderData }}>
      {children}
    </OrderContext.Provider>
  );
};
