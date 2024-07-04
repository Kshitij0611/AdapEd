import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Profile from './screens/Profile';
import Quiz from './screens/Quiz';
import ProtectedRoute from './utils/ProtectedRoute';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Navbar/><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile/:uid" element={<ProtectedRoute><Navbar/><Profile/></ProtectedRoute>} />
        <Route path="/quiz/:slug" element={<ProtectedRoute><Quiz/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
