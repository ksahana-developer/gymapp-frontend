
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const ActionsSubscriptions = ({ setSubscription, subscriptions, id, deleteSubscription, updateSubscription, subscription, setIsDisplay, setIsUpdate }) => {
    const handleDelete = () => {
        deleteSubscription(id)
    }

    const handleUpdate = () => {
        setIsDisplay(true)
        setIsUpdate(true)
        // updateSubscription(id, subscription)
        const subs = subscriptions.filter(subs => subs.id == id)
        console.log(subs)
        setSubscription(subs[0])
    }

    return (
        <div className="d-flex align-items-center">
            <FaRegEdit onClick={handleUpdate} size="20" className="defBtns" />
            <RiDeleteBin6Line onClick={handleDelete} className="text-danger defBtns" size="20" />
        </div>
    )
}

export default ActionsSubscriptions;