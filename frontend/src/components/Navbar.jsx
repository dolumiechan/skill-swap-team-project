import { Coins, Plus, Zap } from 'lucide-react';
import PropTypes from 'prop-types';

export default function Navbar({ currentView, setCurrentView, balance, onLogin, onRegister, user }) {
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

                        {user ? (
                            <>
                                <button
                                    onClick={() => setCurrentView('profile')}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                                >
                                    <img
                                        src={user.avatar || 'https://via.placeholder.com/40'}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full object-cover border-2 border-indigo-200"
                                    />
                                    <span className="hidden md:inline font-semibold">{user.name}</span>
                                </button>
                                <button
                                    onClick={() => setCurrentView('home') || window.location.reload()}
                                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
                                    style={{ marginLeft: 8 }}
                                >
                                    Выйти
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={onLogin}
                                    className="bg-white border border-indigo-600 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-50 transition font-medium"
                                >
                                    Вход
                                </button>
                                <button
                                    onClick={onRegister}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
                                >
                                    Регистрация
                                </button>
                            </>
                        )}
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