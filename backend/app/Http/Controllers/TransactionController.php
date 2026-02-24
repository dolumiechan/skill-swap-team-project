<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    // POST /api/transactions
    public function store(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
        ]);

        $buyer = auth()->user();
        $service = Service::with('user')->findOrFail($request->service_id);
        $seller = $service->user;

        if ($buyer->id === $seller->id) {
            return response()->json(['message' => 'Нельзя купить свою услугу'], 400);
        }
        if ($buyer->coins < $service->price) {
            return response()->json(['message' => 'Недостаточно коинов'], 400);
        }
        if (!$service->is_active) {
            return response()->json(['message' => 'Услуга недоступна'], 400);
        }

        // ЗАПУСК ТРАНЗАКЦИИ БД
        return DB::transaction(function () use ($buyer, $seller, $service) {
            
            $buyer->decrement('coins', $service->price);
            
            $seller->increment('coins', $service->price);

            $transaction = Transaction::create([
                'buyer_id' => $buyer->id,
                'seller_id' => $seller->id,
                'service_id' => $service->id,
                'amount' => $service->price,
                'completed_at' => now(),
            ]);

            return response()->json([
                'message' => 'Услуга успешно куплена',
                'transaction' => $transaction,
                'new_balance' => $buyer->fresh()->coins
            ], 201);
        });
    }

    // GET /api/transactions
    public function index()
    {
        $user = auth()->user();
        
        $transactions = Transaction::with(['service', 'buyer', 'seller'])
            ->where('buyer_id', $user->id)
            ->orWhere('seller_id', $user->id)
            ->latest()
            ->paginate(20);

        return response()->json($transactions);
    }
}