import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/Home';
import InstructionPage from './components/InstructionPage/InstructionPage';
import CreateRoom from "./components/CreateRoom/CreateRoom";
import JoinRoom from "./components/JoinRoom/JoinRoom";
import WaitRoom from "./components/WaitRoom/WaitRoom";
import WinnersPage from './components/WinnersPage/WinnersPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/instructions" element={<InstructionPage />} />
            <Route path="/createRoom" element={<CreateRoom />} />
            <Route path="/joinRoom" element={<JoinRoom />} />
            <Route path="/room" element={<WaitRoom />} />
            <Route path="/winners" element={<WinnersPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
