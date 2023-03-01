import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation'
import SideBar from './components/Sidebar'
import { Home, CreatePost } from './pages';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex">
        <SideBar />
        <main className="bg-gray-700">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
