import { Timestamp } from 'firebase/firestore';

export type CustomerStatus = 'pending' | 'in-progress' | 'completed';

export interface Customer {
    id: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    vehicleBrand: string;
    vehicleModel: string;
    vehiclePlate: string;
    services: string[]; // e.g., ["Seramik Kaplama", "Boya Koruma", "Pasta Cila"]
    price: number;
    receivedDate: Timestamp;
    deliveryDate: Timestamp;
    status: CustomerStatus;
    notes?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface CustomerFormData {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    vehicleBrand: string;
    vehicleModel: string;
    vehiclePlate: string;
    services: string[];
    price: number;
    receivedDate: Date;
    deliveryDate: Date;
    status: CustomerStatus;
    notes?: string;
}

export const SERVICE_OPTIONS = [
    'Boya Koruma',
    'Seramik Kaplama',
    'Pasta Cila',
    'Cam Filmi',
    'Detaylı Temizlik',
    'Motor Temizliği',
    'Diğer',
] as const;
