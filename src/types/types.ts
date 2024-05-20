export interface LoginProps {
  roleRequired: string
}

export interface ProductFormProps{
  name: string;
  description: string;
  category: string;
  price: number;
  in_stock: boolean;
  amount: number;
  image?: string[];
}

export interface UserFormProps{
  name: string;
  lastname: string;
  username: string;
  email: string;
  role: string;
  address: string;
  password?: string;
}

export interface iProduct {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  in_stock: boolean;
  amount: number;
  image?: string[];
}

export interface iUser {
  _id?: string;
  name: string;
  lastname: string;
  username: string;
  email: string;
  password?: string;
  role: {
    code: string;
  }
  address: string;
}

export interface iInvoice {
  _id: string;
  order_id: string;
  date: Date;
  user: iUser;
  products: iProduct[];
  total: number;
}

