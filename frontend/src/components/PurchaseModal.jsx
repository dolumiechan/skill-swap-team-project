import { useState } from 'react';
import { Coins, X, ShoppingCart } from 'lucide-react';
import PropTypes from 'prop-types';

export default function PurchaseModal({
    isOpen,
    onClose,
    offer,
    onConfirm,
    currentUser,
}) {
    const [loading, setLoading] = useState(false);

    if (!isOpen || !offer) return null;

    const balance = currentUser?.balance ?? 0;
    const afterBalance = balance - offer.price;
    const canAfford = afterBalance >= 0 && !loading;
    const authorName = offer.user?.name ?? offer.author ?? '—';

    const handleConfirm = () => {
        if (!canAfford) return;
        setLoading(true);
        Promise.resolve(onConfirm(offer))
            .finally(() => setLoading(false));
    };
    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingCart className="w-8 h-8 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Приобрести урок?
                    </h3>
                    <p className="text-gray-600 mb-1">Вы собираетесь купить:</p>
                    <p className="font-semibold text-lg text-indigo-700">
                        {offer.title}
                    </p>
                    {offer.description ? (
                        <p className="text-gray-600 text-sm mt-2 text-left max-h-24 overflow-y-auto">
                            {offer.description}
                        </p>
                    ) : null}
                </div>

                <div className="bg-gray-50 rounded-lg p-5 mb-6 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Преподаватель:</span>
                        <span className="font-medium text-gray-900">{authorName}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Стоимость:</span>
                        <span className="font-medium text-yellow-600 flex items-center gap-1.5">
                            <Coins className="w-5 h-5" />
                            {offer.price}
                        </span>
                    </div>

                    <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                        <span className="text-gray-600">Баланс после покупки:</span>
                        <span
                            className={`font-medium ${canAfford ? 'text-green-600' : 'text-red-600'}`}
                        >
                            {afterBalance}
                        </span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition active:bg-gray-100"
                    >
                        Отмена
                    </button>

                    <button
                        onClick={handleConfirm}
                        disabled={!canAfford}
                        className={`flex-1 py-3 px-4 rounded-lg font-semibold transition ${canAfford ? 'bg-indigo-600 hover:bg-indigo-700 text-white active:bg-indigo-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                        {loading ? 'Покупка…' : 'Подтвердить покупку'}
                    </button>
                </div>
            </div>
        </div>
    );
}

PurchaseModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    offer: PropTypes.object,
    onConfirm: PropTypes.func.isRequired,
    currentUser: PropTypes.object,
};