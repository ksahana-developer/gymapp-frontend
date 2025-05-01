import { IoNotificationsOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { TbPointFilled } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import './customer.css'
import { use, useEffect, useState } from "react";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";
import { jwtDecode } from "jwt-decode";

const Customer = () => {
    const { id } = useParams()
    const [customer, setCustomer] = useState({})
    const [membership, setMembership] = useState({})
    const [date, setDate] = useState(new Date())
    const [isLoadCust, setIsLoadCust] = useState(false)
    const [isLoadMem, setIsLoadMem] = useState(false)
    const [isDisplayEdit, setIsDisplayEdit] = useState(false)

    const openEditModal = () => {
        if(!isDisplayEdit)
        setIsDisplayEdit(true)
    }

    const closeEditModal = () => {
        setIsDisplayEdit(false)
    }

    const getCustomer = async () => {
        try {
            setIsLoadCust(true)
            const response = await fetch(`http://localhost:5000/api/customers/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token")
                }
            })
            console.log(response)
            const data = await response.json()
            console.log(data)
            setCustomer(data)
            setIsLoadCust(false)
        } catch (error) {
            console.log(error)
            setIsLoadCust(false)
        }
    }
    const getMembership = async () => {
        setIsLoadMem(true)
        try {
            const response = await fetch(`http://localhost:5000/api/customerSubscriptions/${customer?.activeSubscriptionId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    token: localStorage.getItem("token")
                }
            })
            console.log(response)
            const data = await response.json()
            console.log(data)
            setMembership(data?.customerSubscription?.Item)
            setDate(new Date(data?.customerSubscription?.Item?.expiryDate))
            setIsLoadMem(false)

        } catch (error) {
            console.log(error)
            setIsLoadMem(false)
        }
    }
    useEffect(() => {
        getMembership()
    }, [customer])

    useEffect(() => {
        getCustomer()
    }, [])

    const token = localStorage.getItem('token')
    const decoded = token? jwtDecode(token) : null
    return (
        <div className="d-flex flex-column container-fluid mt-3" >
            <h2 className="mb-4" >Customer Details</h2>
            <Link to="/customers"><button className="btn btn-light mb-4" > <MdOutlineKeyboardArrowLeft />Back to Customers</button></Link>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center justify-content-center gap-2">
                    <img style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%"
                    }} src={localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')).profilePicture : '"https://www.wikibiodata.com/wp-content/uploads/2020/12/Sumeet-Raghvan.jpg"'} alt="" />
                    <div className="d-flex flex-column">
                        <h4>{!isLoadCust ? customer?.name : <p className="placeholder-glow">
                            <span className="placeholder col-12"></span>
                        </p>} </h4>
                        <div className="d-flex align-items-center gap-2">
                            <span className="badge text-bg-warning text-danger"><TbPointFilled />{customer?.status} </span>
                            <p className="text-secondary fs-6 mb-0">ID: {!isLoadCust ? `GYM-${customer?.id}` : <span className="placeholder col-12"></span> } </p>
                        </div>
                    </div>
                </div>
                <div className="d-flex gap-3 align-items-center">
                    {(id === decoded.id) && <button className="btn btn-light" onClick={() => openEditModal(customer)}><FiEdit /> Edit</button>}
                    <button className="btn btn-danger"><AiOutlineDelete /> Delete</button>
                    <Link to={`/activity/customer/${JSON.parse(localStorage.getItem('customer'))?.id}`} className="btn btn-light">View my activity</Link>
                </div>
            </div>
            <div className="d-flex justify-content-around align-items-center mt-2 ms-5 me-5 gap-3">
                <div className="d-flex flex-column border border-light border-3 p-4 rounded-2 flex-item">
                    <h4>Contact Information</h4>
                    <p className="fs-6 text-secondary">Customer's personal contact details</p>
                    <p><MdOutlineEmail /> {!isLoadCust ? customer?.email :<span className="placeholder col-6"></span> } </p>
                    <p><FiPhone /> {!isLoadCust ? customer?.phoneNo : <span className="placeholder col-4"></span>} </p>
                </div>
                {customer?.activeSubscriptionId && <div className="d-flex flex-column border border-light border-3 p-4 rounded-2 flex-item">
                    <h4>Membership Details</h4>
                    <p className="fs-6 text-secondary">Information about the customer's membership</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="text-secondary">Type</p>
                        <p>{!isLoadMem ? membership?.type :  <span className="placeholder col-12"></span>} </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="text-secondary">Start Date</p>
                        <p>{membership?.startDate} </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="text-secondary">End Date</p>
                        <p>{`${date?.getDate()}-${String(date?.getMonth()).length == 1 ? "0" + String(date?.getMonth() + 1) : (date?.getMonth() + 1)}-${date?.getFullYear()}`} </p>
                    </div>
                </div>}
            </div>
            <div className="d-flex flex-column border border-light border-3 p-4 rounded-2 mt-4">
            <h4>Purshase History</h4>
                    <p className="fs-6 text-secondary">Customer's personal contact details</p>
            </div>
            {isDisplayEdit && <EditProfileModal customer = {customer} closeEditModal = {closeEditModal} />}
        </div>)
}


export default Customer;