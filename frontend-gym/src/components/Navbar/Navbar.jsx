import { Link, useNavigate } from "react-router-dom";
import { CgGym } from "react-icons/cg";
import { FaRegUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import "./navbar.css";

const Navbar = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);
    const profileButtonRef = useRef(null);

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && 
                !profileMenuRef.current.contains(event.target) &&
                !profileButtonRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const customer = JSON.parse(localStorage.getItem("customer"));

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <CgGym size={40} color="black" /> Chetak Gym
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link" aria-current="page" to="/">
                            Home
                        </Link>
                        <Link className="nav-link" to="/customers">
                            Customers
                        </Link>
                        <Link className="nav-link" to="/subscriptions">
                            Subscriptions
                        </Link>
                        <Link className="nav-link" to="/memberships">
                            Memberships
                        </Link>
                    </div>
                </div>

                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <div className="profile-menu-container">
                            <button 
                                ref={profileButtonRef}
                                className="profile-button"
                                onClick={toggleProfileMenu}
                                aria-expanded={isProfileMenuOpen}
                            >
                                {customer?.profilePicture ? (
                                    <img
                                        src={customer.profilePicture}
                                        alt="Profile"
                                        className="rounded-circle"
                                        style={{ width: "40px", height: "40px" }}
                                    />
                                ) : (
                                    <div className="profile-icon">
                                        <FaRegUserCircle size={24} />
                                    </div>
                                )}
                            </button>

                            {isProfileMenuOpen && (
                                <div 
                                    ref={profileMenuRef} 
                                    className="profile-menu animate__animated animate__fadeIn"
                                >
                                    <Link 
                                        to={`/customer/${customer?.id}`}
                                        className="profile-menu-item"
                                        onClick={() => setIsProfileMenuOpen(false)}
                                    >
                                        <FaRegUserCircle className="menu-icon" />
                                        <span>View Profile</span>
                                    </Link>
                                    <button 
                                        className="profile-menu-item logout-btn"
                                        onClick={logout}
                                    >
                                        <FaSignOutAlt className="menu-icon" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
