import { useEffect, useState } from "react";
import "./login.css"
import { useNavigate } from "react-router-dom"

const Login = () => {
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
            if (response.status == 200) {
                navigate("/memberships")
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
        <div className="centered-content">
            {/* <div className="container"> */}
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onChange={handleChange} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={handleChange} name="password" type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button onClick={login} className="btn btn-primary">Submit</button>
            </form>
            {/* </div> */}
        </div>

    )
}

export default Login;