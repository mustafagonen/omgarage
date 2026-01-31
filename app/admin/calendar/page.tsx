'use client';

import { useCustomers } from '@/hooks/useCustomers';
import { useState } from 'react';
import styles from './calendar.module.css';

export default function CalendarPage() {
    const { customers, loading } = useCustomers();
    const [currentDate, setCurrentDate] = useState(new Date());

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Yükleniyor...</p>
            </div>
        );
    }

    // Get current month and year
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Month names in Turkish
    const monthNames = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];

    // Navigate months
    const previousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    // Get customers for a specific date
    const getCustomersForDate = (day: number) => {
        const date = new Date(year, month, day);
        const dateStr = date.toDateString();

        return customers.filter(customer => {
            const receivedDate = customer.receivedDate.toDate().toDateString();
            const deliveryDate = customer.deliveryDate.toDate().toDateString();
            return receivedDate === dateStr || deliveryDate === dateStr;
        });
    };

    // Create calendar days array
    const calendarDays = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
        calendarDays.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        calendarDays.push(day);
    }

    // Check if date is today
    const isToday = (day: number) => {
        const today = new Date();
        return day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();
    };

    return (
        <div className={styles.calendarPage}>
            <div className={styles.header}>
                <div>
                    <h1>Takvim</h1>
                    <p className={styles.subtitle}>Alış ve teslim tarihlerini görüntüleyin</p>
                </div>
            </div>

            {/* Calendar Controls */}
            <div className={`card ${styles.controls}`}>
                <button className="btn btn-secondary" onClick={previousMonth}>
                    ← Önceki Ay
                </button>
                <div className={styles.currentMonth}>
                    <h2>{monthNames[month]} {year}</h2>
                    <button className="btn btn-primary" onClick={goToToday}>
                        Bugün
                    </button>
                </div>
                <button className="btn btn-secondary" onClick={nextMonth}>
                    Sonraki Ay →
                </button>
            </div>

            {/* Calendar Grid */}
            <div className={`card ${styles.calendarCard}`}>
                {/* Day headers */}
                <div className={styles.calendarGrid}>
                    {['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'].map((day) => (
                        <div key={day} className={styles.dayHeader}>
                            {day}
                        </div>
                    ))}

                    {/* Calendar days */}
                    {calendarDays.map((day, index) => {
                        if (day === null) {
                            return <div key={`empty-${index}`} className={styles.emptyDay}></div>;
                        }

                        const dayCustomers = getCustomersForDate(day);
                        const hasReceived = dayCustomers.some(c =>
                            c.receivedDate.toDate().getDate() === day
                        );
                        const hasDelivery = dayCustomers.some(c =>
                            c.deliveryDate.toDate().getDate() === day
                        );

                        return (
                            <div
                                key={day}
                                className={`${styles.calendarDay} ${isToday(day) ? styles.today : ''}`}
                            >
                                <div className={styles.dayNumber}>{day}</div>

                                {dayCustomers.length > 0 && (
                                    <div className={styles.dayEvents}>
                                        {dayCustomers.map((customer) => {
                                            const isReceived = customer.receivedDate.toDate().getDate() === day;
                                            const isDelivery = customer.deliveryDate.toDate().getDate() === day;

                                            return (
                                                <div
                                                    key={customer.id}
                                                    className={`${styles.event} ${isReceived ? styles.eventReceived : styles.eventDelivery}`}
                                                    title={`${customer.customerName} - ${customer.vehicleBrand} ${customer.vehicleModel}`}
                                                >
                                                    <span className={styles.eventIcon}>
                                                        {isReceived ? '📥' : '📤'}
                                                    </span>
                                                    <span className={styles.eventText}>
                                                        {customer.vehiclePlate}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className={`card ${styles.legend}`}>
                <h3>Açıklama</h3>
                <div className={styles.legendItems}>
                    <div className={styles.legendItem}>
                        <span className={`${styles.legendDot} ${styles.received}`}></span>
                        <span>📥 Alış Tarihi</span>
                    </div>
                    <div className={styles.legendItem}>
                        <span className={`${styles.legendDot} ${styles.delivery}`}></span>
                        <span>📤 Teslim Tarihi</span>
                    </div>
                    <div className={styles.legendItem}>
                        <span className={`${styles.legendDot} ${styles.today}`}></span>
                        <span>Bugün</span>
                    </div>
                </div>
            </div>

            {/* Monthly Summary */}
            <div className={styles.summaryGrid}>
                <div className={`card ${styles.summaryCard}`}>
                    <h3>Bu Ay Alınan Araçlar</h3>
                    <p className={styles.summaryValue}>
                        {customers.filter(c => {
                            const date = c.receivedDate.toDate();
                            return date.getMonth() === month && date.getFullYear() === year;
                        }).length}
                    </p>
                </div>
                <div className={`card ${styles.summaryCard}`}>
                    <h3>Bu Ay Teslim Edilenler</h3>
                    <p className={styles.summaryValue}>
                        {customers.filter(c => {
                            const date = c.deliveryDate.toDate();
                            return date.getMonth() === month && date.getFullYear() === year && c.status === 'completed';
                        }).length}
                    </p>
                </div>
                <div className={`card ${styles.summaryCard}`}>
                    <h3>Bekleyen Teslimler</h3>
                    <p className={styles.summaryValue}>
                        {customers.filter(c => {
                            const date = c.deliveryDate.toDate();
                            return date.getMonth() === month && date.getFullYear() === year && c.status !== 'completed';
                        }).length}
                    </p>
                </div>
            </div>
        </div>
    );
}
