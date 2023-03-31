import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation'
import SideBar from './components/Sidebar'
import { Home, CreatePost, Contact, About } from './pages';
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
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
