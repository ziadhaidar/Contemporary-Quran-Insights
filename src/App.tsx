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
        <Route path="/" element={<Reader />} />
        <Route path="/reader/:surahId?/:ayahId?" element={<Reader />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Layout>
  );
}

export default App;