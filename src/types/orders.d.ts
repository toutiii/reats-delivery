interface Customer {
   name: string;
   address: string;
   phone?: string;
   email: string;
}

interface PickupInfo {
   date: string;
   time: string;
   timeLeft: string;
}

interface Order {
   id: string;
   status: OrderStatus;
   type?: string;
   time?: string;
   customer: Customer;
   pickup?: PickupInfo;
   notes: string;
}

type OrderStatus =
   | 'Pickup Pending'
   | 'Pickup Failed'
   | 'Pickup Rescheduled'
   | 'Delivery Failed'
   | 'Delivered'
   | 'Delivery Pending'
   | 'Delivery Rescheduled';
