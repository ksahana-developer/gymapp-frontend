import { IoNotificationsOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { TbPointFilled } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import './customer.css'
import { useEffect, useState } from "react";
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
    const [fetchCustomer, setFetchCustomer] = useState(false)
    const openEditModal = () => {
        if (!isDisplayEdit)
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

    useEffect(() => {
        if (fetchCustomer) {
            getCustomer()
        }
        setFetchCustomer(false)
    }, [fetchCustomer])

    const token = localStorage.getItem('token')
    const decoded = token ? jwtDecode(token) : null
    return (
        <div className="container-fluid py-4 px-3 px-md-4 animate__animated animate__fadeIn">
            <div className="row mb-4">
                <div className="col-12">
                    <h2 className="mb-4 fw-bold text-primary">Customer Details</h2>
                    <Link to="/customers" className="text-decoration-none">
                        <button className="btn btn-light mb-4 shadow-sm hover-scale">
                            <MdOutlineKeyboardArrowLeft />Back to Customers
                        </button>
                    </Link>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-12">
                    <div className="customer-profile-card p-4 bg-white rounded-3 shadow-sm hover-card animate__animated animate__fadeIn">
                        <div className="d-flex flex-column flex-md-row align-items-center gap-4">
                            <div className="profile-image-container">
                                <img
                                    src={localStorage.getItem('customer') ? JSON.parse(localStorage.getItem('customer')).profilePicture : '"https://www.wikibiodata.com/wp-content/uploads/2020/12/Sumeet-Raghvan.jpg"'}
                                    alt="Profile"
                                    className="rounded-circle profile-image hover-scale"
                                    width="120"
                                    height="120" />
                            </div>
                            <div className="customer-info text-center d-flex flex-column align-items-start text-md-start">
                                <h4 className="mb-2 fw-bold text-primary">
                                    {!isLoadCust ? customer?.name :
                                        <p className="placeholder-glow">
                                            <span className="placeholder col-12"></span>
                                        </p>
                                    }
                                </h4>
                                <div className="d-flex flex-wrap align-items-center gap-3">
                                    <span className="badge bg-warning text-danger d-flex align-items-center info-item">
                                        <TbPointFilled className="me-1" />{customer?.status}
                                    </span>
                                    <p className="text-secondary fs-6 mb-0 info-item">
                                        <span className="fw-semibold">ID:</span> {!isLoadCust ? `GYM-${customer?.id}` :
                                            <span className="placeholder col-12"></span>
                                        }
                                    </p>
                                </div>
                                <div className="d-flex gap-3 align-items-center">
                                    {(id === decoded.id) && <button className="btn btn-light" onClick={() => openEditModal(customer)}><FiEdit /> Edit</button>}
                                    {(id === decoded.id) && <Link to={`/activity/customer/${JSON.parse(localStorage.getItem('customer'))?.id}`} className="btn btn-primary btn-sm my-2">View my activity</Link>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row gy-4">
                <div className="col-12 col-md-6">
                    <div className="card shadow-sm border-0 rounded-3 p-4 h-100 hover-card">
                        <h4 className="fw-bold mb-3">Contact Information</h4>
                        <p className="text-secondary mb-4">Customer's personal contact details</p>
                        <div className="d-flex align-items-center mb-3 info-item">
                            <MdOutlineEmail className="me-2 text-primary" />
                            <span>{!isLoadCust ? customer?.email :
                                <span className="placeholder col-6"></span>
                            }</span>
                        </div>
                        <div className="d-flex align-items-center info-item">
                            <FiPhone className="me-2 text-primary" />
                            <span>{!isLoadCust ? customer?.phoneNo :
                                <span className="placeholder col-4"></span>
                            }</span>
                        </div>
                    </div>
                </div>

                {customer?.activeSubscriptionId &&
                    <div className="col-12 col-md-6">
                        <div className="card shadow-sm border-0 rounded-3 p-4 h-100 hover-card">
                            <h4 className="fw-bold mb-3">Membership Details</h4>
                            <p className="text-secondary mb-4">Information about the customer's membership</p>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className="text-secondary mb-0">Type</p>
                                <p className="mb-0 fw-medium">{!isLoadMem ? membership?.type :
                                    <span className="placeholder col-12"></span>
                                }</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className="text-secondary mb-0">Start Date</p>
                                <p className="mb-0 fw-medium">{membership?.startDate}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className="text-secondary mb-0">End Date</p>
                                <p className="mb-0 fw-medium">
                                    {`${date?.getDate()}-${String(date?.getMonth()).length == 1 ? "0" + String(date?.getMonth() + 1) : (date?.getMonth() + 1)}-${date?.getFullYear()}`}
                                </p>
                            </div>
                        </div>
                    </div>
                }
            </div>

            <div className="row mt-4">
                <div className="col-12">
                    <div className="card shadow-sm border-0 rounded-3 p-4 hover-card">
                        <h4 className="fw-bold mb-3">Purchase History</h4>
                        <p className="text-secondary">Customer's personal contact details</p>
                    </div>
                </div>
            </div>

            {isDisplayEdit &&
                <EditProfileModal
                    customer={customer}
                    closeEditModal={closeEditModal}
                    setFetchCustomer={setFetchCustomer}
                />
            }
        </div>
    );
}

export default Customer;