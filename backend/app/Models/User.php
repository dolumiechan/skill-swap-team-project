<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Поля, которые можно заполнять массово
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'coins',  // Добавили для баланса
    ];

    /**
     * Поля, которые нужно скрывать при выводе в JSON
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Дополнительные поля в JSON (для фронта — баланс как balance)
     */
    protected $appends = ['balance'];

    public function getBalanceAttribute(): int
    {
        return (int) ($this->attributes['coins'] ?? 0);
    }

    /**
     * Преобразование типов
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }

    // Транзакции где пользователь покупателем
    public function boughtTransactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'buyer_id');
    }

    // Транзакции где пользователь продавцом
    public function soldTransactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'seller_id');
    }
}