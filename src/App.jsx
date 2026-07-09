import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import CreateSurvey from './pages/CreateSurvey';
import '@mantine/core/styles.css';

function App() {
  return (
    <>
      <MantineProvider defaultColorScheme="light">
        <BrowserRouter>
          <Routes>
            <Route path="/create" element={<CreateSurvey />} />

            <Route path="/" element={<Navigate to="/create" replace />} />
            
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </>
  )
}

export default App
