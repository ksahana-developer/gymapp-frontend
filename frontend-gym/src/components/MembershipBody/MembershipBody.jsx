import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import MembershipsTable from "../MembershipsTable/MembershipsTable";
import MembershipModal from "../MembershipModal/MembershipModal";


const MembershipBody = () => {
    const [isDisplay, setIsDisplay] = useState(false)
    const openModal = () => {
        setIsDisplay(true)
        console.log('opened modal')
    }
    const closeModal = () => {
        setIsDisplay(false)
    }
    
    const [membership, setMembership] = useState({})
    // const createMembership = (memb)=>{
    //     setMembership(memb)
    // }
    const [customers, setCustomers] = useState([
        {
            name: "Rajesh Wagle",
            email: "rajesh@gmail.com",
            role: "member",
            age: 23,
            phoneNo: "0932840832",
            branch: "Gujarat",
            status: "expired",
            password: "randomPassword",
            activeSubscriptionId: "219f47d2-905d-42ae-b920-b5dd53959752",
            id: "5c007bf5-cb8f-4dca-8d5f-89642eb99e93"
        }, {
            name: "Harsha Javvaji",
            email: "harsha@gmail.com",
            role: "member",
            age: 23,
            phoneNo: "0932840832",
            branch: "Gujarat",
            status: "active",
            password: "randomPassword",
            activeSubscriptionId: "46f1e197-0755-474f-93d8-1096f5eeb138",
            upcomingSubscriptionId: "46f1e197-0755-474f-93d8-1096f5eeb138",
            id: "219f47d2-905d-42ae-b920-b5dd53959752"
        }, {
            name: "Chaitanya",
            email: "chaitu@gmail.com",
            role: "member",
            age: 23,
            phoneNo: "0932840832",
            branch: "Hyderabad",
            status: "newUser",
            password: "randomPassword",
            id: "219f47d2-905d-42ae-b920-b5dd53959752"
        }, {
            name: "Sahana",
            email: "sahana@gmail.com",
            role: "member",
            age: 23,
            phoneNo: "0932840832",
            branch: "Mumbai",
            status: "active",
            password: "randomPassword",
            activeSubscriptionId: "5c007bf5-cb8f-4dca-8d5f-89642eb99e93",
            id: "219f47d2-905d-42ae-b920-b5dd53959752"
        }
    ])
    const [memberships, setMemberships] = useState([{
        name: "Rajesh Wagle",
        id: "219f47d2-905d-42ae-b920-b5dd53959752",
        type: "Super",
        startDate: "15/01/2023",
        endDate: "15/06/2025",
        price: 5000,
        status: "active"
    }, {
        name: "Harsha Javvaji",
        id: "5c007bf5-cb8f-4dca-8d5f-89642eb99e93",
        type: "Premium",
        startDate: "15/01/2023",
        endDate: "15/01/2026",
        price: 8000,
        status: "active"
    }, {
        name: "Vasant",
        type: "Basic",
        id: "24dc73a2-486b-4d17-885f-a83544bfc0b5",
        startDate: "15/01/2023",
        endDate: "15/04/2025",
        price: 3000,
        status: "active"
    }, {
        name: "Arjun",
        type: "Super",
        id: "8386b066-8b8c-46a3-8754-fc10ab229581",
        startDate: "15/01/2023",
        endDate: "15/01/2024",
        price: 5000,
        status: "epired"
    }
    ])

    const deleteMembership = (id) => {
        setMemberships(memberships.filter(membership => membership.id != id))
    }
    
    const updateMembership = (id)=>{
        setIsDisplay(true)
    }

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
            id: "c89b7df9-949c-410c-85bf-f0a55b2077cf",
            name: "Super",
            validity: "5m",
            type: "Subscription"
        },
        {
            amount: "10000",
            isActive: true,
            id: "c89b7df9-949c-410c-85bf-f0a55b2077cf",
            name: "Silver",
            validity: "7m",
            type: "Subscription"
        },
        {
            amount: "15000",
            isActive: true,
            id: "c89b7df9-949c-410c-85bf-f0a55b2077cf",
            name: "Gold",
            validity: "18m",
            type: "Subscription"
        },
        {
            amount: "17000",
            isActive: true,
            id: "c89b7df9-949c-410c-85bf-f0a55b2077cf",
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
        {isDisplay && <MembershipModal setMembership={setMembership} customers={customers} subscriptions={subscriptions} closeModal={closeModal} />}
    </div>)
}

export default MembershipBody