import { useState } from 'react'
import { Plus, X } from 'lucide-react'

export default function CreateOffer({ onCreate, onCancel }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('education')
    const [price, setPrice] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!title || !description || !price || isNaN(price) || Number(price) <= 0) {
            alert('Заполните все обязательные поля корректно')
            return
        }

        const newOffer = {
            id: Date.now(),
            userId: 1,
            author: "Александр Петров",
            avatar: "http://static.photos/people/200x200/42",
            title,
            description,
            category,
            price: Number(price),
            image: imageUrl || 'https://via.placeholder.com/640x360?text=Обложка',
            createdAt: new Date().toISOString().split('T')[0]
        }

        onCreate(newOffer)
    }

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Создать объявление</h2>
                <button
                    onClick={onCancel}
                    className="text-gray-500 hover:text-gray-700"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Название урока *
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 placeholder:text-gray-400"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Описание *
                    </label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 placeholder:text-gray-400 resize-y"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Категория *
                        </label>
                        <select
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-gray-900"
                        >
                            <option value="education">Образование</option>
                            <option value="music">Музыка</option>
                            <option value="art">Искусство</option>
                            <option value="tech">Технологии</option>
                            <option value="sport">Спорт</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Цена (коины) *
                        </label>
                        <input
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            min="1"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 placeholder:text-gray-400"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ссылка на изображение (опционально)
                    </label>
                    <input
                        type="url"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 placeholder:text-gray-400"
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-xl hover:bg-indigo-700 transition font-medium"
                    >
                        Создать объявление
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-50 transition font-medium"
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </div>
    )
}