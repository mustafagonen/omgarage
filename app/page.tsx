'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function HomePage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
                <div className={styles.logo}>
                    <img src="/logo.png" alt="OMG Garaj" className={styles.logoImage} />
                </div>
                <div className="container">
                    <nav className={styles.navLinks}>
                        <a className={styles.pushRight} href="#hizmetler">
                            <span className={styles.navText}>Hizmetler</span>
                            <span className={styles.navUnderline}></span>
                        </a>
                        <a href="#iletisim">
                            <span className={styles.navText}>İletişim</span>
                            <span className={styles.navUnderline}></span>
                        </a>
                        <Link href="/admin" className="btn btn-primary">Yönetim Paneli</Link>
                    </nav>

                    {/* Enhanced Mobile Menu Button */}
                    <button
                        className={`${styles.hamburger} ${mobileMenuOpen ? styles.hamburgerActive : ''}`}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Menu"
                        suppressHydrationWarning
                    >
                        <span suppressHydrationWarning></span>
                        <span suppressHydrationWarning></span>
                        <span suppressHydrationWarning></span>
                    </button>
                </div>
            </header>

            {/* Enhanced Mobile Menu Overlay */}
            <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`} suppressHydrationWarning>
                <div className={styles.mobileMenuBackground}></div>
                <button
                    className={styles.mobileMenuClose}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close Menu"
                >
                    <span className={styles.closeIcon}></span>
                </button>
                <nav className={styles.mobileNav}>
                    <a
                        href="#hizmetler"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{ animationDelay: '0.1s' }}
                    >
                        <span className={styles.mobileNavNumber}>01</span>
                        Hizmetler
                    </a>
                    <a
                        href="#iletisim"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{ animationDelay: '0.2s' }}
                    >
                        <span className={styles.mobileNavNumber}>02</span>
                        İletişim
                    </a>
                    <Link
                        href="/admin"
                        className="btn btn-primary"
                        onClick={() => setMobileMenuOpen(false)}
                        style={{ animationDelay: '0.3s' }}
                    >
                        Yönetim Paneli
                    </Link>
                </nav>
                <div className={styles.mobileMenuDecor}>
                    <div className={styles.decorCircle}></div>
                    <div className={styles.decorCircle}></div>
                    <div className={styles.decorCircle}></div>
                </div>
            </div>

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1 className={`${styles.heroTitle} animate-fade-in`}>
                            Aracınız <span className={styles.highlight}>Yeni Gibi</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Profesyonel boya koruma, seramik kaplama ve detaylı bakım hizmetleri ile aracınızın değerini koruyun.
                        </p>
                        <div className={styles.heroButtons}>
                            <a href="#iletisim" className="btn btn-primary">Randevu Al</a>
                            <a href="#hizmetler" className="btn btn-secondary">Hizmetlerimiz</a>
                        </div>
                    </div>
                </div>
                <div className={styles.heroBackground}></div>
            </section>

            {/* About Section */}
            <section className={styles.about}>
                <div className={styles.aboutImageContainer}>
                    <div className={styles.aboutImage}></div>
                    <div className={styles.aboutOverlay}>
                        <div className="container">
                            <div className={styles.aboutContent}>
                                <h2 className={styles.aboutTitle}>OMG Garaj</h2>
                                <p className={styles.aboutSubtitle}>Profesyonel Araç Bakım Merkezi</p>
                                <p className={styles.aboutText}>
                                    Aracınızın bakımı ve korunması konusunda en kaliteli hizmeti sunuyoruz.
                                    Uzman ekibimiz ve premium ürünlerimizle aracınız her zaman yeni gibi.
                                </p>
                                <div className={styles.aboutFeatures}>
                                    <div className={styles.aboutFeature}>
                                        <span className={styles.aboutFeatureIcon}>✓</span>
                                        <span>Uzman Ekip</span>
                                    </div>
                                    <div className={styles.aboutFeature}>
                                        <span className={styles.aboutFeatureIcon}>✓</span>
                                        <span>Premium Ürünler</span>
                                    </div>
                                    <div className={styles.aboutFeature}>
                                        <span className={styles.aboutFeatureIcon}>✓</span>
                                        <span>Garanti</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brands Section */}
            <section className={styles.brands}>
                <div className="container">
                    <h3 className={styles.brandsTitle}>Kullandığımız Premium Markalar</h3>
                    <div className={styles.brandsGrid}>
                        <div className={styles.brandCard}>
                            <span className={styles.brandName}>3M</span>
                        </div>
                        <div className={styles.brandCard}>
                            <span className={styles.brandName}>Würth</span>
                        </div>
                        <div className={styles.brandCard}>
                            <span className={styles.brandName}>Polytop</span>
                        </div>
                        <div className={styles.brandCard}>
                            <span className={styles.brandName}>Meguiar's</span>
                        </div>
                        <div className={styles.brandCard}>
                            <span className={styles.brandName}>Menzerna</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="hizmetler" className={styles.services}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Hizmetlerimiz</h2>
                    <p className={styles.sectionSubtitle}>
                        Aracınız için en kaliteli bakım ve koruma hizmetleri
                    </p>

                    <div className={styles.servicesGrid}>

                        {/* Pasta Cila */}
                        <div className={`card ${styles.serviceCard}`}>
                            <div className={styles.serviceIcon}>💎</div>
                            <h3>Pasta Cila</h3>
                            <p>
                                Profesyonel pasta cila ile aracınızın boyasındaki çizikleri giderin, parlaklığını artırın.
                            </p>
                            <ul className={styles.serviceFeatures}>
                                <li>Çizik giderme</li>
                                <li>Renk canlandırma</li>
                                <li>Ayna gibi parlaklık</li>
                            </ul>
                        </div>

                        {/* Seramik Kaplama */}
                        <div className={`card ${styles.serviceCard}`}>
                            <div className={styles.serviceIcon}>✨</div>
                            <h3>Seramik Kaplama</h3>
                            <p>
                                Nano teknoloji ile aracınızın boyasına kalıcı koruma ve muhteşem bir parlaklık kazandırın.
                            </p>
                            <ul className={styles.serviceFeatures}>
                                <li>5 yıl dayanıklılık</li>
                                <li>Hidrofobik etki</li>
                                <li>Kolay temizlik</li>
                            </ul>
                        </div>

                        {/* Boya Koruma */}
                        <div className={`card ${styles.serviceCard}`}>
                            <div className={styles.serviceIcon}>🛡️</div>
                            <h3>Boya Koruma Filmi</h3>
                            <p>
                                Aracınızın boyasını taş çarpması, çizikler ve dış etkenlerden koruyan şeffaf koruyucu film uygulaması.
                            </p>
                            <ul className={styles.serviceFeatures}>
                                <li>10 yıl garanti</li>
                                <li>Kendini onarma özelliği</li>
                                <li>UV koruma</li>
                            </ul>
                        </div>

                        {/* PPF Kaplama */}
                        <div className={`card ${styles.serviceCard}`}>
                            <div className={styles.serviceIcon}>🛡️</div>
                            <h3>PPF Kaplama</h3>
                            <p>
                                Paint Protection Film ile aracınızın tüm yüzeyini taş çarpması, çizikler ve dış etkenlerden koruyun.
                            </p>
                            <ul className={styles.serviceFeatures}>
                                <li>Tam kaplama koruma</li>
                                <li>Kendini onarma teknolojisi</li>
                                <li>10 yıl garanti</li>
                            </ul>
                        </div>

                        {/* Detaylı Temizlik */}
                        <div className={`card ${styles.serviceCard}`}>
                            <div className={styles.serviceIcon}>🧽</div>
                            <h3>Detaylı Buharlı Temizlik</h3>
                            <p>
                                İç ve dış detaylı temizlik ile aracınızı showroom haline getirin.
                            </p>
                            <ul className={styles.serviceFeatures}>
                                <li>İç detay temizlik</li>
                                <li>Dış yüzey bakımı</li>
                                <li>Motor temizliği</li>
                            </ul>
                        </div>

                        {/* Motor Temizliği */}
                        <div className={`card ${styles.serviceCard}`}>
                            <div className={styles.serviceIcon}>🔧</div>
                            <h3>Motor Temizliği</h3>
                            <p>
                                Profesyonel motor temizliği ile motor bölümünüzü tertemiz yapın.
                            </p>
                            <ul className={styles.serviceFeatures}>
                                <li>Güvenli temizlik</li>
                                <li>Yağ ve kir giderme</li>
                                <li>Koruyucu kaplama</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="iletisim" className={styles.contact}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>İletişim</h2>
                    <p className={styles.sectionSubtitle}>
                        Randevu almak veya bilgi almak için bize ulaşın
                    </p>

                    <div className={styles.contactGrid}>
                        <div className={`card glass ${styles.contactInfo}`}>
                            <h3>Bize Ulaşın</h3>
                            <div className={styles.contactItem}>
                                <span className={styles.contactIcon}>📞</span>
                                <div>
                                    <strong>Telefon</strong>
                                    <p>0546 836 40 06</p>
                                </div>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.contactIcon}>📧</span>
                                <div>
                                    <strong>E-posta</strong>
                                    <p>omgarage@gmail.com</p>
                                </div>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.contactIcon}>📍</span>
                                <div>
                                    <strong>Adres</strong>
                                    <p>Mamak / Ankara</p>
                                </div>
                            </div>
                            <div className={styles.contactItem}>
                                <span className={styles.contactIcon}>🕐</span>
                                <div>
                                    <strong>Çalışma Saatleri</strong>
                                    <p>Pazartesi - Cumartesi: 09:00 - 19:00</p>
                                </div>
                            </div>
                            <a
                                href="https://www.google.com/maps/dir//OMG+GARAJ+ANKARA+ARA%C3%87+KAPLAMA+BOYA+KORUMA,+K%C4%B1br%C4%B1sk%C3%B6y,+K%C4%B1br%C4%B1s+K%C3%B6y%C3%BC+Cd.+No:37+A+Numara,+06105+Mamak%2FAnkara/@39.9044704,33.0217309,11z/data=!4m8!4m7!1m0!1m5!1m1!1s0x14d3513dc8418e8f:0x64298ddad0498093!2m2!1d32.9881307!2d39.8871444?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.mapLink}
                            >
                                <img
                                    src="/location-map.png"
                                    alt="OMG Garaj Konum - Mamak, Ankara"
                                    className={styles.mapImage}
                                />
                                <div className={styles.mapOverlay}>
                                    <span className={styles.mapIcon}>🗺️</span>
                                    <span className={styles.mapText}>Yol Tarifi Al</span>
                                </div>
                            </a>
                        </div>

                        <div className={`card glass ${styles.contactForm}`}>
                            <h3>Randevu Talebi</h3>
                            <form>
                                <div className={styles.formGroup}>
                                    <label className="label">Adınız Soyadınız</label>
                                    <input type="text" className="input" placeholder="Ad Soyad" required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className="label">Telefon</label>
                                    <input type="tel" className="input" placeholder="+90 XXX XXX XX XX" required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className="label">E-posta</label>
                                    <input type="email" className="input" placeholder="ornek@email.com" />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className="label">Hizmet</label>
                                    <select className="select" required>
                                        <option value="">Seçiniz</option>
                                        <option value="boya-koruma">Boya Koruma</option>
                                        <option value="seramik">Seramik Kaplama</option>
                                        <option value="pasta-cila">Pasta Cila</option>
                                        <option value="cam-filmi">Cam Filmi</option>
                                        <option value="detayli-temizlik">Detaylı Temizlik</option>
                                        <option value="motor">Motor Temizliği</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label className="label">Mesajınız</label>
                                    <textarea className="input" rows={4} placeholder="Detaylar..."></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                    Gönder
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className="container">
                    <div className={styles.footerContent}>
                        <div className={styles.footerBrand}>
                            <div className={styles.footerLogo}>
                                <img src="/logo.png" alt="OMG Garaj" className={styles.logoImage} />
                            </div>
                            <p>Profesyonel araç bakım hizmetleri</p>
                        </div>
                        <div className={styles.footerLinks}>
                            <div>
                                <h4>Hizmetler</h4>
                                <a href="#hizmetler">Boya Koruma</a>
                                <a href="#hizmetler">Seramik Kaplama</a>
                                <a href="#hizmetler">Pasta Cila</a>
                            </div>
                            <div>
                                <h4>İletişim</h4>
                                <a href="#iletisim">Randevu Al</a>
                                <a href="#iletisim">Bize Ulaşın</a>
                            </div>
                        </div>
                    </div>
                    <div className={styles.footerBottom}>
                        <p>&copy; 2026 OMG Garaj. Tüm hakları saklıdır.</p>
                    </div>
                </div>
            </footer >
        </div >
    );
}
