export interface ShippingAddress {
    fullName: string;
    mainAddress: string;
    optionalAddress: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export interface OrderItem {
    productId: number;
    name: string;
    pictureUrl: string;
    price: number;
    quantity: number;
}

export interface Order {
    id: number;
    buyerId: string;
    shippingAddress: ShippingAddress;
    orderDate: string;
    orderItems: OrderItem[];
    subtotal: number;
    deliveryFee: number;
    orderStatus: string;
    total: number;
  }
  
 
  
