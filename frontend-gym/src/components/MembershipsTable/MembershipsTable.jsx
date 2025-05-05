import { useEffect, useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./membershipsTable.css"
import ActionsTool from "../ActionsTool/ActionsTool";

const MembershipsTable = ({ memberships, deleteMembership }) => {
    return (
        <div className="table-responsive membership-table-wrapper">
            <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                    <tr>
                        <th scope="col" className="py-3">Customer</th>
                        <th scope="col" className="py-3">Type</th>
                        <th scope="col" className="py-3">Start Date</th>
                        <th scope="col" className="py-3">End Date</th>
                        <th scope="col" className="py-3">Price</th>
                        <th scope="col" className="py-3">Status</th>
                        <th scope="col" className="py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {memberships.map((membership, index) => (
                        <tr key={index} className="membership-row">
                            <td className="py-3">
                                <div className="d-flex align-items-center">
                                    <div className="member-avatar">
                                        {membership?.name?.charAt(0)}
                                    </div>
                                    <span className="ms-2">{membership?.name}</span>
                                </div>
                            </td>
                            <td className="py-3">
                                <div className="d-flex align-items-center">
                                    <FaCreditCard className="membership-icon me-2" />
                                    <span>{membership?.type}</span>
                                </div>
                            </td>
                            <td className="py-3">{membership?.startDate}</td>
                            <td className="py-3">
                                {membership?.expiryDate 
                                    ? (new Date(membership?.expiryDate).toLocaleString()).split(',')[0]
                                    : <span className="text-muted">Not yet activated</span>
                                }
                            </td>
                            <td className="py-3">
                                <div className="price-badge">
                                    ₹{membership?.price}
                                </div>
                            </td>
                            <td className="py-3">
                                <span className={`status-badge ${membership?.status === "active" ? "status-active" : "status-inactive"}`}>
                                    {membership?.status}
                                </span>
                            </td>
                            <td className="py-3">
                                <ActionsTool id={membership.id} deleteMembership={deleteMembership} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {memberships.length === 0 && (
                <div className="text-center py-5 text-muted">
                    <div className="empty-state-icon mb-3">
                        <FaCreditCard size={40} />
                    </div>
                    <h5>No memberships found</h5>
                    <p className="mb-0">There are no memberships to display at the moment.</p>
                </div>
            )}
        </div>
    );
}

export default MembershipsTable;