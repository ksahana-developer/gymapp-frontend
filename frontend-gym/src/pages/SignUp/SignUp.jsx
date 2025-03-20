import { useNavigate } from "react-router-dom"
import signUp from "../../components/SignUp/SignUp"


const register = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/memberships')
        }
    }, [navigate])
    return(
        <div>
            <signUp />
        </div>
    )
}

export default register;