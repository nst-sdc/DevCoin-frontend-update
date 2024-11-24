export interface AuthUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  isAdmin?: boolean;
  photoURL?: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  contributions?: number;
  photoURL?: string;
}

export interface Contribution {
  type: 'PR' | 'COLLAB' | 'EVENT' | 'OTHER';
  description: string;
  coins: number;
  timestamp?: number;
}
