import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './views/Home';
import CreateOffer from './views/CreateOffer';
import Profile from './views/Profile';
import { currentUser, offers as initialOffers } from './data/mockData';
import Toast from './components/Toast';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [toasts, setToasts] = useState([]);
  const [offers, setOffers] = useState(initialOffers);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = id => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handlePurchase = offer => {
    if (currentUser.balance < offer.price) {
      addToast('Недостаточно коинов!', 'error');
      return false;
    }

    currentUser.balance -= offer.price;
    addToast(`Куплено: ${offer.title} за ${offer.price} коинов`, 'success');
    return true;
  };

  const handleCreateOffer = newOffer => {
    setOffers(prev => [...prev, newOffer]);
    addToast('Объявление успешно создано!', 'success');
    setCurrentView('home');
  };

  const handleDeleteOffer = offerId => {
    if (!confirm('Удалить это объявление?')) return;
    setOffers(prev => prev.filter(o => o.id !== offerId));
    addToast('Объявление удалено', 'success');
  };

  const myOffers = offers.filter(o => o.userId === currentUser.id);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        balance={currentUser.balance}
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

        {currentView === 'profile' && (
          <Profile
            currentUser={currentUser}
            myOffers={myOffers}
            onDeleteOffer={handleDeleteOffer}
          />
        )}
      </main>

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