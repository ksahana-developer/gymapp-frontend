import { useEffect } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import { FaCreditCard } from "react-icons/fa";

const MembershipsTable = ({ memberships }) => {

    return (
        <table className="table  m-2 container-fluid">
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
                            <td>{<FaCreditCard color="grey"/>} {membership?.type} </td>
                            <td>{membership?.startDate} </td>
                            <td>{membership?.endDate} </td>
                            <td>{membership?.price} </td>
                            <td>{membership?.status == "active" ? <span className="badge text-bg-info">{membership?.status}</span>: <span className="badge text-bg-danger">{membership?.status}</span>} </td>
                            <td><SlOptionsVertical /> </td>

                        </tr>)
                    })
                }
            </tbody>
        </table>
    )
}

export default MembershipsTable;