import React, { useEffect, useState } from 'react'
import { FaFire } from "react-icons/fa6";
import { MdOutlineSportsGymnastics } from "react-icons/md";
import { MdWaterDrop } from "react-icons/md";
import CustomerWorkout from '../CustomerWorkout/CustomerWorkout';
import AddActivityModal from '../AddActivityModal/AddActivityModal';

const CustomerActivityLog = ({ activities, date, getMonth, setIsReload }) => {
    const [isDisplayActivity, setIsDisplayActivity] = useState(false)
    const toggleDisplayActivity = () => {
        setIsDisplayActivity(!isDisplayActivity)
    }

    useEffect(() => {
        setIsDisplayActivity(false)
    }, [date])
    const [openAddActivityModal, setOpenAddActivityModal] = useState(false)
    const addActivityModal = () => {
        setOpenAddActivityModal(!openAddActivityModal)
    }

    return (
        <div style={{ width: '50%' }} className='border p-2 rounded-3 d-flex flex-column gap-2' >
            <div className="d-flex align-items-center justify-content-between">

                <h5 className='text-secondary'>{activities?.length === 0 ? `No Activities recorded on ${(new Date(date)).getDate()} ${getMonth((new Date(date)).getMonth())} ${(new Date(date)).getFullYear()}` : ` Your workout on ${(new Date(date)).getDate()} ${getMonth((new Date(date)).getMonth())} ${(new Date(date)).getFullYear()}`}</h5>
                <button onClick={addActivityModal} className="btn btn-primary btn-sm">Add an activity</button>
            </div>

            {activities?.length > 0 && <div className="d-flex align-items-center gap-2">
                <p className='mb-0' ><FaFire className='text-danger mx-2' />Calories Burnt: 800   <span className='text-secondary' >Cal</span></p>
                <button onClick={toggleDisplayActivity} className="btn btn-danger btn-sm">{isDisplayActivity ? "Hide" : "Show"}</button>
            </div>}
            {isDisplayActivity && <div className="d-flex flex-column border border-light p-2 m-2 rounded bg-light">
                {activities?.map((act, ind) => {
                    return (
                        <CustomerWorkout setIsReload={setIsReload} act={act} key={act?.id} />
                    )
                })}
            </div>
            }

            {/* </div> */}
            {/* <div style={{ width: '50%' }} className="border text-info bg-light d-flex flex-column p-2 rounded-2 justify-content-center align-items-center ">
                    <h5 className='text-secondary' ><MdWaterDrop className='text-info' /> Water Drank</h5>
                    <p className='mb-0'>800 <span className='text-secondary'>Ml</span></p>
                </div> */}
            {/* </div> */}
            {/* <div className="d-flex gap-2 justify-content-center">
                <div style={{ width: '50%' }} className="border text-danger bg-light d-flex flex-column p-2 rounded-2 justify-content-center align-items-center">
                    <h5 className='text-secondary' > <FaFire className='text-danger' /> Calories Intake</h5>
                    <p className='mb-0' >300  <span className='text-secondary' >Cal</span></p>
                </div>
                <div style={{ width: '50%' }} className="border text-info bg-light d-flex flex-column p-2 rounded-2 justify-content-center align-items-center ">
                    <h5 className='text-secondary' ><MdOutlineSportsGymnastics className='text-danger' /> My Workout</h5>
                    <div className="d-flex justify-content-space-between gap-3">
                        <p className='mb-0'>InTime <span className='text-secondary'>Ml</span></p>
                        <p className='mb-0'>OutTime <span className='text-secondary'>Ml</span></p>
                    </div>
                </div>
            </div> */}
            {
                openAddActivityModal && <AddActivityModal setOpenModal={setOpenAddActivityModal} />
            }
        </div>
    )
}

export default CustomerActivityLog
