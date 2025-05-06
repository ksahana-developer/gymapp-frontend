import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import SubscriptionsTable from "../SubscriptionsTable/SubscriptionsTable";
import SubscriptionsModal from "../SubscriptionsModal/SubscriptionsModal";
import "./subscriptionBody.css";

const SubscriptionBody = () => {
    const [isDisplay, setIsDisplay] = useState(false);
    const [subscriptions, setSubscriptions] = useState([]);
    const [subscription, setSubscription] = useState({});
    const [isUpdate, setIsUpdate] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);

    const openCreateModal = () => {
        setIsDisplay(true);
        setIsUpdate(false);
        setSuccessAlert(false);
        console.log("opened modal");
    };

    const closeModal = () => {
        setIsDisplay(false);
    };

    useEffect(() => {
        fetchSubscriptions();
    }, [successAlert]);

    const createSubscription = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/subscriptions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token"),
                },
                body: JSON.stringify(subscription),
            });
            const data = await response.json();
            console.log(data);
            setSuccessAlert(true);
        } catch (error) {
            console.log(error);
        }
    };

    const updateSubscription = async (subs) => {
        const { id } = subs;
        try {
            const response = await fetch(`http://localhost:5000/api/subscriptions/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token"),
                },
                body: JSON.stringify(subscription),
            });
            const data = await response.json();
            console.log(data);
            setSuccessAlert(true);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSubscriptions = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/subscriptions", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token"),
                },
            });
            const data = await response.json();
            console.log(data);
            setSubscriptions(data.subscriptions.Items);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteSubscription = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/subscriptions/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token"),
                },
            });
            setSubscriptions(subscriptions.filter((subs) => subs.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    return (
        <div className="subscription-container animate__animated animate__fadeIn">
            <div className="subscription-header py-4 mb-4">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="header-content animate__animated animate__fadeInLeft">
                                <h2 className="display-5 fw-bold text-primary mb-2">Subscriptions</h2>
                                <p className="text-muted lead mb-0">Manage your gym subscriptions effectively</p>
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex justify-content-lg-end mt-3 mt-lg-0">
                            <button 
                                type="button" 
                                onClick={openCreateModal}
                                className="btn btn-primary btn-lg d-flex align-items-center gap-2 animate__animated animate__fadeInRight"
                            >
                                <CiCirclePlus className="add-icon" size={24} />
                                <span>Add Subscription</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {successAlert && (
                <div className="container-fluid mb-4">
                    <div className="alert alert-success animate__animated animate__fadeInDown">
                        {isUpdate ? "Subscription Updated Successfully" : "Subscription Created Successfully"}
                    </div>
                </div>
            )}

            <div className="container-fluid subscription-content">
                <div className="search-section mb-4 animate__animated animate__fadeInUp">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <form className="search-form d-flex gap-2" role="search">
                                <input 
                                    className="form-control form-control-lg shadow-sm" 
                                    type="search" 
                                    placeholder="Search subscriptions..." 
                                    aria-label="Search"
                                />
                                <button className="btn btn-primary px-4" type="submit">
                                    Search
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="table-section animate__animated animate__fadeInUp animation-delay-1">
                    <SubscriptionsTable 
                        setSubscription={setSubscription} 
                        setIsUpdate={setIsUpdate} 
                        setIsDisplay={setIsDisplay} 
                        deleteSubscription={deleteSubscription} 
                        updateSubscription={updateSubscription} 
                        subscriptions={subscriptions} 
                        subscription={subscription}
                    />
                </div>
            </div>

            {isDisplay && (
                <SubscriptionsModal
                    isUpdate={isUpdate}
                    createSubscription={createSubscription}
                    updateSubscription={updateSubscription}
                    setSubscription={setSubscription}
                    subscription={subscription}
                    subscriptions={subscriptions}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
}

export default SubscriptionBody;