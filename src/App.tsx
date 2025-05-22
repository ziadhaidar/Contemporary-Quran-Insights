import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Reader } from './pages/Reader';
import { Topics } from './pages/Topics';
import { Search } from './pages/Search';

function App() {
  return (
    <Layout>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Reader */}
        <Route path="/reader" element={<Reader />} />
        <Route path="/reader/:surahId/:ayahId" element={<Reader />} />

        {/* Other pages */}
        <Route path="/topics" element={<Topics />} />
        <Route path="/search" element={<Search />} />

        {/* Fallback to Home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;
