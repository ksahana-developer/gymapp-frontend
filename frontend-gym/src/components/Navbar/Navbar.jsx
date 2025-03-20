import { Link, useNavigate } from 'react-router-dom';
import { CgGym } from 'react-icons/cg';
import { FaRegUserCircle } from 'react-icons/fa';
const Navbar = ({setIsLoggedIn}) => {
  const navigate = useNavigate()
  
  const logout = ()=>{
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    navigate("/login")
  }
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"> <CgGym size={40} color='black' /> Chetak Gym</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            <Link className="nav-link" to="/customers">Customers</Link>
            <Link className="nav-link" to="/subscriptions">Subscriptions</Link>
            <Link className="nav-link" to="/memberships">Memberships</Link>
          </div>
        </div>
      </div>
      <ul className="nav justify-content-end">
          <li className="nav-item">
            <button onClick={logout} className="btn btn-danger">Logout</button>
            <Link className="nav-link active" aria-current="page" to="/profile"><FaRegUserCircle size={30} color='grey' /></Link>
          </li>
        </ul>
    </nav>
  )
}

export default Navbar;