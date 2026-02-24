import { useState } from 'react'

export default function AuthModal({ isOpen, onClose, onAuth, mode = 'login' }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const isRegister = mode === 'register'

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            await onAuth({ email, password, name })
        } catch (err) {
            setError(err.message || 'Ошибка')
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in">
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                    onClick={onClose}
                    aria-label="Закрыть"
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">
                    {isRegister ? 'Регистрация' : 'Вход'}
                </h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {isRegister && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 placeholder:text-gray-400"
                                required
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 placeholder:text-gray-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 placeholder:text-gray-400"
                            required
                        />
                    </div>
                    {error && <div className="text-red-600 text-sm text-center">{error}</div>}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl hover:bg-indigo-700 transition font-medium mt-2"
                        disabled={loading}
                    >
                        {loading ? 'Загрузка...' : isRegister ? 'Зарегистрироваться' : 'Войти'}
                    </button>
                </form>
            </div>
        </div>
    )
}
