import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { Link } from 'react-router-dom'

const EditProfileModal = ({ customer, closeEditModal }) => {
  
  const [ formData, setFormData ] = useState({
    id: "",
    name: "",
    email: "",
    phoneNo: "",
    startDate: "",
    status: "",
    branch: "",
    dateOfBirth: "",
    role: "",
  })

  useEffect(() => {
if(customer){
  setFormData({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phoneNo : customer.phoneNo,
    dateOfBirth : customer.dateOfBirth
  })
}
  },[customer])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  return (
    <div
      className="centered-content d-flex flex-column"
      style={{ fontWeight: "600" }}
    >
      <div className="d-flex mb-2 justify-content-between">
        <div className="d-flex flex-column">
          <span style={{ fontWeight: "bold" }}>Edit Profile</span>
          {/* <span>Enter the details for the new customer.</span> */}
        </div>
        <Link onClick={closeEditModal} style={{ color: "grey" }}>
          <RxCross2 />
        </Link>
      </div>
      {
        formData?.profilePic && 
      (
        <div className="d-flex justify-content-center mb-1">
                <img
                  src={formData?.profilePicture}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: "100px", height: "100px" }}
                  />
              </div>
      )
      }
      <div>
        <label htmlFor="name" className='form-label'>
          Name
        </label>
        <input type="text"
        id='name'
        name='name'
        className='form-control mb-1'
        value={formData.name}
        onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email" className='form-label mb-1'>Email</label>
        <input type="email" 
        id='email'
        className='form-control'
        value={formData.email}
        disabled
        />
      </div>
      <div>
        <label htmlFor="phoneNo" className='form-label mb-1'>Phone Number</label>
        <input type="mobile-number"
        id='phoneNo'
        className='mb-1 form-control'
        value={formData.phoneNo}
        onChange={handleChange}
        name='phoneNo'
        />
      </div>

    </div>
  )
}

export default EditProfileModal;
