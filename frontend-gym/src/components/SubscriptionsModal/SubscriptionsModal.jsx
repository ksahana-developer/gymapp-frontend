import { IoMdClose } from "react-icons/io";
import "./subscriptionsModal.css"

const SubscriptionsModal = ({ closeModal, subscriptions, createSubscription, updateSubscription, subscription, setSubscription, isUpdate }) => {

    const handleChange = (e) => {
        const { name, value } = e.target
        setSubscription({ ...subscription, [name]: value })
    }

    const handleClick = () => {
        if(isUpdate){
            if ((subscription.name && subscription.validity && subscription.amount && subscription.isActive) && (subscription.name != "" && subscription.isActive != "" && subscription.validity != "" && subscription.amount != "")) {
                // api call for creating customerSubscription
                // should wait for creation, bcoz other fields like expiryStatus needs to be updated (comes from backend)
                updateSubscription(subscription)
                console.log('subscription updated successfully')
                closeModal()
            }
            else {
                alert("Please fill all the necessary fields") // have to show alert component instead of alert (violation :- onClick event delayed bcoz of this alert)
            }
        }
        else{
            if ((subscription.name && subscription.validity && subscription.amount && subscription.isActive) && (subscription.name != "" && subscription.isActive != "" && subscription.validity != "" && subscription.amount != "")) {
                // api call for creating customerSubscription
                // should wait for creation, bcoz other fields like expiryStatus needs to be updated (comes from backend)
                createSubscription(subscription)
                console.log('subscription created successfully')
                closeModal()
            }
            else {
                alert("Please fill all the necessary fields") // have to show alert component instead of alert (violation :- onClick event delayed bcoz of this alert)
            }
        }
        
    }

    return (
        <div className="centered-content d-flex flex-column">
            <div className="d-flex">
                <div className="d-flex flex-column">
                    <h5>{isUpdate ? "Update Subscription": "Add New Subscription"}</h5>
                    <span className="text-secondary" >Enter the details for the new subscription.</span>
                </div>
                <IoMdClose onClick={closeModal} />
            </div>

            <div className="mb-3 mt-2">
                <label htmlFor="subsName" className="form-label">Name</label>
                <input value={subscription?.name} name="name" onChange={handleChange} type="text" className="form-control" id="subsName" aria-describedby="emailHelp" />
            </div>

            <div className="mb-3 mt-2">
                <label htmlFor="subsAmount" className="form-label">Price</label>
                <input value={subscription?.amount} name="amount" onChange={handleChange} type="text" className="form-control" id="subsAmount" aria-describedby="emailHelp" />
            </div>

            <div className="mb-3 mt-2">
                <label htmlFor="subsAmount" className="form-label">Validity (in months) </label>
                <input value={subscription?.validity} name="validity" onChange={handleChange} type="text" className="form-control" id="subsAmount" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="subsStatus" className="form-label">Status</label>
                <select value={subscription?.isActive} name="isActive" onChange={handleChange} id="subsStatus"
                    // onChange={choosePlan} 
                    // value={membership.subscriptionId} 
                    className="form-select">
                    <option value="">Select a subscription</option>
                    <option value={true} >active</option>
                    <option value={false} >inactive</option>

                </select>
            </div>

            <div className="d-flex justify-content-end">
                <button
                    onClick={handleClick}
                    className="btn btn-secondary">{isUpdate ? "Update Subscription" : "Add Subscription"} </button>
            </div>
        </div>)
}

export default SubscriptionsModal;