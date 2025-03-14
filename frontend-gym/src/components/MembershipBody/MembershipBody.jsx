import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import MembershipsTable from "../MembershipsTable/MembershipsTable";


const MembershipBody = () => {
    const [memberships, setMemberships] = useState([{
        name: "Rajesh Wagle",
        type: "Super",
        startDate: "15/01/2023",
        endDate: "15/06/2025",
        price: 5000,
        status: "active"
    }, {
        name: "Harsha Javvaji",
        type: "Premium",
        startDate: "15/01/2023",
        endDate: "15/01/2026",
        price: 8000,
        status: "active"
    }, {
        name: "Vasant",
        type: "Basic",
        startDate: "15/01/2023",
        endDate: "15/04/2025",
        price: 3000,
        status: "active"
    }, {
        name: "Arjun",
        type: "Super",
        startDate: "15/01/2023",
        endDate: "15/01/2024",
        price: 5000,
        status: "epired"
    }
    ])

    return (<div className="container-fluid" >
        <div className="d-flex justify-content-between align-items-center" >
            <div className="d-flex flex-column">
                <h1>Memberships</h1>
                <p>Manage your gym memberships</p>
            </div>
            <button type="button" className="btn btn-secondary d-flex justify-content-between align-items-center gap-2"  ><CiCirclePlus /> <span>Add Membership</span> </button>
        </div>
        <form className="d-flex container" role="search">
            <input className="form-control me-2" type="search" placeholder="Search memberships..." aria-label="Search" />
            <button className="btn btn-outline-secondary" type="submit">Search</button>
        </form>
        <MembershipsTable memberships={memberships} />
    </div>)
}

export default MembershipBody