import { Trash2 } from 'lucide-react'

export default function Profile({ currentUser, myOffers, onDeleteOffer }) {
    return (
        <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-6 mb-8">
                    <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-indigo-200"
                    />
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{currentUser.name}</h2>
                        <p className="text-gray-600 mt-1">
                            Баланс: <span className="font-semibold text-yellow-600">{currentUser.balance} коинов</span>
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Мои объявления</h3>

                    {myOffers.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <p className="text-gray-600 text-lg">У вас пока нет объявлений</p>
                            <p className="text-gray-500 mt-2">Нажмите «Создать» вверху, чтобы добавить первое</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myOffers.map(offer => (
                                <div
                                    key={offer.id}
                                    className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
                                >
                                    <div className="relative h-40">
                                        <img
                                            src={offer.image}
                                            alt={offer.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full font-bold flex items-center shadow">
                                            {offer.price} коинов
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h4 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">{offer.title}</h4>
                                        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{offer.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600 capitalize">{offer.category}</span>
                                            <button
                                                onClick={() => onDeleteOffer(offer.id)}
                                                className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm font-medium"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}