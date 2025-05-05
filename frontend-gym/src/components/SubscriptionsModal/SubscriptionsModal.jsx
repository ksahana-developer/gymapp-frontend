import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import "./subscriptionsModal.css";

const SubscriptionsModal = ({ 
    closeModal, 
    createSubscription, 
    updateSubscription, 
    subscription, 
    setSubscription, 
    isUpdate 
}) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!subscription.name?.trim()) newErrors.name = "Name is required";
        if (!subscription.validity) newErrors.validity = "Validity is required";
        if (!subscription.amount) newErrors.amount = "Price is required";
        if (!subscription.isActive) newErrors.isActive = "Status is required";
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubscription({ ...subscription, [name]: value });
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const handleSubmit = async () => {
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setLoading(true);
        try {
            if (isUpdate) {
                await updateSubscription(subscription);
            } else {
                await createSubscription(subscription);
            }
            closeModal();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container animate__animated animate__fadeIn">
                <div className="modal-content p-4">
                    <div className="modal-header d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h4 className="modal-title fw-bold mb-2">
                                {isUpdate ? "Update Subscription" : "Add New Subscription"}
                            </h4>
                            <p className="text-muted mb-0">
                                {isUpdate ? "Update the subscription details below" : "Enter the details for the new subscription"}
                            </p>
                        </div>
                        <button 
                            className="btn-close-modal"
                            onClick={closeModal}
                            disabled={loading}
                        >
                            <IoMdClose size={24} />
                        </button>
                    </div>

                    <div className="modal-body">
                        <form className="row g-3">
                            <div className="col-12">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        id="name"
                                        name="name"
                                        placeholder="Enter subscription name"
                                        value={subscription?.name || ''}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    <label htmlFor="name">Subscription Name</label>
                                    {errors.name && (
                                        <div className="invalid-feedback">{errors.name}</div>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="number"
                                        className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                                        id="amount"
                                        name="amount"
                                        placeholder="Enter price"
                                        value={subscription?.amount || ''}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    <label htmlFor="amount">Price (₹)</label>
                                    {errors.amount && (
                                        <div className="invalid-feedback">{errors.amount}</div>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="number"
                                        className={`form-control ${errors.validity ? 'is-invalid' : ''}`}
                                        id="validity"
                                        name="validity"
                                        placeholder="Enter validity"
                                        value={subscription?.validity || ''}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    <label htmlFor="validity">Validity (months)</label>
                                    {errors.validity && (
                                        <div className="invalid-feedback">{errors.validity}</div>
                                    )}
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="form-floating">
                                    <select
                                        className={`form-select ${errors.isActive ? 'is-invalid' : ''}`}
                                        id="isActive"
                                        name="isActive"
                                        value={subscription?.isActive || ''}
                                        onChange={handleChange}
                                        disabled={loading}
                                    >
                                        <option value="">Select status</option>
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                    <label htmlFor="isActive">Status</label>
                                    {errors.isActive && (
                                        <div className="invalid-feedback">{errors.isActive}</div>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer border-top pt-4 mt-4">
                        <button 
                            type="button" 
                            className="btn btn-light btn-lg"
                            onClick={closeModal}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button 
                            type="button" 
                            className={`btn btn-primary btn-lg px-4 position-relative ${loading ? 'is-loading' : ''}`}
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="loading-text">
                                        {isUpdate ? 'Updating...' : 'Creating...'}
                                    </span>
                                    <FaSpinner className="spinner-icon" />
                                </>
                            ) : (
                                isUpdate ? 'Update Subscription' : 'Add Subscription'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionsModal;