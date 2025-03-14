import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./actionsTool.css"

const ActionsTool = ({ id, handleEdit, handleDelete }) => {
    return (
        <ul className="dropdown-menu p-2 ">
            <li onClick={handleEdit} className="border-bottom border-light py-1 actionbtn"><FaRegEdit /> Edit</li>
            <li onClick={()=>{
                handleDelete(id)
            }} className="text-danger py-1 actionbtn"><RiDeleteBin6Line /> Delete</li>
        </ul>
    )
}

export default ActionsTool