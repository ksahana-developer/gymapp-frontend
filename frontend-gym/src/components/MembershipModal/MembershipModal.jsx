import "./membershipmodal.css"
import { IoMdClose } from "react-icons/io";

const MembershipModal = ({ closeModal, customers, subscriptions, setMembership }) => {
    // centered-content is className for centering the content (like a modal)

    //should write the logic to get the values from the form and set it 
    // to membership obj, using setMembership prop
    return (
        <div className="centered-content d-flex flex-column">
            <div className="d-flex">
                <div className="d-flex flex-column">
                    <h5>Add New Membership</h5>
                    <span className="text-secondary" >Enter the details for the new membership.</span>
                </div>
                <IoMdClose onClick={closeModal} />
            </div>

            <div className="mb-3 mt-2">
                <label htmlFor="custList" className="form-label">Customer</label>
                <select id="custList" className="form-select">
                    <option value="" selected>Select a customer</option>
                    {
                        customers.map((customer, index) => {
                            return <option key={customer.id} value={customer.id}>{customer.name} </option>
                        })
                    }
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="subsList" className="form-label">Membership Type</label>
                <select id="subsList" className="form-select">
                    <option value="" selected>Select a subscription</option>
                    {
                        subscriptions.map((subs, ind) => {
                            return <option key={subs.id} value={subs.id}>{subs.name}-{subs.validity} </option>
                        })
                    }
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="startDateId" className="form-label">Start Date</label>
                <input id="startDateId" className="form-control" type="datetime-local" />
            </div>
            <div className="d-flex justify-content-end">
                <button onClick={closeModal} className="btn btn-secondary">Add Membership</button>
            </div>
        </div>
    )
}

export default MembershipModal;