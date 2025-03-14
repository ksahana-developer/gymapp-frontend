import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home/Home';
import Customers from './pages/Customers/Customers';
import Subscriptions from './pages/Subscriptions/Subscriptions';
import Memberships from './pages/Memberships/Memberships';
import Profile from './pages/Profile/Profile';

function App() {
  return (<Router >
    <div>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/memberships" element={<Memberships />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </div>
      </Router >
  );
}

export default App;
