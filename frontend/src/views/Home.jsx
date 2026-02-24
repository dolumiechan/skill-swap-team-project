import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import OfferCard from '../components/OfferCard'
import PurchaseModal from '../components/PurchaseModal'
import { getServices, getCategories } from '../data/api'

function Home() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedOffer, setSelectedOffer] = useState(null)
    const [offers, setOffers] = useState([])
    const [categories, setCategories] = useState([
        { id: 'all', label: 'Все' },
    ])
    const [filteredOffers, setFilteredOffers] = useState([])

    useEffect(() => {
        // Загрузка офферов
        getServices()
            .then(data => setOffers(Array.isArray(data) ? data : (data.data || [])))
            .catch(() => setOffers([]))
        // Загрузка категорий
        getCategories()
            .then(data => {
                setCategories([
                    { id: 'all', label: 'Все' },
                    ...data.map(cat => ({ id: cat.id, label: cat.name }))
                ])
            })
            .catch(() => setCategories([{ id: 'all', label: 'Все' }]))
    }, [])

    useEffect(() => {
        const term = searchTerm.toLowerCase().trim();
        const filtered = offers.filter(offer => {
            const matchesSearch =
                offer.title?.toLowerCase().includes(term) ||
                offer.description?.toLowerCase().includes(term) ||
                offer.author?.toLowerCase().includes(term);
            const matchesCategory =
                selectedCategory === 'all' || offer.category_id === selectedCategory;
            return matchesSearch && matchesCategory;
        });
        setFilteredOffers(filtered);
    }, [searchTerm, selectedCategory, offers]);

    const handleBuyClick = (offerId) => {
        const offer = offers.find(o => o.id === offerId)
        if (offer) setSelectedOffer(offer)
    }

    const handleConfirmPurchase = (offer) => {
        const success = onPurchase(offer)
        if (success) {
            setSelectedOffer(null)
        }
    }

    const closeModal = () => setSelectedOffer(null)

 

    return (
        <div className="space-y-8 pb-12">
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden shadow-xl">
                <div className="relative z-10 max-w-3xl">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                        Обменивайся навыками, учись новому!
                    </h1>
                    <p className="text-lg md:text-xl mb-8 opacity-90">
                        Предлагай свои умения и получай коины. Трать их на обучение у других.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition shadow-md">
                            Начать обучать
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Поиск по навыкам, преподавателям..."
                        className="
              w-full pl-12 pr-4 py-3
              border border-gray-300 rounded-xl
              focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
              outline-none bg-white shadow-sm
              text-gray-900 placeholder:text-gray-500 text-base
            "
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id === 'all' ? 'all' : cat.id)}
                            className={`
                px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition
                ${selectedCategory === cat.id
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                }
              `}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {filteredOffers.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-200">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        Ничего не найдено
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Попробуйте изменить поисковый запрос или выбрать другую категорию
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredOffers.map(offer => {
                        const cat = categories.find(c => c.id === offer.category_id || c.id === offer.category);
                        const categoryName = cat ? cat.label || cat.name : offer.category_id;
                        return (
                            <OfferCard
                                key={offer.id}
                                offer={offer}
                                categoryName={categoryName}
                                onBuy={handleBuyClick}
                            />
                        );
                    })}
                </div>
            )}


            <PurchaseModal
                isOpen={!!selectedOffer}
                onClose={closeModal}
                offer={selectedOffer}
                onConfirm={handleConfirmPurchase}
            />
        </div>
    )
}

export default Home
