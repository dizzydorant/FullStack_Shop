export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
