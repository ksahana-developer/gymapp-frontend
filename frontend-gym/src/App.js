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

function App() {
  return (<Router >
    <div>
      {localStorage.getItem('token') && <Navbar />}
      <Routes>
        {<Route path="/login" element={<Login />} />}
        <Route path="/" element={<Home />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/memberships" element={<Memberships />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  </Router >
  );
}

export default App;
