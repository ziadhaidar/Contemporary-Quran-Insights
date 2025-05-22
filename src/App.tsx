import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Reader } from './pages/Reader';
import { Topics } from './pages/Topics';
import { Search } from './pages/Search';

function App() {
  return (
    <Layout>
      <Routes>
        {/* Home page shows Reader by default */}
        <Route path="/" element={<Reader />} />

        {/* Explicit reader route with no params */}
        <Route path="/reader" element={<Reader />} />

        {/* Reader with surah and aya params */}
        <Route path="/reader/:surahId/:ayahId" element={<Reader />} />

        {/* Other pages */}
        <Route path="/topics" element={<Topics />} />
        <Route path="/search" element={<Search />} />

        {/* Fallback: redirect unknown paths back to Reader */}
        <Route path="*" element={<Reader />} />
      </Routes>
    </Layout>
  );
}

export default App;
