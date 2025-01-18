import React, { useState } from 'react';
import { Package, Truck, CheckCircle, XCircle, RefreshCcw, ChevronDown } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

type OrderStatus = 'all' | 'arriving' | 'cancelled' | 'refunded';

const OrderStatusPanel = () => {
  const { orders } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'arriving':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'refunded':
        return <RefreshCcw className="w-5 h-5 text-orange-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredOrders = orders.filter(
    order => selectedStatus === 'all' || order.status === selectedStatus
  );

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {(['all', 'arriving', 'cancelled', 'refunded'] as OrderStatus[]).map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedStatus === status
                ? 'bg-primary text-white'
                : 'bg-white/50 hover:bg-white/80'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white/50 backdrop-blur-sm p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon(order.status)}
                <div>
                  <h3 className="font-medium">{order.product}</h3>
                  <p className="text-sm text-gray-500">Order ID: {order.id}</p>
                </div>
              </div>
              <button
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    expandedOrder === order.id ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
            </div>
            
            {expandedOrder === order.id && order.trackingStatus && (
              <div className="mt-4 space-y-2 pl-4 border-l-2 border-primary/30">
                {order.trackingStatus.map((status, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <p className="text-sm">
                      <span className="text-gray-500">{status.date}:</span> {status.status}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusPanel;