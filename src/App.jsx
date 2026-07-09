import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthForm } from './components/AuthForm';       
import CreateSurvey from './pages/CreateSurvey';
import '@mantine/core/styles.css';

function App() {
  return (
    <>
      <MantineProvider defaultColorScheme="light">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<AuthForm />} />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateSurvey />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/create" replace />} />

          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </>
  )
}

export default App
