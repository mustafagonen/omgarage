# 🚀 Firebase Hosting Deployment Guide

## Kurulum Adımları

### 1. Firebase CLI Yükleyin

```bash
npm install -g firebase-tools
```

### 2. Firebase'e Giriş Yapın

```bash
firebase login
```

### 3. Firebase Projenizi Başlatın

```bash
firebase init hosting
```

Sorulara şu şekilde cevap verin:
- **Use an existing project?** → Yes
- **Select your Firebase project** → Projenizi seçin
- **Public directory?** → `out`
- **Configure as single-page app?** → Yes
- **Set up automatic builds?** → No
- **Overwrite firebase.json?** → No (zaten oluşturduk)

### 4. .env.local Dosyası Oluşturun

```bash
cp .env.local.example .env.local
```

Firebase credentials'larınızı `.env.local` dosyasına ekleyin:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 5. Build ve Deploy

```bash
# Production deployment
npm run deploy

# Preview deployment (test için)
npm run deploy:preview
```

## 📋 Deployment Komutları

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Development server başlatır |
| `npm run build` | Production build oluşturur |
| `npm run export` | Static export oluşturur (out/ klasörüne) |
| `npm run deploy` | Firebase Hosting'e deploy eder |
| `npm run deploy:preview` | Preview channel'a deploy eder |

## 🔧 Firebase Credentials Nasıl Bulunur?

1. [Firebase Console](https://console.firebase.google.com) → Projenizi seçin
2. **Project Settings** ⚙️ → **General** sekmesi
3. **Your apps** bölümünde web app'inizi bulun
4. **Config** seçeneğini seçin
5. Değerleri kopyalayın

## ✅ Avantajlar (Netlify'a göre)

- ✨ Firebase servisleriyle tam entegrasyon
- 🔐 Environment variables otomatik çalışır
- 🚀 Daha hızlı deployment
- 💰 Ücretsiz SSL sertifikası
- 🌍 Global CDN
- 📊 Firebase Console'dan analytics

## 🎯 Deployment Sonrası

Deploy tamamlandıktan sonra:
- URL: `https://your-project-id.web.app`
- Custom domain ekleyebilirsiniz: Firebase Console → Hosting → Add custom domain

## 🐛 Sorun Giderme

**Build hatası alıyorsanız:**
```bash
# Cache temizle
rm -rf .next out
npm run build
```

**Firebase CLI güncellemesi:**
```bash
npm install -g firebase-tools@latest
```
