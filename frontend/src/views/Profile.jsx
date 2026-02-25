import { useState, useEffect } from 'react'
import { Trash2, Pencil, History, FileText } from 'lucide-react'
import { getUser, deleteService, getTransactions } from '../data/api'
import CreateOffer from './CreateOffer'
import { PLACEHOLDER_AVATAR_LG, PLACEHOLDER_OFFER_IMAGE } from '../data/placeholders'

const TAB_OFFERS = 'offers'
const TAB_TRANSACTIONS = 'transactions'

function Profile({ currentUser, token, addToast }) {
    const [profileUser, setProfileUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [editingOffer, setEditingOffer] = useState(null)
    const [activeTab, setActiveTab] = useState(TAB_OFFERS)
    const [transactions, setTransactions] = useState([])
    const [transactionsLoading, setTransactionsLoading] = useState(false)

    useEffect(() => {
        if (!currentUser?.id || !token) return
        setLoading(true)
        getUser(currentUser.id, token)
            .then(data => setProfileUser(data))
            .catch(() => setProfileUser(null))
            .finally(() => setLoading(false))
    }, [currentUser?.id, token])

    const loadUser = () => {
        if (!currentUser?.id || !token) return
        setLoading(true)
        getUser(currentUser.id, token)
            .then(data => setProfileUser(data))
            .catch(() => setProfileUser(null))
            .finally(() => setLoading(false))
    }

    const myOffers = profileUser?.services ?? []

    useEffect(() => {
        if (activeTab === TAB_TRANSACTIONS && token) {
            setTransactionsLoading(true)
            getTransactions(token)
                .then(data => {
                    const list = Array.isArray(data) ? data : (data.data ?? [])
                    setTransactions(list)
                })
                .catch(() => setTransactions([]))
                .finally(() => setTransactionsLoading(false))
        }
    }, [activeTab, token])

    const handleDelete = (offerId) => {
        if (!window.confirm('Удалить это объявление?')) return
        deleteService(offerId, token)
            .then(() => {
                addToast('Объявление удалено', 'success')
                loadUser()
            })
            .catch(e => {
                addToast(e?.message || 'Ошибка удаления', 'error')
            })
    }

    const handleUpdate = () => {
        setEditingOffer(null)
        addToast('Объявление обновлено', 'success')
        loadUser()
    }

    if (!currentUser) return <div className="text-gray-600">Загрузка профиля...</div>
    if (loading && !profileUser) return <div className="text-gray-600">Загрузка...</div>

    const displayUser = profileUser || currentUser

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center gap-6 mb-8">
                    <img
                        src={displayUser.avatar || PLACEHOLDER_AVATAR_LG}
                        alt={displayUser.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-indigo-200"
                    />
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{displayUser.name}</h2>
                        <p className="text-gray-600 mt-1">
                            Баланс: <span className="font-semibold text-yellow-600">{displayUser.balance ?? 0} коинов</span>
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                    <div className="flex gap-2 mb-6">
                        <button
                            type="button"
                            onClick={() => setActiveTab(TAB_OFFERS)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition ${activeTab === TAB_OFFERS ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            <FileText className="w-5 h-5" />
                            Мои объявления
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab(TAB_TRANSACTIONS)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition ${activeTab === TAB_TRANSACTIONS ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                            <History className="w-5 h-5" />
                            История транзакций
                        </button>
                    </div>

                    {activeTab === TAB_OFFERS && (
                        <>
                            <h3 className="text-xl font-bold mb-6 text-gray-900">Объявления</h3>
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
                                            src={offer.image || PLACEHOLDER_OFFER_IMAGE}
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
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <span className="text-sm text-gray-600">
                                                {offer.category?.name ?? `Категория #${offer.category_id}`}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingOffer(offer)}
                                                    className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 text-sm font-medium"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                    Изменить
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(offer.id)}
                                                    className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm font-medium"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Удалить
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                        </>
                    )}

                    {activeTab === TAB_TRANSACTIONS && (
                        <>
                            <h3 className="text-xl font-bold mb-6 text-gray-900">История транзакций</h3>
                            {transactionsLoading ? (
                                <div className="text-center py-12 text-gray-500">Загрузка...</div>
                            ) : transactions.length === 0 ? (
                                <div className="text-center py-12 bg-gray-50 rounded-xl">
                                    <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600 text-lg">Пока нет транзакций</p>
                                    <p className="text-gray-500 mt-2">Покупки и продажи появятся здесь</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {transactions.map(tx => {
                                        const isBuyer = tx.buyer_id === currentUser?.id
                                        const otherUser = isBuyer ? tx.seller : tx.buyer
                                        const service = tx.service
                                        const date = tx.completed_at ? new Date(tx.completed_at).toLocaleString('ru-RU') : '—'
                                        return (
                                            <div
                                                key={tx.id}
                                                className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200"
                                            >
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-gray-900">
                                                        {isBuyer ? (
                                                            <>Куплено: <span className="text-indigo-600">{service?.title ?? 'Услуга'}</span> у {otherUser?.name ?? '—'}</>
                                                        ) : (
                                                            <>Продано: <span className="text-indigo-600">{service?.title ?? 'Услуга'}</span> пользователю {otherUser?.name ?? '—'}</>
                                                        )}
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-1">{date}</p>
                                                </div>
                                                <div className="flex items-center gap-2 font-semibold text-yellow-600">
                                                    {tx.amount} коинов
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {editingOffer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <CreateOffer
                            initialOffer={editingOffer}
                            token={token}
                            onUpdate={handleUpdate}
                            onCancel={() => setEditingOffer(null)}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile
