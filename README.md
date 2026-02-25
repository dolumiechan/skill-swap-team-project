# SkillSwap — документация

## Установка и запуск (после клонирования с GitHub)

### Требования

- **PHP** 8.2 или выше (расширения: pdo_pgsql, mbstring, openssl, tokenizer, xml, ctype, json)
- **Composer**
- **PostgreSQL** (установленный и запущенный)
- **Node.js** 18+ и **npm**

### Шаг 1. Клонирование

```bash
git clone <URL-репозитория> skill-swap
cd skill-swap
```

### Шаг 2. Бэкенд

```bash
cd backend
composer install
```

Создайте файл окружения и сгенерируйте ключ приложения:

```bash
# Windows (cmd / PowerShell)
copy .env.example .env

# Linux / macOS
cp .env.example .env

php artisan key:generate
```

В проекте используется **PostgreSQL**. Создайте базу данных (например, в psql или pgAdmin):

```sql
CREATE DATABASE skillswap;
```

В файле `backend/.env` укажите подключение к PostgreSQL:

```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=skillswap
DB_USERNAME=postgres
DB_PASSWORD=ваш_пароль
```

Выполните миграции:

```bash
php artisan migrate
```

Запуск API (оставьте терминал открытым):

```bash
php artisan serve
```

API будет доступен по адресу **http://127.0.0.1:8000**.

### Шаг 3. Фронтенд

В **новом** терминале, из корня проекта:

```bash
cd frontend
npm install
npm run dev
```

Фронтенд откроется по адресу **http://localhost:5173** (или другому порту из вывода Vite). Запросы к `/api` проксируются на бэкенд (http://127.0.0.1:8000).

### Шаг 4. Проверка

1. Откройте в браузере URL фронтенда (например http://localhost:5173).
2. Зарегистрируйтесь или войдите — данные сохраняются в БД бэкенда.
3. Создайте объявление, купите урок за коины, проверьте профиль и историю транзакций.

### Сборка фронтенда для продакшена

```bash
cd frontend
npm run build
```

Статические файлы появятся в папке `frontend/dist`. Раздавайте их любым веб-сервером; для API настройте проксирование запросов с `/api` на бэкенд.

---

## Бэкенд

**Стек:** PHP 8.2+, Laravel 12, Laravel Sanctum, **PostgreSQL**.

**Назначение:** REST API для обмена навыками: регистрация/авторизация, категории, объявления (услуги), транзакции и баланс коинов.

**Структура API (префикс `/api`):**

| Метод | Путь | Описание | Авторизация |
|-------|------|----------|-------------|
| POST | `/register` | Регистрация (email, password, name) | — |
| POST | `/login` | Вход (email, password), возвращает token и user | — |
| GET | `/categories` | Список категорий | — |
| GET | `/services` | Список объявлений (услуг) | — |
| GET | `/services/{id}` | Одно объявление | — |
| GET | `/users/{id}` | Профиль пользователя (баланс, объявления) | Bearer token |
| GET | `/user` | Текущий пользователь | Bearer token |
| POST | `/services` | Создать объявление | Bearer token |
| PUT | `/services/{id}` | Обновить объявление | Bearer token |
| DELETE | `/services/{id}` | Удалить объявление | Bearer token |
| POST | `/transactions` | Создать покупку (service_id) — списание коинов | Bearer token |
| GET | `/transactions` | История транзакций пользователя | Bearer token |

**Запуск:** из папки `backend`: `php artisan serve` (по умолчанию http://127.0.0.1:8000). CORS настроен для работы с фронтендом.

---

## Фронтенд

**Стек:** React 19, Vite 7, React Router 7, Tailwind CSS 4, Axios, Lucide React.

**Назначение:** SPA для пользователей: главная с поиском и фильтром по категориям, карточки объявлений, покупка уроков за коины, профиль с объявлениями и историей транзакций, авторизация и создание/редактирование объявлений.

**Маршруты:**

- `/` — главная: список объявлений, поиск, категории, кнопка «Начать обучать», модалка покупки.
- `/create` — форма создания объявления (название, описание, категория, цена, изображение).
- `/profile` — профиль (только для авторизованных): аватар, баланс, вкладки «Мои объявления» и «История транзакций», редактирование/удаление объявлений.

**Основные модули:**

- `src/data/api.js` — клиент Axios, все запросы к бэкенду (`/api`); Vite проксирует `/api` на бэкенд.
- `src/views/Home.jsx` — главная, загрузка офферов и категорий с API, фильтрация.
- `src/views/CreateOffer.jsx` — форма создания/редактирования объявления.
- `src/views/Profile.jsx` — профиль, объявления пользователя, транзакции.
- `src/components/Navbar.jsx` — шапка, вход/регистрация/баланс/профиль.
- `src/components/OfferCard.jsx` — карточка объявления с кнопкой «Купить».
- `src/components/PurchaseModal.jsx` — модалка подтверждения покупки за коины.
- `src/components/AuthModal.jsx` — модалка входа/регистрации.
- `src/data/placeholders.js` — data URI SVG для аватаров и обложек по умолчанию.

**Запуск:** из папки `frontend`: `npm run dev`. Прокси в `vite.config.js` перенаправляет запросы с `/api` на бэкенд (например, http://127.0.0.1:8000).
