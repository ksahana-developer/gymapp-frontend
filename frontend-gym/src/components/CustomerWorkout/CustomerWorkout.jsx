import React, { useState } from 'react'
import { FaRunning, FaFire, FaClock } from "react-icons/fa";
import EditActivityModal from './EditActivityModal';

const CustomerWorkout = ({ act, setIsReload }) => {
    const [showAllActivities, setShowAllActivities] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    
    const toggleShowAllActivities = () => {
        setShowAllActivities(!showAllActivities)
    }

    const deleteActivity = async (id) => {
        const response = await fetch(`http://localhost:5000/api/log/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                token: localStorage.getItem('token')
            }
        });
        const data = await response.json()
        setIsReload(true)
        console.log(data)
    }

    return (
        <div className="d-flex flex-column border border-white rounded mb-2">
            <div className="d-flex gap-2 align-items-center justify-content-between px-2 my-2">
                <p className='m-0'><FaClock /> StartedAt: {`${new Date(act?.inTime).getUTCHours()} : ${new Date(act?.inTime).getUTCMinutes()}`} </p>
                <p className='m-0'><FaClock /> EndedAt: {`${new Date(act?.outTime).getUTCHours()} : ${new Date(act?.outTime).getUTCMinutes()}`} </p>
                <div className="d-flex align-items-center justify-content-around gap-2">
                    <button onClick={toggleShowAllActivities} className="btn btn-secondary btn-sm">{showAllActivities ? "Hide" : "View"}</button>
                    <button onClick={() => setShowEditModal(true)} className="btn btn-primary btn-sm">Edit</button>
                    <button onClick={() => {deleteActivity(act?.id)}} className="btn btn-danger btn-sm">Delete</button>
                </div>
            </div>

            {showAllActivities && <div className="d-flex flex-column mb-2">
                {act?.activities.map((activity, index) => {
                    return (
                        <div key={index} className="d-flex bg-white align-items-center border-white border rounded my-1 ms-2 me-3 gap-4 p-2">
                            <p className="m-0">
                                <FaRunning size={25} />{activity?.type}
                            </p>
                            <p className="m-0">
                                <FaFire className='text-danger' /> {activity?.calories} Cal
                            </p>
                        </div>
                    )
                })}
            </div>}

            {showEditModal && (
                <EditActivityModal 
                    setOpenModal={setShowEditModal}
                    activityData={act}
                    setIsReload={setIsReload}
                />
            )}
        </div>
    )
}

export default CustomerWorkout
