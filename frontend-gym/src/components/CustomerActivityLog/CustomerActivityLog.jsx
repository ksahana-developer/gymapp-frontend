import React from 'react'
import { FaFire } from "react-icons/fa6";
import { MdWaterDrop } from "react-icons/md";

const CustomerActivityLog = () => {
    return (
        <div style={{ width: '50%' }} className='border p-2 rounded-3 d-flex flex-column gap-2' >
            <div className="d-flex gap-2 justify-content-center">
                <div style={{ width: '50%' }} className="border text-danger bg-light d-flex flex-column p-2 rounded-2 justify-content-center align-items-center">
                    <h5 className='text-secondary' > <FaFire className='text-danger' /> Calories Burnt</h5>
                    <p className='mb-0' >300  <span className='text-secondary' >Cal</span></p>
                </div>
                <div style={{ width: '50%' }} className="border text-info bg-light d-flex flex-column p-2 rounded-2 justify-content-center align-items-center ">
                    <h5 className='text-secondary' ><MdWaterDrop className='text-info' /> Water Drank</h5>
                    <p className='mb-0'>800 <span className='text-secondary'>Ml</span></p>
                </div>
            </div>
            <div className="d-flex gap-2 justify-content-center">
                <div style={{ width: '50%' }} className="border text-danger bg-light d-flex flex-column p-2 rounded-2 justify-content-center align-items-center">
                    <h5 className='text-secondary' > <FaFire className='text-danger' /> Calories Burnt</h5>
                    <p className='mb-0' >300  <span className='text-secondary' >Cal</span></p>
                </div>
                <div style={{ width: '50%' }} className="border text-info bg-light d-flex flex-column p-2 rounded-2 justify-content-center align-items-center ">
                    <h5 className='text-secondary' ><MdWaterDrop className='text-info' /> Water Drank</h5>
                    <p className='mb-0'>800 <span className='text-secondary'>Ml</span></p>
                </div>
            </div>
        </div>
    )
}

export default CustomerActivityLog
