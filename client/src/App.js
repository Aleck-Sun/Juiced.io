import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage/Home';
import InstructionPage from './Components/InstructionPage/InstructionPage';
import WelcomePage from './Components/WelcomePage/WelcomePage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/instructions" element={<InstructionPage />} />
            <Route path="/home" element={<HomePage/>} />
            <Route path="/" element={<WelcomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
