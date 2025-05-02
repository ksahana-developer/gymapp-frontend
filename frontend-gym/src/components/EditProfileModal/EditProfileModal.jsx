import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const EditProfileModal = ({ customer, closeEditModal, setFetchCustomer }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phoneNo: "",
    startDate: "",
    status: "",
    branch: "",
    dateOfBirth: "",
    role: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("")
  useEffect(() => {
    if (customer) {
      setFormData({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phoneNo: customer.phoneNo,
        dateOfBirth: customer.dateOfBirth,
        profilePicture: customer.profilePicture,
      });
    }
  }, [customer]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result }); // Set the base64 string as the profile picture
        console.log(reader.result); // Log the base64 string to the console
      };
      reader.readAsDataURL(file); // Read the file as a data URL (base64 string)
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    // e.preventDefault();
    try {
      setLoading(true)
      const response = await fetch(
        `http://localhost:5000/api/customers/${formData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json",
            token : localStorage.getItem('token')
           },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.status === 200) {
        setMessage("Profile updated successfully");
        setFetchCustomer(true)
        setTimeout(() => {
          setMessage("");
          closeEditModal();
        }, 3000);
        
      }
      else {
        setMessage("Profile update failed")
      }
    } catch (error) {
      console.log(error);
      setMessage("Failed to update profile");
    } finally {
      setLoading(false)
    }
  };
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
      {formData?.profilePicture && (
        <div className="d-flex justify-content-center mb-1">
          <img
            src={formData?.profilePicture}
            alt="Profile"
            className="rounded-circle"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      )}
      <div className="d-flex justify-content-center mb-1">
        <label htmlFor="userProfilePic" className="btn btn-secondary w-80">
          {!formData?.profilePicture ? "Upload Profile Picture" : "Update"}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="userProfilePic"
          name="profilePicture"
        />
      </div>
      <div>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control mb-1"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email" className="form-label mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="form-control"
          value={formData.email}
          disabled
        />
      </div>
      <div>
        <label htmlFor="phoneNo" className="form-label mb-2">
          Phone Number
        </label>
        <input
          type="mobile-number"
          id="phoneNo"
          className="mb-2 form-control"
          value={formData.phoneNo}
          onChange={handleChange}
          name="phoneNo"
        />
      </div>
      <button className="mb-2 btn btn-primary" onClick={() => updateProfile()}>
        {loading? "Updating ..." : "Update Profile"}
      </button>
      {
        message && 
        <div className={`alert ${message.includes("successfully") ? "alert-success": "alert-danger"}`}>
          {message}
          </div>
      }
    </div>
  );
};

export default EditProfileModal;
