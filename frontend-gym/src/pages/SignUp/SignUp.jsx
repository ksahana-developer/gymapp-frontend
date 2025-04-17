import { useNavigate } from "react-router-dom"
import SignUp from "../../components/SignUp/SignUp"
import { useEffect } from "react";


const Register = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/memberships')
        }
    }, [navigate])
    return(
        <div>
            <SignUp />
        </div>
    )
}

export default Register;