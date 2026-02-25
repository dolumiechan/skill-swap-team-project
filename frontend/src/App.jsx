import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import CreateOffer from './views/CreateOffer';
import Profile from './views/Profile';
import { offers as initialOffers } from './data/mockData';
import AuthModal from './components/AuthModal';
import { login, register, createTransaction } from './data/api';
import Toast from './components/Toast';

function App() {
  const navigate = useNavigate();
  const [toasts, setToasts] = useState([]);
  const [offers, setOffers] = useState(initialOffers);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [createOfferModalOpen, setCreateOfferModalOpen] = useState(false);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = id => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handlePurchase = async (offer) => {
    if (!user) {
      addToast('Войдите, чтобы купить', 'error');
      return false;
    }
    if (user.balance < offer.price) {
      addToast('Недостаточно коинов!', 'error');
      return false;
    }
    try {
      const data = await createTransaction({ service_id: offer.id }, token);
      setUser(u => ({ ...u, balance: data.new_balance }));
      addToast(`Куплено: ${offer.title} за ${offer.price} коинов`, 'success');
      return true;
    } catch (e) {
      addToast(e?.message || 'Ошибка покупки', 'error');
      return false;
    }
  };

  const handleCreateOffer = newOffer => {
    setOffers(prev => [...prev, newOffer]);
    addToast('Объявление успешно создано!', 'success');
    setCreateOfferModalOpen(false);
    navigate('/');
  };

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

  const handleStartTeach = () => {
    if (!user) {
      setAuthMode('login');
      setAuthModalOpen(true);
    } else {
      setCreateOfferModalOpen(true);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken('');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        balance={user ? user.balance : 0}
        onLogin={() => { setAuthMode('login'); setAuthModalOpen(true); }}
        onRegister={() => { setAuthMode('register'); setAuthModalOpen(true); }}
        user={user}
        onLogout={handleLogout}
      />

      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                offers={offers}
                setOffers={setOffers}
                onPurchase={handlePurchase}
                addToast={addToast}
                onStartTeach={handleStartTeach}
                currentUser={user}
              />
            }
          />
          <Route
            path="/create"
            element={
              <CreateOffer
                onCreate={handleCreateOffer}
                onCancel={() => navigate('/')}
                token={token}
              />
            }
          />
          <Route
            path="/profile"
            element={user ? <Profile currentUser={user} token={token} addToast={addToast} /> : <Navigate to="/" replace />}
          />
        </Routes>

        {createOfferModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-2xl mx-auto">
              <CreateOffer
                onCreate={handleCreateOffer}
                onCancel={() => setCreateOfferModalOpen(false)}
                token={token}
              />
            </div>
          </div>
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
