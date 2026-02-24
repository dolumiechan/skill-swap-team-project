import { useState, useEffect } from 'react'
import { createService, updateService, getCategories } from '../data/api'
import { Plus, X } from 'lucide-react'

export default function CreateOffer({ onCreate, onCancel, token, initialOffer, onUpdate }) {
    const isEdit = Boolean(initialOffer)
    const [title, setTitle] = useState(initialOffer?.title ?? '')
    const [description, setDescription] = useState(initialOffer?.description ?? '')
    const [categoryId, setCategoryId] = useState(initialOffer?.category_id ? String(initialOffer.category_id) : '')
    const [price, setPrice] = useState(initialOffer?.price ?? '')
    const [imageUrl, setImageUrl] = useState(initialOffer?.image ?? '')
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (initialOffer) {
            setTitle(initialOffer.title ?? '')
            setDescription(initialOffer.description ?? '')
            setCategoryId(initialOffer.category_id ? String(initialOffer.category_id) : '')
            setPrice(initialOffer.price ?? '')
            setImageUrl(initialOffer.image ?? '')
        }
    }, [initialOffer])

    useEffect(() => {
        getCategories()
            .then(data => {
                const list = Array.isArray(data) ? data : (data.data || [])
                setCategories(list)
                if (list.length > 0 && !categoryId && !isEdit) setCategoryId(String(list[0].id))
            })
            .catch(() => setCategories([]))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!title || !description || !price || isNaN(price) || Number(price) <= 0) {
            alert('Заполните все обязательные поля корректно')
            return
        }
        if (!categoryId) {
            alert('Выберите категорию')
            return
        }
        const payload = {
            title,
            description,
            category_id: Number(categoryId),
            price: Number(price),
        }
        if (imageUrl) payload.image = imageUrl
        setLoading(true)
        try {
            if (isEdit && initialOffer?.id) {
                const updated = await updateService(initialOffer.id, payload, token)
                onUpdate?.(updated)
            } else {
                const created = await createService(payload, token)
                onCreate(created)
            }
        } catch (e) {
            const msg = e && e.message ? e.message : 'Ошибка создания объявления'
            alert(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{isEdit ? 'Редактировать объявление' : 'Создать объявление'}</h2>
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
                            value={categoryId}
                            onChange={e => setCategoryId(e.target.value)}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white text-gray-900"
                        >
                            {categories.length === 0 && <option value="">Категория…</option>}
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
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
                        disabled={loading}
                        className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-xl hover:bg-indigo-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (isEdit ? 'Сохранение…' : 'Создание…') : (isEdit ? 'Сохранить' : 'Создать объявление')}
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