import "./membershipmodal.css"
import { IoMdClose } from "react-icons/io";

const MembershipModal = ({ createMembership, closeModal, customers, subscriptions, setMembership, membership, memberships }) => {
    // centered-content is className for centering the content (like a modal)

    const handleSave = () => {
        if ((membership.customerId && membership.type && membership.subscriptionId && membership.name) && (membership.customerId != "" && membership.subscriptionId != "" && membership.name != "" && membership.type != "")) {
            createMembership(membership)
            console.log('membership created successfully')
        }
        else {
            alert("Please fill all the necessary fields") // have to show alert component instead of alert (violation :- onClick event delayed bcoz of this alert)
        }
    }

    const chooseCustomer = (e) => {
        console.log(e.target.value, 'customer')
        if (e.target.value == "") {
            setMembership({ ...membership, name: "", customerId: "" })
        }
        else {
            console.log(e.target.value)
            const custId = e.target.value
            const filteredCustomer = customers.filter((cust) => cust.id == custId)
            setMembership({ ...membership, name: filteredCustomer[0].name, customerId: custId })
        }
    }

    const choosePlan = (e) => {
        console.log(e.target.value, 'plan')
        if (e.target.value == "") {
            setMembership({ ...membership, subscriptionId: "", type: "" })
        }
        else {
            const planId = e.target.value
            const filteredPlan = subscriptions.filter((subs) => subs.id == planId)
            setMembership({ ...membership, subscriptionId: planId, type: filteredPlan[0].name })
        }
    }

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
                <select id="custList" onChange={chooseCustomer} value={membership.customerId} className="form-select">
                    <option value="">Select a customer</option>
                    {
                        customers.map((customer, index) => {
                            return <option key={customer.id} value={customer.id}>{customer.name} </option>
                        })
                    }
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="subsList" className="form-label">Membership Type</label>
                <select id="subsList" onChange={choosePlan} value={membership.subscriptionId} className="form-select">
                    <option value="">Select a subscription</option>
                    {
                        subscriptions.map((subs, ind) => {
                            return <option key={subs.id} value={subs.id}>{subs.name}-{subs.validity} </option>
                        })
                    }
                </select>
            </div>

            <div className="d-flex justify-content-end">
                <button onClick={handleSave} className="btn btn-secondary">Add Membership</button>
            </div>
        </div>
    )
}

export default MembershipModal;