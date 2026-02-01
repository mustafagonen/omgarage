import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "OMG Garaj - Profesyonel Araç Bakım Hizmetleri",
    description: "Boya koruma, seramik kaplama, pasta cila ve detaylı araç bakım hizmetleri. OMG Garaj ile aracınız her zaman yeni gibi.",
    keywords: ["boya koruma", "seramik kaplama", "pasta cila", "araç bakım", "detailing", "cam filmi"],
    icons: {
        icon: '/logo.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr">
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}
