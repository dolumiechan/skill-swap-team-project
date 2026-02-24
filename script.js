// Initialize Lucide icons
lucide.createIcons();

// Data & State
let currentUser = {
    id: 1,
    name: "Александр Петров",
    balance: 1000,
    avatar: "http://static.photos/people/200x200/42"
};

let offers = [
    {
        id: 1,
        userId: 2,
        author: "Мария Иванова",
        avatar: "http://static.photos/people/200x200/1",
        title: "Научу играть на гитаре",
        description: "Базовые аккорды, переборы, простые песни. 5 занятий по часу каждое. Для начинающих.",
        category: "music",
        price: 150,
        image: "http://static.photos/music/640x360/1",
        createdAt: "2023-10-15"
    },
    {
        id: 2,
        userId: 3,
        author: "Дмитрий Соколов",
        avatar: "http://static.photos/people/200x200/2",
        title: "Объясню производные и интегралы",
        description: "Математический анализ для школьников и студентов. Помогу разобраться с производными, интегралами, пределами.",
        category: "education",
        price: 200,
        image: "http://static.photos/education/640x360/1",
        createdAt: "2023-10-14"
    },
    {
        id: 3,
        userId: 4,
        author: "Анна Кузнецова",
        avatar: "http://static.photos/people/200x200/3",
        title: "Уроки рисования акварелью",
        description: "Научу основам акварельной живописи. Материалы не нужны - всё предоставлю.",
        category: "art",
        price: 180,
        image: "http://static.photos/art/640x360/1",
        createdAt: "2023-10-13"
    },
    {
        id: 4,
        userId: 5,
        author: "Сергей Волков",
        avatar: "http://static.photos/people/200x200/4",
        title: "Программирование на Python",
        description: "Базовый курс Python. Переменные, циклы, функции, работа с файлами. 3 занятия.",
        category: "tech",
        price: 250,
        image: "http://static.photos/technology/640x360/1",
        createdAt: "2023-10-12"
    },
    {
        id: 5,
        userId: 6,
        author: "Елена Попова",
        avatar: "http://static.photos/people/200x200/5",
        title: "Йога для начинающих",
        description: "Асаны, дыхательные практики, расслабление. Онлайн или офлайн в парке.",
        category: "sport",
        price: 120,
        image: "http://static.photos/wellness/640x360/1",
        createdAt: "2023-10-11"
    },
    {
        id: 6,
        userId: 1,
        author: "Александр Петров",
        avatar: "http://static.photos/people/200x200/42",
        title: "Фотография для начинающих",
        description: "Композиция, свет, настройки камеры. Помогу разобраться с ручным режимом.",
        category: "art",
        price: 160,
        image: "http://static.photos/camera/640x360/1",
        createdAt: "2023-10-10"
    }
];

let transactions = [
    { id: 1, type: 'purchase', offerTitle: "Английский разговорный", amount: 200, date: "2023-10-14", with: "Иван Сидоров" },
    { id: 2, type: 'sale', offerTitle: "Фотография для начинающих", amount: 160, date: "2023-10-12", with: "Ольга Смирнова" },
    { id: 3, type: 'purchase', offerTitle: "Готовка итальянской пасты", amount: 130, date: "2023-10-08", with: "Павел Морозов" }
];

let currentCategory = 'all';
let selectedOffer = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderOffers();
    renderMyOffers();
    renderTransactions();
    updateBalance();
});

// Navigation
function showView(viewName) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewName + 'View').classList.add('active');
    window.scrollTo(0, 0);

    if (viewName === 'profile') {
        renderMyOffers();
        renderTransactions();
    }
}

// Category Filter
function setCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('.category-btn').forEach(btn => {
        if (btn.dataset.category === cat) {
            btn.classList.remove('bg-white', 'text-gray-600', 'border', 'border-gray-300');
            btn.classList.add('bg-indigo-600', 'text-white');
        } else {
            btn.classList.add('bg-white', 'text-gray-600', 'border', 'border-gray-300');
            btn.classList.remove('bg-indigo-600', 'text-white');
        }
    });
    filterOffers();
}

// Search & Filter Logic
function filterOffers() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = offers.filter(offer => {
        const matchesSearch = offer.title.toLowerCase().includes(searchTerm) ||
            offer.description.toLowerCase().includes(searchTerm);
        const matchesCategory = currentCategory === 'all' || offer.category === currentCategory;
        return matchesSearch && matchesCategory;
    });
    renderOffers(filtered);
}

// Render Offers Grid
function renderOffers(offersToRender = offers) {
    const grid = document.getElementById('offersGrid');
    const emptyState = document.getElementById('emptyState');

    if (offersToRender.length === 0) {
        grid.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    grid.innerHTML = offersToRender.map(offer => `
        <div class="bg-white rounded-xl shadow-md overflow-hidden card-hover flex flex-col h-full">
            <div class="relative h-48 overflow-hidden">
                <img src="${offer.image}" alt="${offer.title}" class="w-full h-full object-cover">
                <div class="absolute top-4 right-4 coin-gradient text-white px-3 py-1 rounded-full font-bold flex items-center shadow-lg">
                    <i data-lucide="coins" class="w-4 h-4 mr-1"></i>
                    ${offer.price}
                </div>
                <div class="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-gray-700 capitalize">
                    ${getCategoryName(offer.category)}
                </div>
            </div>
            <div class="p-5 flex-1 flex flex-col">
                <h3 class="text-xl font-bold mb-2 text-gray-900 line-clamp-2">${offer.title}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">${offer.description}</p>
                
                <div class="flex items-center mb-4">
                    <img src="${offer.avatar}" alt="${offer.author}" class="w-8 h-8 rounded-full mr-2 object-cover">
                    <span class="text-sm text-gray-700">${offer.author}</span>
                </div>
                
                <button onclick="openPurchaseModal(${offer.id})" 
                        class="w-full ${offer.userId === currentUser.id ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} text-white py-2 rounded-lg font-medium transition flex items-center justify-center"
                        ${offer.userId === currentUser.id ? 'disabled' : ''}>
                    ${offer.userId === currentUser.id ? 'Это ваше предложение' : 'Приобрести'}
                </button>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
}

function getCategoryName(cat) {
    const names = {
        education: 'Образование',
        music: 'Музыка',
        art: 'Искусство',
        tech: 'Технологии',
        sport: 'Спорт',
        other: 'Другое'
    };
    return names[cat] || cat;
}

// Create Offer
function createOffer(e) {
    e.preventDefault();

    const title = document.getElementById('offerTitle').value;
    const category = document.getElementById('offerCategory').value;
    const description = document.getElementById('offerDescription').value;
    const price = parseInt(document.getElementById('offerPrice').value);
    let image = document.getElementById('offerImage').value;

    if (!image) {
        image = `http://static.photos/${category}/640x360/${Math.floor(Math.random() * 100)}`;
    }

    const newOffer = {
        id: offers.length + 1,
        userId: currentUser.id,
        author: currentUser.name,
        avatar: currentUser.avatar,
        title,
        description,
        category,
        price,
        image,
        createdAt: new Date().toISOString().split('T')[0]
    };

    offers.unshift(newOffer);

    showToast('Предложение успешно создано!');
    document.getElementById('createOfferForm').reset();
    showView('home');
    renderOffers();

    // Update stats
    document.getElementById('statOffers').textContent = offers.filter(o => o.userId === currentUser.id).length;
}

// Purchase Modal
function openPurchaseModal(offerId) {
    selectedOffer = offers.find(o => o.id === offerId);
    if (!selectedOffer) return;

    document.getElementById('modalOfferTitle').textContent = selectedOffer.title;
    document.getElementById('modalOfferAuthor').textContent = selectedOffer.author;
    document.getElementById('modalOfferPrice').textContent = selectedOffer.price;

    const afterBalance = currentUser.balance - selectedOffer.price;
    document.getElementById('modalBalanceAfter').textContent = afterBalance;
    document.getElementById('modalBalanceAfter').className = afterBalance >= 0 ? 'font-medium text-green-600' : 'font-medium text-red-600';

    document.getElementById('purchaseModal').classList.add('active');
    lucide.createIcons();
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    selectedOffer = null;
}

function confirmPurchase() {
    if (!selectedOffer) return;

    if (currentUser.balance < selectedOffer.price) {
        showToast('Недостаточно коинов!', 'error');
        closeModal('purchaseModal');
        return;
    }

    // Process transaction
    currentUser.balance -= selectedOffer.price;

    transactions.unshift({
        id: transactions.length + 1,
        type: 'purchase',
        offerTitle: selectedOffer.title,
        amount: selectedOffer.price,
        date: new Date().toISOString().split('T')[0],
        with: selectedOffer.author
    });

    updateBalance();
    renderTransactions();
    showToast(`Вы приобрели: ${selectedOffer.title}`);
    closeModal('purchaseModal');

    // Increment stat
    const currentStat = parseInt(document.getElementById('statTransactions').textContent);
    document.getElementById('statTransactions').textContent = currentStat + 1;
}

// Profile Tabs
function switchProfileTab(tab) {
    document.querySelectorAll('.profile-tab-content').forEach(c => c.classList.add('hidden'));
    document.getElementById('profile' + tab.charAt(0).toUpperCase() + tab.slice(1)).classList.remove('hidden');

    // Update tab styles
    document.getElementById('tabMyOffers').className = tab === 'myOffers' ?
        'flex-1 py-4 px-6 text-center font-medium text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 transition' :
        'flex-1 py-4 px-6 text-center font-medium text-gray-500 hover:text-gray-700 transition';
    document.getElementById('tabTransactions').className = tab === 'transactions' ?
        'flex-1 py-4 px-6 text-center font-medium text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50 transition' :
        'flex-1 py-4 px-6 text-center font-medium text-gray-500 hover:text-gray-700 transition';
}

function renderMyOffers() {
    const myOffers = offers.filter(o => o.userId === currentUser.id);
    const container = document.getElementById('myOffersList');

    if (myOffers.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">У вас пока нет предложений</p>';
        return;
    }

    container.innerHTML = myOffers.map(offer => `
        <div class="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
            <img src="${offer.image}" class="w-16 h-16 rounded-lg object-cover mr-4">
            <div class="flex-1">
                <h4 class="font-semibold text-gray-900">${offer.title}</h4>
                <p class="text-sm text-gray-500">${getCategoryName(offer.category)} • ${offer.price} коинов</p>
            </div>
            <button onclick="deleteOffer(${offer.id})" class="text-red-500 hover:text-red-700 p-2">
                <i data-lucide="trash-2" class="w-5 h-5"></i>
            </button>
        </div>
    `).join('');

    lucide.createIcons();
    document.getElementById('statOffers').textContent = myOffers.length;
}

function deleteOffer(offerId) {
    if (!confirm('Удалить это предложение?')) return;
    offers = offers.filter(o => o.id !== offerId);
    renderMyOffers();
    renderOffers();
    showToast('Предложение удалено');
}

function renderTransactions() {
    const container = document.getElementById('transactionsList');

    if (transactions.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center py-8">Нет транзакций</p>';
        return;
    }

    container.innerHTML = transactions.map(t => `
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div class="flex items-center">
                <div class="w-10 h-10 rounded-full ${t.type === 'purchase' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'} flex items-center justify-center mr-3">
                    <i data-lucide="${t.type === 'purchase' ? 'arrow-up-right' : 'arrow-down-left'}" class="w-5 h-5"></i>
                </div>
                <div>
                    <p class="font-medium text-gray-900">${t.type === 'purchase' ? 'Покупка' : 'Продажа'}: ${t.offerTitle}</p>
                    <p class="text-sm text-gray-500">${t.date} • ${t.with}</p>
                </div>
            </div>
            <span class="font-bold ${t.type === 'purchase' ? 'text-red-600' : 'text-green-600'}">
                ${t.type === 'purchase' ? '-' : '+'}${t.amount}
            </span>
        </div>
    `).join('');

    lucide.createIcons();
}

function updateBalance() {
    document.getElementById('userBalance').textContent = currentUser.balance;
    document.getElementById('profileBalance').textContent = currentUser.balance;
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 flex items-center z-50 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`;
    toastMessage.textContent = message;

    toast.classList.remove('translate-y-20');

    setTimeout(() => {
        toast.classList.add('translate-y-20');
    }, 3000);
}

// Close modal on outside click
document.getElementById('purchaseModal').addEventListener('click', (e) => {
    if (e.target.id === 'purchaseModal') closeModal('purchaseModal');
});