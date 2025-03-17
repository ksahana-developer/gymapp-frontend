import { CiCirclePlus } from "react-icons/ci";
import { use, useEffect, useState } from "react";
import SubscriptionsTable from "../SubscriptionsTable/SubscriptionsTable";
import SubscriptionsModal from "../SubscriptionsModal/SubscriptionsModal";

const SubscriptionBody = () => {
    const [isDisplay, setIsDisplay] = useState(false)
    const [subscriptions, setSubscriptions] = useState([])
    const [subscription, setSubscription] = useState({})
    const [isUpdate, setIsUpdate] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)

    const openCreateModal = () => {
        setIsDisplay(true)
        setIsUpdate(false)
        setSuccessAlert(false)
        console.log('opened modal')
    }
    const closeModal = () => {
        setIsDisplay(false)
    }

    useEffect(() => {
        fetchSubscriptions() // this is to ensure that only when the creation of subs is successful, we are fetching from db.
    }, [successAlert])

    const createSubscription = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/subscriptions", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify(subscription)
            })
            const data = await response.json()
            console.log(data)
            setSuccessAlert(true)
        } catch (error) {
            console.log(error)
        }
    }

    const updateSubscription = async (subs) => {
        const { id } = subs
        try {
            const response = await fetch(`http://localhost:5000/api/subscriptions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify(subscription)
            })
            const data = await response.json()
            console.log(data)
            setSuccessAlert(true)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchSubscriptions = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/subscriptions", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
            })
            const data = await response.json()
            console.log(data)
            setSubscriptions(data.subscriptions.Items)

        } catch (error) {
            console.log(error)
        }
    }

    const deleteSubscription = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/subscriptions/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
            })
            setSubscriptions(subscriptions.filter(subs => subs.id != id))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchSubscriptions()
    }, [])
    return (
        <div className="container-fluid" >
            {successAlert && <div className="alert alert-success"> {isUpdate ? "Subscription Updated Successfully" : "Subscription created Successfully"}</div>}
            <div className="d-flex justify-content-between align-items-center" >
                <div className="d-flex flex-column">
                    <h1>Subscriptions</h1>
                    <p>Manage your gym Subscriptions</p>
                </div>
                <button type="button" onClick={openCreateModal} className="btn btn-secondary d-flex justify-content-between align-items-center gap-2"  ><CiCirclePlus /> <span>Add Subscription</span> </button>
            </div>
            <form className="d-flex container" role="search">
                <input className="form-control me-2" type="search" placeholder="Search subscriptions..." aria-label="Search" />
                <button className="btn btn-outline-secondary" type="submit">Search</button>
            </form>
            {<SubscriptionsTable setSubscription={setSubscription} setIsUpdate={setIsUpdate} setIsDisplay={setIsDisplay} deleteSubscription={deleteSubscription} updateSubscription={updateSubscription} subscriptions={subscriptions} subscription={subscription} />}
            {isDisplay && <SubscriptionsModal
                isUpdate={isUpdate}
                createSubscription={createSubscription}
                updateSubscription={updateSubscription}
                //  memberships={memberships}
                //   membership={membership} setMembership={setMembership} 
                setSubscription={setSubscription}
                subscription={subscription}
                subscriptions={subscriptions}
                closeModal={closeModal}
            />}
        </div>
    )
}

export default SubscriptionBody;