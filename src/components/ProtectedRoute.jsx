import React from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { userStore } from '../stores/userStore';

export const ProtectedRoute = observer(({ children }) => {

  if (userStore.isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
        <h2>🔄 Loading Application Data...</h2>
      </div>
    );
  }

  if (userStore.isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" replace />;
});
