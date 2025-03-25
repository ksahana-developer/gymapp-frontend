import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import MembershipsTable from "../MembershipsTable/MembershipsTable";
import MembershipModal from "../MembershipModal/MembershipModal";


const MembershipBody = () => {
    const [isDisplay, setIsDisplay] = useState(false)
    const [memBookmark, setMemBookmark] = useState(null)
    const openModal = () => {
        setIsDisplay(true)
        console.log('opened modal')
    }
    const closeModal = () => {
        setIsDisplay(false)
    }

    const [membership, setMembership] = useState({})

    const [customers, setCustomers] = useState([])

    const fetchCustomers = async () => {
        console.log('hi this is an api call')
        console.log(`${process.env.REACT_BASE_URL}/api/customers`)
        try {
            const response = await fetch(`http://localhost:5000/api/customers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
            })
            const data = await response.json()
            console.log(data)
            setCustomers(data.customers)
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

    const fetchMemberships = async () => {
        try {
            const baseUrl = 'http://localhost:5000/api/customerSubscriptions';
            const queryParams = {
                nextBookmark: memBookmark
            };

            const url = new URL(baseUrl);
            if (memBookmark !== null) {
                Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));
            }

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
            })
            const data = await response.json()
            console.log(data)
            setMemBookmark(data?.customerSubscriptions?.LastEvaluatedKey?.id)
            setMemberships([...memberships, ...data.customerSubscriptions.Items])
        } catch (error) {
            console.log(error)
        }
    }

    const createMembership = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/customerSubscriptions", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
                body: JSON.stringify(membership)
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteMembership = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/customerSubscriptions/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                }
            })
            setMemberships(memberships.filter(membership => membership.id != id))
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchMemberships()
        fetchSubscriptions()
        fetchCustomers()
    }, [])

    const [memberships, setMemberships] = useState([])



    const [subscriptions, setSubscriptions] = useState([
        {
            amount: "5000",
            isActive: true,
            id: "c89b7df9-949c-410c-85bf-f0a55b2077cf",
            name: "Basic",
            validity: "3m",
            type: "Subscription"
        },
        {
            amount: "7000",
            isActive: true,
            id: "0c52070d-efea-4ff4-ad0b-c508e234fc02",
            name: "Super",
            validity: "5m",
            type: "Subscription"
        },
        {
            amount: "10000",
            isActive: true,
            id: "bc373cf5-b7f3-43f5-be75-8b6797c73c0e",
            name: "Silver",
            validity: "7m",
            type: "Subscription"
        },
        {
            amount: "15000",
            isActive: true,
            id: "0d0ee5df-c18c-46e8-9586-59ca84a85f33",
            name: "Gold",
            validity: "18m",
            type: "Subscription"
        },
        {
            amount: "17000",
            isActive: true,
            id: "59d02dbd-d988-43be-8290-baf561ab7c7b",
            name: "Premium",
            validity: "24m",
            type: "Subscription"
        },
    ])

    return (<div className="container-fluid" >
        <div className="d-flex justify-content-between align-items-center" >
            <div className="d-flex flex-column">
                <h1>Memberships</h1>
                <p>Manage your gym memberships</p>
            </div>
            <button type="button" onClick={openModal} className="btn btn-secondary d-flex justify-content-between align-items-center gap-2"  ><CiCirclePlus /> <span>Add Membership</span> </button>
        </div>
        <form className="d-flex container" role="search">
            <input className="form-control me-2" type="search" placeholder="Search memberships..." aria-label="Search" />
            <button className="btn btn-outline-secondary" type="submit">Search</button>
        </form>
        <MembershipsTable deleteMembership={deleteMembership} memberships={memberships} />
        {memBookmark !== undefined && <div className="d-flex justify-content-end load-more">
            <button onClick={fetchMemberships} className="btn btn-primary">Load More</button>
        </div>}
        {memBookmark === undefined && <p className="text-secondary"> Have reached the end of results </p>}
        {isDisplay && <MembershipModal createMembership={createMembership} memberships={memberships} membership={membership} setMembership={setMembership} customers={customers} subscriptions={subscriptions} closeModal={closeModal} />}
    </div>)
}

export default MembershipBody