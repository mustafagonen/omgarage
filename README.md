# OMG Garaj - Kurulum Rehberi

## Firebase Kurulumu

### 1. Firebase Projesi Oluşturun

1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. "Add project" (Proje ekle) butonuna tıklayın
3. Proje adını girin (örn: "omg-garaj")
4. Google Analytics'i istediğiniz gibi yapılandırın
5. "Create project" butonuna tıklayın

### 2. Firestore Database Oluşturun

1. Sol menüden "Build" > "Firestore Database" seçin
2. "Create database" butonuna tıklayın
3. **Test mode** seçin (daha sonra güvenlik kurallarını güncelleyeceğiz)
4. Lokasyon seçin (örn: europe-west3)
5. "Enable" butonuna tıklayın

### 3. Firebase Authentication Aktifleştirin

1. Sol menüden "Build" > "Authentication" seçin
2. "Get started" butonuna tıklayın
3. "Email/Password" seçeneğini aktifleştirin
4. İlk admin kullanıcınızı ekleyin:
   - "Users" sekmesine gidin
   - "Add user" butonuna tıklayın
   - Email ve şifre girin

### 4. Firebase Yapılandırmasını Alın

1. Sol üstteki ⚙️ (ayarlar) ikonuna tıklayın
2. "Project settings" seçin
3. Aşağı kaydırın ve "Your apps" bölümünde "</>" (Web) ikonuna tıklayın
4. App nickname girin (örn: "omg-garaj-web")
5. "Register app" butonuna tıklayın
6. Firebase yapılandırma bilgilerini kopyalayın

### 5. Environment Variables Ayarlayın

1. Proje klasöründe `.env.local` dosyası oluşturun
2. Aşağıdaki bilgileri Firebase'den aldığınız değerlerle doldurun:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 6. Firestore Security Rules Güncelleyin

1. Firebase Console'da "Firestore Database" > "Rules" sekmesine gidin
2. `firestore.rules` dosyasındaki kuralları kopyalayıp yapıştırın
3. "Publish" butonuna tıklayın

## Yerel Geliştirme

### Bağımlılıkları Yükleyin

```bash
npm install
```

### Development Server'ı Başlatın

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin.

## Kullanım

### Ana Sayfa (Public Website)

- **URL**: `http://localhost:3000`
- Hizmetleri görüntüleyin
- İletişim formu ile randevu talebi gönderin
- "Yönetim Paneli" butonuna tıklayarak admin paneline geçin

### Yönetim Paneli

- **URL**: `http://localhost:3000/admin`
- **Dashboard**: İstatistikler ve genel bakış
- **Müşteriler**: Müşteri ekleme, düzenleme, silme
- **Takvim**: Alış ve teslim tarihlerini görüntüleme

### Müşteri Ekleme

1. Yönetim panelinde "Müşteriler" sayfasına gidin
2. "+ Yeni Müşteri" butonuna tıklayın
3. Formu doldurun:
   - Müşteri bilgileri (ad, telefon, email)
   - Araç bilgileri (marka, model, plaka)
   - Hizmetler (birden fazla seçilebilir)
   - Fiyat
   - Alış ve teslim tarihleri
   - Durum (Bekliyor, Devam Ediyor, Tamamlandı)
   - Notlar (opsiyonel)
4. "Kaydet" butonuna tıklayın

### Takvim Kullanımı

- Mavi işaretler (📥): Alış tarihleri
- Yeşil işaretler (📤): Teslim tarihleri
- Ay değiştirmek için "Önceki Ay" / "Sonraki Ay" butonlarını kullanın
- "Bugün" butonu ile güncel aya dönün

## Production Build

```bash
npm run build
npm start
```

## Deployment

### Netlify (Önerilen)

1. GitHub repository'nizi oluşturun ve push yapın
2. [Netlify](https://netlify.com) hesabı oluşturun
3. "Add new site" → "Import an existing project" seçin
4. GitHub repository'nizi bağlayın
5. Environment variables ekleyin (Firebase config)
6. Deploy edin

Detaylı adımlar için `deployment-guide.md` dosyasına bakın.

### Diğer Platformlar

- Vercel
- Firebase Hosting
- AWS Amplify

## Özelleştirme

### Renk Tonları

`app/globals.css` dosyasında CSS değişkenlerini düzenleyin:

```css
:root {
  --color-dark: #20242B;
  --color-gold: #C8936D;
  /* ... */
}
```

### Logo

`public/` klasörüne `logo.png` dosyasını ekleyin ve header componentlerinde kullanın.

### İletişim Bilgileri

`app/page.tsx` dosyasında iletişim bilgilerini güncelleyin.

## Sorun Giderme

### Firebase Bağlantı Hatası

- `.env.local` dosyasının doğru yapılandırıldığından emin olun
- Development server'ı yeniden başlatın

### Firestore Permission Denied

- Firestore security rules'ın doğru yüklendiğinden emin olun
- Firebase Authentication'ın aktif olduğundan emin olun

### Build Hatası

```bash
rm -rf .next
npm install
npm run dev
```

## Destek

Herhangi bir sorun yaşarsanız:
1. Firebase Console'da hataları kontrol edin
2. Browser console'da JavaScript hatalarını kontrol edin
3. Network sekmesinde API çağrılarını kontrol edin
