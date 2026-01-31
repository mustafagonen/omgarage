import type { Metadata } from "next";
import Link from "next/link";
import styles from "./admin.module.css";

export const metadata: Metadata = {
    title: "Yönetim Paneli - OMG Garaj",
    description: "Müşteri yönetimi ve randevu takibi",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.adminLayout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logo}>
                        <img src="/logo.png" alt="OMG Garaj" style={{ height: '80px', width: 'auto' }} />
                    </div>
                    <p className={styles.sidebarTitle}>Yönetim Paneli</p>
                </div>

                <nav className={styles.sidebarNav}>
                    <Link href="/admin" className={styles.navItem}>
                        <span className={styles.navIcon}>📊</span>
                        Dashboard
                    </Link>
                    <Link href="/admin/customers" className={styles.navItem}>
                        <span className={styles.navIcon}>👥</span>
                        Müşteriler
                    </Link>
                    <Link href="/admin/calendar" className={styles.navItem}>
                        <span className={styles.navIcon}>📅</span>
                        Takvim
                    </Link>
                </nav>

                <div className={styles.sidebarFooter}>
                    <Link href="/" className={styles.backLink}>
                        ← Ana Sayfaya Dön
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
