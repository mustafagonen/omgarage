'use client';

import { useState } from 'react';
import { useCustomers } from '@/hooks/useCustomers';
import { CustomerFormData, SERVICE_OPTIONS } from '@/lib/types';
import styles from './customers.module.css';

// Force dynamic rendering to prevent build-time Firebase errors
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function CustomersPage() {
    const { customers, loading, addCustomer, updateCustomer, deleteCustomer } = useCustomers();
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const [formData, setFormData] = useState<CustomerFormData>({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        vehicleBrand: '',
        vehicleModel: '',
        vehiclePlate: '',
        services: [],
        price: 0,
        receivedDate: new Date(),
        deliveryDate: new Date(),
        status: 'pending',
        notes: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateCustomer(editingId, formData);
            } else {
                await addCustomer(formData);
            }
            resetForm();
        } catch (error) {
            console.error('Error saving customer:', error);
            alert('Bir hata oluştu!');
        }
    };

    const handleEdit = (customer: any) => {
        setEditingId(customer.id);
        setFormData({
            customerName: customer.customerName,
            customerPhone: customer.customerPhone,
            customerEmail: customer.customerEmail || '',
            vehicleBrand: customer.vehicleBrand,
            vehicleModel: customer.vehicleModel,
            vehiclePlate: customer.vehiclePlate,
            services: customer.services,
            price: customer.price,
            receivedDate: customer.receivedDate.toDate(),
            deliveryDate: customer.deliveryDate.toDate(),
            status: customer.status,
            notes: customer.notes || '',
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Bu müşteriyi silmek istediğinizden emin misiniz?')) {
            try {
                await deleteCustomer(id);
            } catch (error) {
                console.error('Error deleting customer:', error);
                alert('Silme işlemi başarısız!');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            customerName: '',
            customerPhone: '',
            customerEmail: '',
            vehicleBrand: '',
            vehicleModel: '',
            vehiclePlate: '',
            services: [],
            price: 0,
            receivedDate: new Date(),
            deliveryDate: new Date(),
            status: 'pending',
            notes: '',
        });
        setEditingId(null);
        setShowForm(false);
    };

    const toggleService = (service: string) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.includes(service)
                ? prev.services.filter(s => s !== service)
                : [...prev.services, service]
        }));
    };

    // Filter customers
    const filteredCustomers = customers.filter(customer => {
        const matchesSearch =
            customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.vehicleBrand.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Yükleniyor...</p>
            </div>
        );
    }

    return (
        <div className={styles.customersPage}>
            <div className={styles.header}>
                <div>
                    <h1>Müşteriler</h1>
                    <p className={styles.subtitle}>Toplam {customers.length} müşteri</p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? '✕ İptal' : '+ Yeni Müşteri'}
                </button>
            </div>

            {/* Form */}
            {showForm && (
                <div className={`card ${styles.formCard}`}>
                    <h2>{editingId ? 'Müşteri Düzenle' : 'Yeni Müşteri Ekle'}</h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className="label">Müşteri Adı *</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={formData.customerName}
                                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className="label">Telefon *</label>
                                <input
                                    type="tel"
                                    className="input"
                                    value={formData.customerPhone}
                                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className="label">E-posta</label>
                                <input
                                    type="email"
                                    className="input"
                                    value={formData.customerEmail}
                                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className="label">Araç Markası *</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={formData.vehicleBrand}
                                    onChange={(e) => setFormData({ ...formData, vehicleBrand: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className="label">Araç Modeli *</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={formData.vehicleModel}
                                    onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className="label">Plaka *</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={formData.vehiclePlate}
                                    onChange={(e) => setFormData({ ...formData, vehiclePlate: e.target.value.toUpperCase() })}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className="label">Hizmetler *</label>
                            <div className={styles.servicesGrid}>
                                {SERVICE_OPTIONS.map((service) => (
                                    <label key={service} className={styles.checkbox}>
                                        <input
                                            type="checkbox"
                                            checked={formData.services.includes(service)}
                                            onChange={() => toggleService(service)}
                                        />
                                        <span>{service}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className="label">Fiyat (₺) *</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                    required
                                    min="0"
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className="label">Alış Tarihi *</label>
                                <input
                                    type="date"
                                    className="input"
                                    value={formData.receivedDate.toISOString().split('T')[0]}
                                    onChange={(e) => setFormData({ ...formData, receivedDate: new Date(e.target.value) })}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className="label">Teslim Tarihi *</label>
                                <input
                                    type="date"
                                    className="input"
                                    value={formData.deliveryDate.toISOString().split('T')[0]}
                                    onChange={(e) => setFormData({ ...formData, deliveryDate: new Date(e.target.value) })}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className="label">Durum *</label>
                                <select
                                    className="select"
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                    required
                                >
                                    <option value="pending">Bekliyor</option>
                                    <option value="in-progress">Devam Ediyor</option>
                                    <option value="completed">Tamamlandı</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label className="label">Notlar</label>
                            <textarea
                                className="input"
                                rows={3}
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            />
                        </div>

                        <div className={styles.formActions}>
                            <button type="submit" className="btn btn-primary">
                                {editingId ? 'Güncelle' : 'Kaydet'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                İptal
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Filters */}
            <div className={styles.filters}>
                <input
                    type="text"
                    className="input"
                    placeholder="Müşteri adı, plaka veya marka ile ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="all">Tüm Durumlar</option>
                    <option value="pending">Bekliyor</option>
                    <option value="in-progress">Devam Ediyor</option>
                    <option value="completed">Tamamlandı</option>
                </select>
            </div>

            {/* Customers Table */}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Müşteri</th>
                            <th>Araç</th>
                            <th>Plaka</th>
                            <th>Hizmetler</th>
                            <th>Alış Tarihi</th>
                            <th>Teslim Tarihi</th>
                            <th>Durum</th>
                            <th>Fiyat</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map((customer) => (
                            <tr key={customer.id}>
                                <td>
                                    <div className={styles.customerCell}>
                                        <strong>{customer.customerName}</strong>
                                        <span>{customer.customerPhone}</span>
                                    </div>
                                </td>
                                <td>{customer.vehicleBrand} {customer.vehicleModel}</td>
                                <td><strong>{customer.vehiclePlate}</strong></td>
                                <td>
                                    <div className={styles.servicesCell}>
                                        {customer.services.slice(0, 2).map((service, idx) => (
                                            <span key={idx} className={styles.serviceBadge}>{service}</span>
                                        ))}
                                        {customer.services.length > 2 && (
                                            <span className={styles.serviceBadge}>+{customer.services.length - 2}</span>
                                        )}
                                    </div>
                                </td>
                                <td>{customer.receivedDate.toDate().toLocaleDateString('tr-TR')}</td>
                                <td>{customer.deliveryDate.toDate().toLocaleDateString('tr-TR')}</td>
                                <td>
                                    <span className={`${styles.statusBadge} ${styles[customer.status]}`}>
                                        {customer.status === 'pending' && 'Bekliyor'}
                                        {customer.status === 'in-progress' && 'Devam Ediyor'}
                                        {customer.status === 'completed' && 'Tamamlandı'}
                                    </span>
                                </td>
                                <td className={styles.price}>₺{customer.price.toLocaleString('tr-TR')}</td>
                                <td>
                                    <div className={styles.actions}>
                                        <button
                                            className={styles.btnEdit}
                                            onClick={() => handleEdit(customer)}
                                            title="Düzenle"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            className={styles.btnDelete}
                                            onClick={() => handleDelete(customer.id)}
                                            title="Sil"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredCustomers.length === 0 && (
                    <div className={styles.emptyState}>
                        <p>Müşteri bulunamadı</p>
                    </div>
                )}
            </div>
        </div>
    );
}
