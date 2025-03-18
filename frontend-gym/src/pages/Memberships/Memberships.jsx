import { useEffect } from "react";
import MembershipBody from "../../components/MembershipBody/MembershipBody";
import { useNavigate } from "react-router-dom";
const Memberships = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate('/login')
        }
    }, [])
    return <div>
        <MembershipBody />
    </div>
}

export default Memberships;