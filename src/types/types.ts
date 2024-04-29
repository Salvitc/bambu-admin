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
  _id: string;
  name: string;
  lastname: string;
  username: string;
  email: string;
  role: {
    code: string;
  }
  address: string;
}
