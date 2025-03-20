import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Customers from './pages/Customers/Customers';
import Subscriptions from './pages/Subscriptions/Subscriptions';
import Memberships from './pages/Memberships/Memberships';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import { useEffect, useState } from 'react';
import SignUp from './components/SignUp/SignUp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(()=>{
    setIsLoggedIn(!!localStorage.getItem('token'))
  },[])
  return (<Router >
    <div>
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        {<Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />}
        <Route path="/" element={<Home />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/memberships" element={<Memberships />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element= {<SignUp />} />
      </Routes>
    </div>
  </Router >
  );
}

export default App;
