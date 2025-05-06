import "./membershipmodal.css"
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';
import { FaSpinner } from "react-icons/fa";

const MembershipModal = ({ createMembership, closeModal, customers, subscriptions, setMembership, membership, memberships }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        if ((membership.customerId && membership.type && membership.subscriptionId && membership.name) && 
            (membership.customerId !== "" && membership.subscriptionId !== "" && membership.name !== "" && membership.type !== "")) {
            setIsLoading(true);
            await createMembership(membership);
            setIsLoading(false);
            closeModal();
            console.log('membership created successfully');
        } else {
            alert("Please fill all the necessary fields");
        }
    }

    const chooseCustomer = (e) => {
        console.log(e.target.value, 'customer')
        if (e.target.value === "") {
            setMembership({ ...membership, name: "", customerId: "" })
        }
        else {
            console.log(e.target.value)
            const custId = e.target.value
            const filteredCustomer = customers.filter((cust) => cust.id === custId)
            setMembership({ ...membership, name: filteredCustomer[0].name, customerId: custId })
        }
    }

    const choosePlan = (e) => {
        console.log(e.target.value, 'plan')
        if (e.target.value === "") {
            setMembership({ ...membership, subscriptionId: "", type: "" })
        }
        else {
            const planId = e.target.value
            const filteredPlan = subscriptions.filter((subs) => subs.id === planId)
            setMembership({ ...membership, subscriptionId: planId, type: filteredPlan[0].name })
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container animate__animated animate__fadeIn">
                <div className="modal-content p-4">
                    <div className="modal-header d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h4 className="modal-title fw-bold mb-2">Add New Membership</h4>
                            <p className="text-muted mb-0">Enter the details for the new membership.</p>
                        </div>
                        <button 
                            className="btn-close-modal"
                            onClick={closeModal}
                            aria-label="Close modal"
                            disabled={isLoading}
                        >
                            <IoMdClose size={24} />
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className="mb-4">
                            <label htmlFor="custList" className="form-label fw-semibold">Customer</label>
                            <select 
                                id="custList" 
                                onChange={chooseCustomer} 
                                value={membership.customerId} 
                                className="form-select form-select-lg"
                                disabled={isLoading}
                            >
                                <option value="">Select a customer</option>
                                {customers.map((customer) => (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="mb-4">
                            <label htmlFor="subsList" className="form-label fw-semibold">Membership Type</label>
                            <select 
                                id="subsList" 
                                onChange={choosePlan} 
                                value={membership.subscriptionId} 
                                className="form-select form-select-lg"
                                disabled={isLoading}
                            >
                                <option value="">Select a subscription</option>
                                {subscriptions.map((subs) => (
                                    <option key={subs.id} value={subs.id}>
                                        {subs.name} - {subs.validity}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="modal-footer border-top pt-4">
                        <button 
                            onClick={closeModal}
                            className="btn btn-light btn-lg me-2"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave} 
                            className={`btn btn-primary btn-lg px-4 position-relative ${isLoading ? 'is-loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading-text">Creating...</span>
                                    <FaSpinner className="spinner-icon" />
                                </>
                            ) : 'Add Membership'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MembershipModal;