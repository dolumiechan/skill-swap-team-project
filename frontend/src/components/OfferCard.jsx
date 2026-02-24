import { Coins } from 'lucide-react';
import PropTypes from 'prop-types';
import { currentUser } from '../data/mockData';

export default function OfferCard({ offer, onBuy }) {
    const isOwnOffer = offer.userId === currentUser.id;

    const categoryName = {
        education: 'Образование',
        music: 'Музыка',
        art: 'Искусство',
        tech: 'Технологии',
        sport: 'Спорт',
        other: 'Другое',
    }[offer.category] || offer.category;

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full card-hover">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />

                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full font-bold flex items-center shadow-lg">
                    <Coins className="w-4 h-4 mr-1" />
                    {offer.price}
                </div>

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 capitalize">
                    {categoryName}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">
                    {offer.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                    {offer.description}
                </p>

                <div className="flex items-center mb-5">
                    <img
                        src={offer.avatar}
                        alt={offer.author}
                        className="w-8 h-8 rounded-full mr-2 object-cover border border-gray-200"
                    />
                    <span className="text-sm text-gray-700 font-medium">{offer.author}</span>
                </div>

                <button
                    onClick={() => onBuy(offer.id)}
                    disabled={isOwnOffer}
                    className={`
            w-full py-3 px-4 rounded-lg font-medium transition-colors
            ${isOwnOffer
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white active:bg-indigo-800'
                        }
          `}
                >
                    {isOwnOffer ? 'Это ваше предложение' : 'Приобрести'}
                </button>
            </div>
        </div>
    );
}

OfferCard.propTypes = {
    offer: PropTypes.shape({
        id: PropTypes.number.isRequired,
        userId: PropTypes.number.isRequired,
        author: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        createdAt: PropTypes.string,
    }).isRequired,
    onBuy: PropTypes.func.isRequired,
};