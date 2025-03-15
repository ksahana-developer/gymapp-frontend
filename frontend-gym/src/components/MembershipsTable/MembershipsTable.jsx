import { useEffect, useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./membershipsTable.css"
import ActionsTool from "../ActionsTool/ActionsTool";

const MembershipsTable = ({ memberships, deleteMembership }) => {

    return (
        <table className="table  my-4 mx-2 container-fluid border border-light">
            <thead>
                <tr>
                    <th scope="col">Customer</th>
                    <th scope="col">Type</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    memberships.map((membership, index) => {
                        return (<tr key={index}>
                            <td>{membership?.name} </td>
                            <td>{<FaCreditCard color="grey" />} {membership?.type} </td>
                            <td>{membership?.startDate} </td>
                            <td>{membership?.endDate} </td>
                            <td>{membership?.price} </td>
                            <td>{membership?.status == "active" ? <span className="badge text-bg-success">{membership?.status}</span> : <span className="badge text-bg-danger">{membership?.status}</span>} </td>
                            {/* <td><SlOptionsVertical onClick={handleAction} /> </td> */}
                            <td>
                                <ActionsTool id={membership.id} deleteMembership={deleteMembership} />
                            </td>

                        </tr>)
                    })
                }
            </tbody>
        </table>
    )
}

export default MembershipsTable;