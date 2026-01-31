# OMGarage

Modern bir garaj yönetim sistemi - Next.js, TypeScript ve Firebase ile geliştirilmiştir.

## 🚀 Netlify Deployment

### Environment Variables Ayarları

Netlify dashboard'unuzda aşağıdaki environment variables'ları eklemeniz gerekmektedir:

1. Netlify dashboard'a gidin: https://app.netlify.com
2. Site Settings > Environment Variables bölümüne gidin
3. Aşağıdaki değişkenleri ekleyin:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

4. "Save" butonuna tıklayın
5. "Trigger deploy" ile yeniden deploy edin

### Firebase Credentials Nasıl Bulunur?

1. Firebase Console'a gidin: https://console.firebase.google.com
2. Projenizi seçin
3. Project Settings (⚙️) > General sekmesine gidin
4. "Your apps" bölümünde web app'inizi bulun
5. Firebase SDK snippet > Config seçeneğini seçin
6. Değerleri kopyalayıp Netlify'a ekleyin

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

## 📦 Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** CSS Modules
- **Backend:** Firebase (Firestore, Auth)
- **Deployment:** Netlify

## 📝 Features

- 🔐 Firebase Authentication
- 📅 Takvim Yönetimi
- 👥 Müşteri Yönetimi
- 📊 Admin Dashboard
- 🎨 Modern UI/UX

## 🔧 Build Issues?

Eğer build sırasında `auth/invalid-api-key` hatası alıyorsanız:
- Netlify environment variables'larını kontrol edin
- Firebase credentials'larınızın doğru olduğundan emin olun
- Netlify'da yeniden deploy edin
