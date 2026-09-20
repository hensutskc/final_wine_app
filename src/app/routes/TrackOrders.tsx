import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Package, Truck, CheckCircle2, Clock } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  wines: string[];
  status: 'pending' | 'shipped' | 'delivered';
  orderDate: string;
  estimatedDelivery: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2026-001',
    wines: ['Château Margaux 2018', 'Opus One 2019'],
    status: 'delivered',
    orderDate: 'March 15, 2026',
    estimatedDelivery: 'March 20, 2026',
  },
  {
    id: '2',
    orderNumber: 'ORD-2026-002',
    wines: ['Dom Pérignon 2012'],
    status: 'shipped',
    orderDate: 'March 22, 2026',
    estimatedDelivery: 'March 28, 2026',
  },
  {
    id: '3',
    orderNumber: 'ORD-2026-003',
    wines: ['Barolo Reserva 2017', 'Sassicaia 2018', 'Brunello di Montalcino 2016'],
    status: 'pending',
    orderDate: 'March 24, 2026',
    estimatedDelivery: 'March 30, 2026',
  },
];

export function TrackOrders() {
  const navigate = useNavigate();
  const [orders] = useState<Order[]>(mockOrders);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5" />;
      case 'shipped':
        return <Truck className="w-5 h-5" />;
      case 'delivered':
        return <CheckCircle2 className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto p-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/home')}
          className="mb-4 hover:bg-[#D4AF37]/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="flex items-center gap-3 mb-8">
          <Package className="w-10 h-10 text-[#D4AF37]" />
          <div>
            <h1 className="text-3xl">Track My Orders</h1>
            <p className="text-muted-foreground">Monitor your wine deliveries</p>
          </div>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="border-2 border-[#D4AF37]">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{order.orderNumber}</CardTitle>
                    <CardDescription>Ordered on {order.orderDate}</CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} border`}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-1">Items ({order.wines.length})</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {order.wines.map((wine, index) => (
                        <li key={index}>• {wine}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 border-t border-[#D4AF37]/30">
                    <p className="text-sm">
                      <span className="font-medium">Estimated Delivery:</span> {order.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-[#D4AF37] mx-auto mb-4 opacity-50" />
            <h2 className="text-xl mb-2">No orders yet</h2>
            <p className="text-muted-foreground">Your wine orders will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
