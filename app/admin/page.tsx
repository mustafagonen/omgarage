'use client';

import { useCustomers } from '@/hooks/useCustomers';
import styles from './dashboard.module.css';

export default function AdminDashboard() {
    const { customers, loading } = useCustomers();

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Yükleniyor...</p>
            </div>
        );
    }

    // Calculate statistics
    const totalCustomers = customers.length;
    const activeJobs = customers.filter(c => c.status === 'in-progress').length;
    const pendingJobs = customers.filter(c => c.status === 'pending').length;
    const completedJobs = customers.filter(c => c.status === 'completed').length;
    const totalRevenue = customers.reduce((sum, c) => sum + c.price, 0);

    // Upcoming deliveries (next 7 days)
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const upcomingDeliveries = customers.filter(c => {
        const deliveryDate = c.deliveryDate.toDate();
        return deliveryDate >= now && deliveryDate <= nextWeek && c.status !== 'completed';
    });

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1>Dashboard</h1>
                <p className={styles.subtitle}>Hoş geldiniz! İşletmenizin genel durumunu buradan takip edebilirsiniz.</p>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                <div className={`card ${styles.statCard}`}>
                    <div className={styles.statIcon}>👥</div>
                    <div className={styles.statContent}>
                        <h3>Toplam Müşteri</h3>
                        <p className={styles.statValue}>{totalCustomers}</p>
                    </div>
                </div>

                <div className={`card ${styles.statCard}`}>
                    <div className={styles.statIcon}>🔄</div>
                    <div className={styles.statContent}>
                        <h3>Devam Eden İşler</h3>
                        <p className={styles.statValue}>{activeJobs}</p>
                    </div>
                </div>

                <div className={`card ${styles.statCard}`}>
                    <div className={styles.statIcon}>⏳</div>
                    <div className={styles.statContent}>
                        <h3>Bekleyen İşler</h3>
                        <p className={styles.statValue}>{pendingJobs}</p>
                    </div>
                </div>

                <div className={`card ${styles.statCard}`}>
                    <div className={styles.statIcon}>✅</div>
                    <div className={styles.statContent}>
                        <h3>Tamamlanan</h3>
                        <p className={styles.statValue}>{completedJobs}</p>
                    </div>
                </div>

                <div className={`card ${styles.statCard} ${styles.revenueCard}`}>
                    <div className={styles.statIcon}>💰</div>
                    <div className={styles.statContent}>
                        <h3>Toplam Gelir</h3>
                        <p className={styles.statValue}>₺{totalRevenue.toLocaleString('tr-TR')}</p>
                    </div>
                </div>

                <div className={`card ${styles.statCard}`}>
                    <div className={styles.statIcon}>📅</div>
                    <div className={styles.statContent}>
                        <h3>Yaklaşan Teslimler</h3>
                        <p className={styles.statValue}>{upcomingDeliveries.length}</p>
                        <p className={styles.statSubtext}>Önümüzdeki 7 gün</p>
                    </div>
                </div>
            </div>

            {/* Upcoming Deliveries */}
            {upcomingDeliveries.length > 0 && (
                <div className={styles.section}>
                    <h2>Yaklaşan Teslimler</h2>
                    <div className={styles.deliveriesList}>
                        {upcomingDeliveries.slice(0, 5).map((customer) => (
                            <div key={customer.id} className={`card ${styles.deliveryCard}`}>
                                <div className={styles.deliveryInfo}>
                                    <h4>{customer.customerName}</h4>
                                    <p className={styles.vehicleInfo}>
                                        {customer.vehicleBrand} {customer.vehicleModel} - {customer.vehiclePlate}
                                    </p>
                                    <div className={styles.services}>
                                        {customer.services.map((service, idx) => (
                                            <span key={idx} className={styles.serviceBadge}>{service}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className={styles.deliveryDate}>
                                    <span className={styles.dateLabel}>Teslim Tarihi</span>
                                    <span className={styles.dateValue}>
                                        {customer.deliveryDate.toDate().toLocaleDateString('tr-TR')}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Recent Customers */}
            <div className={styles.section}>
                <h2>Son Müşteriler</h2>
                <div className={styles.recentList}>
                    {customers.slice(0, 5).map((customer) => (
                        <div key={customer.id} className={`card ${styles.customerCard}`}>
                            <div className={styles.customerInfo}>
                                <h4>{customer.customerName}</h4>
                                <p>{customer.vehicleBrand} {customer.vehicleModel}</p>
                            </div>
                            <div className={styles.customerMeta}>
                                <span className={`${styles.statusBadge} ${styles[customer.status]}`}>
                                    {customer.status === 'pending' && 'Bekliyor'}
                                    {customer.status === 'in-progress' && 'Devam Ediyor'}
                                    {customer.status === 'completed' && 'Tamamlandı'}
                                </span>
                                <span className={styles.price}>₺{customer.price.toLocaleString('tr-TR')}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
