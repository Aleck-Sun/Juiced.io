import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/Home';
import InstructionPage from './components/InstructionPage/InstructionPage';
import CreateRoom from "./components/CreateRoom/CreateRoom";
import JoinRoom from "./components/JoinRoom/JoinRoom";
import Camera from './components/Camera/Camera';
import WaitRoom from "./components/WaitRoom/WaitRoom";
import Workouts from "./components/Workouts/Workouts";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/instructions" element={<InstructionPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/CreateRoom" element={<CreateRoom />} />
            <Route path="/JoinRoom" element={<JoinRoom />} />
            <Route path="/Test" element={<Camera />} />
            <Route path="/WaitRoom" element={<WaitRoom />} />
            <Route path="/Workouts" element={<Workouts />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
