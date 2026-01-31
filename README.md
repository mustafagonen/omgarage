# OMGarage

Modern bir garaj yönetim sistemi - Next.js, TypeScript ve Firebase ile geliştirilmiştir.

## 🚀 Firebase Hosting Deployment

### Hızlı Başlangıç

```bash
# Firebase CLI yükleyin
npm install -g firebase-tools

# Firebase'e giriş yapın
firebase login

# Hosting'i başlatın
firebase init hosting

# Deploy edin
npm run deploy
```

Detaylı deployment talimatları için [DEPLOYMENT.md](DEPLOYMENT.md) dosyasına bakın.

### Environment Variables

`.env.local` dosyası oluşturun:

```bash
cp .env.local.example .env.local
```

Firebase credentials'larınızı ekleyin. Credentials'ları bulmak için:
1. [Firebase Console](https://console.firebase.google.com) → Projenizi seçin
2. Project Settings ⚙️ → General
3. Your apps → Config

## 🛠️ Local Development

```bash
# Dependencies yükleyin
npm install

# .env.local dosyası oluşturun
cp .env.local.example .env.local

# Firebase credentials'ları .env.local dosyasına ekleyin

# Development server'ı başlatın
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📦 Tech Stack

- **Framework:** Next.js 15 (Static Export)
- **Language:** TypeScript
- **Styling:** CSS Modules
- **Backend:** Firebase (Firestore, Auth)
- **Hosting:** Firebase Hosting
- **Database:** Cloud Firestore

## 📝 Features

- 🔐 Firebase Authentication
- 📅 Takvim Yönetimi
- 👥 Müşteri Yönetimi
- 📊 Admin Dashboard
- 🎨 Modern UI/UX
- 📱 Responsive Design

## 🔧 Available Scripts

| Script | Açıklama |
|--------|----------|
| `npm run dev` | Development server başlatır |
| `npm run build` | Production build oluşturur |
| `npm run export` | Static export oluşturur |
| `npm run deploy` | Firebase Hosting'e deploy eder |
| `npm run deploy:preview` | Preview channel'a deploy eder |

## 📁 Project Structure

```
omgarage/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   │   ├── calendar/      # Takvim sayfası
│   │   └── customers/     # Müşteri yönetimi
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Ana sayfa
├── lib/                   # Utilities & configs
│   ├── firebase.ts        # Firebase initialization
│   ├── firebase-config.ts # Firebase config
│   └── types.ts           # TypeScript types
├── hooks/                 # Custom React hooks
├── public/                # Static assets
└── firebase.json          # Firebase Hosting config
```

## 🔒 Security

- Firestore Security Rules yapılandırılmıştır
- Environment variables ile güvenli credential yönetimi
- Client-side authentication

## 🌐 Deployment

Deploy sonrası URL: `https://your-project-id.web.app`

Custom domain eklemek için:
1. Firebase Console → Hosting
2. Add custom domain
3. DNS kayıtlarını güncelleyin

