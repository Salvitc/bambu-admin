export interface LoginProps {
  roleRequired: string
}

export interface DataType {
  key: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

export interface FormProps {
  name: string;
  description: string;
  category: string;
  price: number;
  in_stock: boolean;
  amount: number;
  image?: string[];
}



