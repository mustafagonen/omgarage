'use client';

import { useState, useEffect } from 'react';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Customer, CustomerFormData } from '@/lib/types';

export function useCustomers() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Subscribe to customers collection
    useEffect(() => {
        if (!db) {
            setLoading(false);
            return;
        }

        const q = query(collection(db, 'customers'), orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const customersData: Customer[] = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Customer[];

                setCustomers(customersData);
                setLoading(false);
            },
            (err) => {
                console.error('Error fetching customers:', err);
                setError(err.message);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    // Add new customer
    const addCustomer = async (data: CustomerFormData) => {
        if (!db) throw new Error('Database not initialized');
        try {
            const now = Timestamp.now();
            await addDoc(collection(db!, 'customers'), {
                ...data,
                receivedDate: Timestamp.fromDate(data.receivedDate),
                deliveryDate: Timestamp.fromDate(data.deliveryDate),
                createdAt: now,
                updatedAt: now,
            });
        } catch (err: any) {
            console.error('Error adding customer:', err);
            throw new Error(err.message);
        }
    };

    // Update customer
    const updateCustomer = async (id: string, data: Partial<CustomerFormData>) => {
        if (!db) throw new Error('Database not initialized');
        try {
            const customerRef = doc(db!, 'customers', id);
            const updateData: any = {
                ...data,
                updatedAt: Timestamp.now(),
            };

            if (data.receivedDate) {
                updateData.receivedDate = Timestamp.fromDate(data.receivedDate);
            }
            if (data.deliveryDate) {
                updateData.deliveryDate = Timestamp.fromDate(data.deliveryDate);
            }

            await updateDoc(customerRef, updateData);
        } catch (err: any) {
            console.error('Error updating customer:', err);
            throw new Error(err.message);
        }
    };

    // Delete customer
    const deleteCustomer = async (id: string) => {
        if (!db) throw new Error('Database not initialized');
        try {
            await deleteDoc(doc(db!, 'customers', id));
        } catch (err: any) {
            console.error('Error deleting customer:', err);
            throw new Error(err.message);
        }
    };

    return {
        customers,
        loading,
        error,
        addCustomer,
        updateCustomer,
        deleteCustomer,
    };
}
