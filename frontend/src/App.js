import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Architecture from './pages/Architecture/Architecture';
import Team from './pages/Team/Team'; 



const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/team" element={<Team />} />
        </Routes>


      </div>
    </BrowserRouter>
  )
}

export default App
