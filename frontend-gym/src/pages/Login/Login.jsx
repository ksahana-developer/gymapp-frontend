import { useEffect, useState } from "react";
import "./login.css"
import { useNavigate } from "react-router-dom"

const Login = ({setIsLoggedIn}) => {
    const navigate = useNavigate()
    const [cred, setCred] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target
        setCred({ ...cred, [name]: value })
    }

    const login = async (e) => {
        try {
            e.preventDefault()
            const response = await fetch("http://localhost:5000/api/customers/login/admin", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cred)
            })
            console.log(response)
            const data = await response.json()
            console.log(data)
            localStorage.setItem("token", data.token)
            localStorage.setItem("customer", JSON.stringify(data?.userRecord?.Item))
            if (response.status == 200) {
                navigate("/memberships")
                setIsLoggedIn(true)
            }
        } catch (error) {
            navigate("/login")
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate("/memberships")
        }
    }, [navigate])

    return (
        <div className="login-container min-vh-100 d-flex align-items-center justify-content-center">
            <div className="card shadow-lg animate__animated animate__fadeIn">
                <div className="card-body p-4">
                    <div className="text-center mb-4 animate__animated animate__fadeInDown">
                        <div className="gym-logo mb-3">
                            <i className="bi bi-lightning-charge-fill"></i>
                        </div>
                        <h2 className="fw-bold text-primary">CHETAK GYM</h2>
                        <p className="text-muted">Welcome back! Please login to your account.</p>
                    </div>
                    <form className="needs-validation animate__animated animate__fadeInUp">
                        <div className="mb-4">
                            <label htmlFor="exampleInputEmail1" className="form-label fw-semibold">Email address</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-envelope"></i>
                                </span>
                                <input 
                                    onChange={handleChange} 
                                    name="email" 
                                    type="email" 
                                    className="form-control" 
                                    id="exampleInputEmail1" 
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="exampleInputPassword1" className="form-label fw-semibold">Password</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-lock"></i>
                                </span>
                                <input 
                                    onChange={handleChange} 
                                    name="password" 
                                    type="password" 
                                    className="form-control" 
                                    id="exampleInputPassword1" 
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                        </div>
                        <button 
                            onClick={login} 
                            className="btn btn-primary w-100 mb-3 py-2 fw-semibold"
                            type="submit"
                        >
                            Login
                        </button>
                        <div className="text-center">
                            <small className="text-muted">
                                Don't have an account? <a href="/signup" className="text-primary text-decoration-none">Sign Up</a>
                            </small>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;