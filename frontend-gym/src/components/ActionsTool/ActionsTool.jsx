import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./actionsTool.css"

const ActionsTool = ({ id, deleteMembership }) => {
    
    const handleDelete = ()=>{
        deleteMembership(id)
    }
    // There is no updateCustomerSubscription func implemented in the backend
    return (
        <div className="d-flex align-items-center">
            {/* <FaRegEdit size="20" className="defBtns" /> */} 
            <RiDeleteBin6Line onClick={handleDelete} className="text-danger defBtns" size="20" />
        </div>
    )
}

export default ActionsTool