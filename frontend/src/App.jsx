import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './views/Home';
import CreateOffer from './views/CreateOffer';
import Profile from './views/Profile';
import { offers as initialOffers } from './data/mockData';
import AuthModal from './components/AuthModal';
import { login, register } from './data/api';
import Toast from './components/Toast';


function App() {
  const [currentView, setCurrentView] = useState('home');
  const [toasts, setToasts] = useState([]);
  const [offers, setOffers] = useState(initialOffers);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [user, setUser] = useState(null); // null = неавторизован
  const [token, setToken] = useState('');

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = id => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handlePurchase = offer => {
    if (!user || user.balance < offer.price) {
      addToast('Недостаточно коинов или неавторизован!', 'error');
      return false;
    }
    // TODO: отправить транзакцию на backend
    setUser(u => ({ ...u, balance: u.balance - offer.price }));
    addToast(`Куплено: ${offer.title} за ${offer.price} коинов`, 'success');
    return true;
  };

  const handleCreateOffer = newOffer => {
    setOffers(prev => [...prev, newOffer]);
    addToast('Объявление успешно создано!', 'success');
    setCurrentView('home');
  };

  const handleDeleteOffer = offerId => {
    if (!window.confirm('Удалить это объявление?')) return;
    setOffers(prev => prev.filter(o => o.id !== offerId));
    addToast('Объявление удалено', 'success');
  };

  const myOffers = user ? offers.filter(o => o.userId === user.id) : [];

  const handleAuth = async ({ email, password, name }) => {
    if (authMode === 'login') {
      const res = await login(email, password);
      setToken(res.token);
      setUser(res.user);
      setAuthModalOpen(false);
      addToast('Успешный вход!', 'success');
    } else {
      const res = await register({ email, password, name });
      setToken(res.token);
      setUser(res.user);
      setAuthModalOpen(false);
      addToast('Регистрация успешна!', 'success');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        balance={user ? user.balance : 0}
        onLogin={() => { setAuthMode('login'); setAuthModalOpen(true); }}
        onRegister={() => { setAuthMode('register'); setAuthModalOpen(true); }}
        user={user}
        onLogout={() => { setUser(null); setToken(''); setCurrentView('home'); }}
      />

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'home' && (
          <Home
            offers={offers}
            setOffers={setOffers}
            onPurchase={handlePurchase}
            addToast={addToast}
          />
        )}

        {currentView === 'create' && (
          <CreateOffer
            onCreate={handleCreateOffer}
            onCancel={() => setCurrentView('home')}
          />
        )}

        {currentView === 'profile' && user && (
          <Profile
            currentUser={user}
            myOffers={myOffers}
            onDeleteOffer={handleDeleteOffer}
          />
        )}
      </main>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuth={handleAuth}
        mode={authMode}
      />

      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

export default App;