# bavadvisory.com

Situs statis Budaya Alam Advisory (BAV). Tanpa build step: HTML, CSS, dan JS biasa.

## Struktur

```
index.html              Landing page
aksesibilitas.html      Pernyataan aksesibilitas
404.html                Halaman galat GitHub Pages
assets/css/style.css    Seluruh gaya, termasuk mode aksesibilitas
assets/js/main.js       Menu seluler, panel aksesibilitas, visual titik
assets/img/             Logo (positif & negatif) dan favicon
CNAME                   Domain kustom: bavadvisory.com
.nojekyll               Matikan pemrosesan Jekyll
robots.txt, sitemap.xml
```

## Deploy ke GitHub Pages

1. Masuk ke akun GitHub BAV, buat repositori publik (mis. `bavadvisory.com`).
2. Unggah seluruh isi folder ini ke cabang `main` (termasuk `CNAME` dan `.nojekyll`).
3. Settings → Pages → Source: *Deploy from a branch*, Branch: `main` / `(root)`.
4. Di pengelola DNS domain:
   - Empat record **A** untuk `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Record **CNAME** `www` → `<akun-bav>.github.io`
5. Settings → Pages → Custom domain: `bavadvisory.com`, lalu centang **Enforce HTTPS** setelah sertifikat terbit.
6. Disarankan: verifikasi domain di Settings akun → Pages agar domain tidak bisa diklaim akun lain.

Cek ulang alamat IP di dokumentasi GitHub Pages sebelum mengisi DNS.

## Aksesibilitas (WCAG 2.2 AA)

- Diuji dengan axe-core 4 (aturan WCAG 2.0/2.1/2.2 A & AA + best practice): 0 pelanggaran, termasuk mode kontras tinggi dan spasi longgar.
- Reflow pada lebar 320 px tanpa gulir horizontal.
- Uji otomatis hanya menangkap sebagian masalah. Sebelum peluncuran, lakukan uji manual: navigasi papan ketik penuh, NVDA (Windows) atau VoiceOver (macOS/iOS), TalkBack (Android), dan zoom 200–400%.

Aturan warna: kuning `#EFE444` hanya dipakai di atas biru gelap atau biru, tidak pernah sebagai teks di latar putih (kontras ±1,3:1).

## Yang perlu diisi atau diputuskan

- Tautan proyek Adat dan Iklim mengarah ke `https://adatdaniklim.com`. Ganti bila domainnya berbeda.
- Footer mencantumkan "Jakarta, Indonesia". Sesuaikan dengan alamat badan hukum.
- Font dimuat dari Google Fonts. Untuk privasi dan kecepatan, bisa di-self-host di `assets/fonts/`.
- Versi bahasa Inggris untuk donor dan mitra internasional (disarankan sebagai `/en/`).
