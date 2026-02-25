FROM php:8.2-fpm

WORKDIR /var/www/html

# Устанавливаем системные зависимости и расширения PHP для PostgreSQL
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql \
    && rm -rf /var/lib/apt/lists/*

# Устанавливаем Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Копируем файлы проекта
COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --no-interaction --no-progress

COPY . .

# Папки для кэшей/логов
RUN chown -R www-data:www-data storage bootstrap/cache

# Порт PHP-FPM
EXPOSE 9000

CMD ["php-fpm"]

