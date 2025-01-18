import React, { createContext, useContext, useState } from 'react';

export interface Address {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault?: boolean;
}

interface Transaction {
  id: number;
  type: 'expense' | 'recharge';
  amount: number;
  date: string;
  description: string;
}

interface Order {
  id: string;
  product: string;
  date: string;
  status: 'arriving' | 'cancelled' | 'refunded';
  trackingId: string;
  amount: number;
  deliveryDate?: string;
  trackingStatus?: Array<{ date: string; status: string }>;
}

interface AppContextType {
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  walletBalance: number;
  updateWalletBalance: (amount: number) => void;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      name: "Home",
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      isDefault: true
    }
  ]);

  const [walletBalance, setWalletBalance] = useState(1000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress = {
      ...address,
      id: addresses.length + 1
    };
    setAddresses([...addresses, newAddress]);
  };

  const updateWalletBalance = (amount: number) => {
    setWalletBalance(prev => prev + amount);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction = {
      ...transaction,
      id: transactions.length + 1,
      date: new Date().toISOString()
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const addOrder = (order: Omit<Order, 'id' | 'date'>) => {
    const newOrder = {
      ...order,
      id: `ORD${orders.length + 1}`,
      date: new Date().toISOString()
    };
    setOrders([newOrder, ...orders]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  return (
    <AppContext.Provider value={{
      addresses,
      addAddress,
      walletBalance,
      updateWalletBalance,
      transactions,
      addTransaction,
      orders,
      addOrder,
      updateOrderStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};