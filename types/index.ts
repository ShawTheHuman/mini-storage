export type UnitSize = '5x5' | '5x10' | '10x10' | '10x15' | '10x20';

export interface StorageUnit {
    id: string;
    name: string;
    size: UnitSize;
    price: number;
    description: string;
    features: string[];
    isAvailable: boolean;
    image?: string;
    location: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    rentedUnitIds: string[];
}

export interface PaymentMethod {
    id: string;
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
}

export interface Transaction {
    id: string;
    unitId: string;
    amount: number;
    date: string;
    status: 'succeeded' | 'pending' | 'failed';
}
