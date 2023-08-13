type Restaurants = {
  id: number;
  image: string;
  name: string;
  sales: number;
  owner: Owner;
  phoneNumbers: number[];
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  deliveryFee: number;
  discounts: Discount[];
  orders: Order[];
  categories: Category[];
  menuItems: MenuItem[];
  email: string;
  status: string;
  rate: number
};

type Owner = {
  id: number;
  image: string;
  name: string;
  email: string;
  phoneNumber: string;
  created_at: string;
  role: string;
  address: string;
};

type Discount = {
  id: number;
  name: string;
  description: string;
  discount: number;
  type: string;
  createdAt: string;
};

type Order = {
  id: number;
  user: Owner;
  createdAt: string;
  status: string;
  totalPrice: number;
  deliveryFee: number;
  discount: number;
  total: number;
};

type Category = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
};

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
  visible: boolean;
};

export default Restaurants;
