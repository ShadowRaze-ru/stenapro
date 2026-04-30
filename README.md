# СтеныПро — Landing Page

Лендинг для компании по монтажу межкомнатных перегородок в Москве и МО.

**Стек:** Vue 3 · Vite · EmailJS · Firebase Hosting · Яндекс.Метрика

---

## Быстрый старт

```bash
npm install
npm run dev
```

Сайт откроется на `http://localhost:5173`

---

## Переменные окружения

Скопируй `.env.example` в `.env` и заполни значения:

```bash
cp .env.example .env
```

| Переменная | Где взять |
|---|---|
| `VITE_EMAILJS_PUBLIC_KEY` | [emailjs.com](https://emailjs.com) → Account → API Keys |
| `VITE_EMAILJS_SERVICE_ID` | EmailJS → Email Services |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS → Email Templates |
| `VITE_YANDEX_METRIKA_ID` | [metrika.yandex.ru](https://metrika.yandex.ru) |

> **Важно:** файл `.env` добавлен в `.gitignore` — не коммить его в репозиторий.

---

## Скрипты

| Команда | Описание |
|---|---|
| `npm run dev` | Запуск dev-сервера с hot reload |
| `npm run build` | Сборка + prerenderинг в `dist/` |
| `npm run preview` | Предпросмотр продакшн-сборки локально |
| `npm run deploy` | Сборка и деплой на Firebase Hosting |

---

## Деплой на Firebase

1. Установи Firebase CLI: `npm install -g firebase-tools`
2. Войди: `firebase login`
3. Задеплой: `npm run deploy`

Конфигурация хостинга — в файле `firebase.json`.

---

## Prerender

После `vite build` автоматически запускается `prerender.mjs`:

- Поднимает `vite preview` на порту `3033`
- Открывает страницу через Puppeteer
- Сохраняет готовый HTML в `dist/index.html`

Это улучшает SEO — поисковики получают полностью отрендеренную страницу.

---

## Структура

```
stena-pro/
├── public/
│   ├── logo.jpg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/
│   └── App.vue          # Вся логика и стили — в одном компоненте
├── .env                 # Секреты (не коммитить!)
├── .env.example
├── firebase.json
├── index.html
├── prerender.mjs
└── vite.config.js
```
