import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/Home';
import InstructionPage from './components/InstructionPage/InstructionPage';
import WelcomePage from './components/WelcomePage/WelcomePage';
import CreateRoom from "./components/CreateRoom/CreateRoom";
import JoinRoom from "./components/JoinRoom/JoinRoom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/instructions" element={<InstructionPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<WelcomePage />} />
            <Route path="/CreateRoom" element={<CreateRoom />} />
            <Route path="/JoinRoom" element={<JoinRoom />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
