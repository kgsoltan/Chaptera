import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ReadBook from './pages/ReadBook';
import LoginPage from './pages/LoginPage';
import EditBook from './pages/EditBook';

function App() {
  return (
    
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile/:authorId" element={<Profile />} />
          <Route path="/book/:bookId" element={<ReadBook />} />
          {/* <Route path="/book/:bookId/editor" element={<EditBook />} /> */}
          <Route path="editBook" element={<EditBook />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;