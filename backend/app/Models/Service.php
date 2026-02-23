<?php
namespace App\Models; 
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = ['user_id', 'category_id', 'title', 'description', 'price', 'is_active'];

    // Связь: Услуга принадлежит пользователю (автору)
    public function user() {
        return $this->belongsTo(User::class);
    }

    // Связь: Услуга принадлежит категории
    public function category() {
        return $this->belongsTo(Category::class);
    }
}