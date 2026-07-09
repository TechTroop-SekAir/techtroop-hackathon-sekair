import React from 'react';
import { observer } from 'mobx-react-lite';
import { userStore } from './stores/userStore';
import { AuthForm } from './components/AuthForm';
import './App.css'

const App = observer(() => {
  
  if (userStore.isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
        <h2>🔄 Loading Application Data...</h2>
      </div>
    );
  }

  if (userStore.isAuthenticated) {
    return (
      <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2>🎉 Welcome, {userStore.profile?.name || 'Student'}!</h2>
        <p><strong>Email:</strong> {userStore.user?.email}</p>
        <p><strong>Role:</strong> <span style={{ color: userStore.isAdmin ? 'red' : 'green', fontWeight: 'bold' }}>{userStore.profile?.role}</span></p>
        
        {userStore.isAdmin && (
          <div style={{ backgroundColor: '#ffebee', padding: '10px', borderRadius: '4px', margin: '15px 0' }}>
            🔒 <strong>Admin Panel:</strong> You have global moderation and deletion access!
          </div>
        )}

        <button 
          onClick={() => userStore.logout()} 
          style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}
        >
          Logout
        </button>
      </div>
    );
  }

  return <AuthForm />;
});

export default App
