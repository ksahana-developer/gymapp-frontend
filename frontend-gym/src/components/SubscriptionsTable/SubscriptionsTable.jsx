import { FaCreditCard } from "react-icons/fa";
import ActionsSubscriptions from "../ActionsSubscriptions/ActionsSubscriptions";
import "./subscriptionsTable.css";

const SubscriptionsTable = ({ 
    deleteSubscription, 
    updateSubscription, 
    subscriptions, 
    subscription, 
    setIsDisplay, 
    setIsUpdate, 
    setSubscription 
}) => {
    return (
        <div className="table-responsive subscriptions-table-wrapper animate__animated animate__fadeIn">
            <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                    <tr>
                        <th scope="col" className="py-3">Subscription</th>
                        <th scope="col" className="py-3">Price</th>
                        <th scope="col" className="py-3">Validity</th>
                        <th scope="col" className="py-3">Status</th>
                        <th scope="col" className="py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subscriptions.map((subs, index) => (
                        <tr key={subs.id || index} className="subscription-row animate__animated animate__fadeInUp">
                            <td className="py-3">
                                <div className="subscription-name">
                                    {subs?.name}
                                </div>
                            </td>
                            <td className="py-3">
                                <div className="price-badge">
                                    <FaCreditCard className="price-icon" />
                                    <span>₹{subs?.amount}</span>
                                </div>
                            </td>
                            <td className="py-3">
                                <div className="validity-badge">
                                    {subs?.validity} months
                                </div>
                            </td>
                            <td className="py-3">
                                <span className={`status-badge ${subs?.isActive === "true" ? 'active' : 'inactive'}`}>
                                    {subs?.isActive === "true" ? "Active" : "Inactive"}
                                </span>
                            </td>
                            <td className="py-3">
                                <ActionsSubscriptions 
                                    setSubscription={setSubscription}
                                    subscriptions={subscriptions}
                                    setIsUpdate={setIsUpdate}
                                    id={subs.id}
                                    deleteSubscription={deleteSubscription}
                                    updateSubscription={updateSubscription}
                                    subscription={subscription}
                                    setIsDisplay={setIsDisplay}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {subscriptions.length === 0 && (
                <div className="text-center py-5 empty-state animate__animated animate__fadeIn">
                    <div className="empty-state-icon mb-3">
                        <FaCreditCard size={40} />
                    </div>
                    <h5>No Subscriptions Found</h5>
                    <p className="text-muted mb-0">There are no subscriptions to display at the moment.</p>
                </div>
            )}
        </div>
    );
};

export default SubscriptionsTable;