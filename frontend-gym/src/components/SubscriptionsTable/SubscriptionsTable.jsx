import { FaCreditCard } from "react-icons/fa";
import ActionsSubscriptions from "../ActionsSubscriptions/ActionsSubscriptions";

const SubscriptionsTable = ({deleteSubscription, updateSubscription, subscriptions, subscription, setIsDisplay, setIsUpdate, setSubscription } ) => {

    return (<table className="table  my-4 mx-2 container-fluid border border-light">
        <thead>
            <tr>
                <th scope="col">Subscription</th>
                <th scope="col">Price</th>
                <th scope="col">Validity</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            {
                subscriptions.map((subs, index) => {
                    return (<tr key={index}>
                        <td>{subs?.name} </td>
                        <td>{<FaCreditCard color="grey" />} {subs?.amount} </td>
                        <td>{subs?.validity} </td>
                        <td>{subs?.isActive == "true" ? "active" : "not-active"}</td>
                        {/* <td>{membership?.price} </td>
                        <td>{membership?.status == "active" ? <span className="badge text-bg-success">{membership?.status}</span> : <span className="badge text-bg-danger">{membership?.status}</span>} </td> */}
                        {/* <td><SlOptionsVertical onClick={handleAction} /> </td> */}
                        <td>
                            <ActionsSubscriptions setSubscription={setSubscription} subscriptions={subscriptions} setIsUpdate={setIsUpdate} id={subs.id} deleteSubscription={deleteSubscription} updateSubscription={updateSubscription} subscription={subscription} setIsDisplay={setIsDisplay} />
                        </td>

                    </tr>)
                })
            }
        </tbody>
    </table>)
}

export default SubscriptionsTable;