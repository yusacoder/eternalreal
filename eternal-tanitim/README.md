# Eternal Production — Tanıtım Sitesi

Admin paneli olmayan, sadece **data.json** üzerinden içerik gösteren statik bir
tanıtım / showcase sitesi.

## Çalıştırma

```bash
cd eternal-tanitim
python3 -m http.server 8080
```

Tarayıcıda `http://localhost:8080` adresini açın. (`file://` ile açarsanız
`fetch("data.json")` isteği tarayıcı güvenliği nedeniyle engellenir.)

## Klasör yapısı

```
eternal-tanitim/
├── index.html
├── data.json           → tüm site içeriği burada (hero, hakkımızda, sitelerimiz, ekip, SSS, iletişim)
├── css/style.css        → glassmorphism tema (admin paneliyle aynı marka dili)
└── js/
    ├── store.js          → data.json'u yükler (salt okunur, CRUD yok)
    ├── ui.js             → navbar + hamburger menü
    ├── render.js         → hero, istatistikler, hakkımızda, sitelerimiz, ekip, SSS, CTA, footer bölümleri
    ├── router.js         → tek sayfa anasayfa + her ekip üyesi için otomatik `#/ekip/:username` detay sayfası
    └── main.js           → başlatma
```

## data.json içinde neler var

- `site` — başlık, logo metni, slogan
- `hero` — ana başlık, açıklama, CTA butonları, görsel
- `stats` — dashboard tarzı istatistik şeridi
- `about` — hakkımızda metni + öne çıkan 4 madde
- `sites` — Anime / Manga / Haber sitelerinin kartları (isim, açıklama, görsel, link)
- `team` — ekip üyeleri (görsel, unvan, etiketler, biyografi, sosyal medya) — her biri için
  otomatik olarak `#/ekip/kullaniciadi` detay sayfası oluşur
- `faq` — sıkça sorulan sorular (akordiyon)
- `contact` / `social` — iletişim ve sosyal medya linkleri

Yeni bir ekip üyesi, site veya SSS eklemek için tek yapmanız gereken `data.json`
içine yeni bir nesne eklemek — sayfa otomatik olarak güncellenir, HTML'e dokunmanıza gerek yok.

## Not

Bu site tamamen görüntüleme amaçlıdır; kullanıcı ekleme/silme/yetki gibi
admin işlemleri içermez. Böyle bir yönetim paneline ihtiyacınız olursa,
daha önce hazırlanan `eternal-panel` projesini kullanabilirsiniz.
