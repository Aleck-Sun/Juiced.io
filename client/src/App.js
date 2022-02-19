import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage/Home';
import InstructionPage from './Components/InstructionPage/InstructionPage';
import WelcomePage from './Components/WelcomePage/WelcomePage';
import CreateRoom from "./Components/CreateRoom/CreateRoom";
import JoinRoom from "./Components/JoinRoom/JoinRoom";
import Camera from './Components/Camera/Camera';

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
            <Route path="/Test" element={<Camera />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
