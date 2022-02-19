import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/Home';
import InstructionPage from './components/InstructionPage/InstructionPage'

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/instructions" element={<InstructionPage />} />
            <Route path="/" element={<HomePage/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
