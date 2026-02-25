import { Coins, Plus, Zap } from 'lucide-react';
import PropTypes from 'prop-types';

export default function Navbar({ currentView, setCurrentView, balance }) {
    return (
        <nav className="bg-white shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div
                        className="flex items-center cursor-pointer"
                        onClick={() => setCurrentView('home')}
                    >
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2 rounded-lg mr-3">
                            <Zap className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-xl text-gray-900">SkillExchange</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex items-center bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200">
                            <Coins className="w-5 h-5 text-yellow-600 mr-2" />
                            <span className="font-semibold text-yellow-700">{balance}</span>
                            <span className="text-yellow-600 ml-1">коинов</span>
                        </div>

                        <button
                            onClick={() => setCurrentView('create')}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Создать</span>
                            <span className="sm:hidden">+</span>
                        </button>

                        <button
                            onClick={() => setCurrentView('profile')}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                        >
                            <img
                                src="http://static.photos/people/200x200/42"
                                alt="Profile"
                                className="w-7 h-7 rounded-full object-cover ring-2 ring-indigo-300/50"
                            />
                            <span className="hidden md:block font-medium">Профиль</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

Navbar.propTypes = {
    currentView: PropTypes.string.isRequired,
    setCurrentView: PropTypes.func.isRequired,
    balance: PropTypes.number.isRequired,
};