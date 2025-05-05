import "./addCustomerModal.css";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FaCloudUploadAlt, FaSpinner } from "react-icons/fa";
import { useState } from "react";

const AddCustomerModal = ({ closeModal }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    branch: "",
    profilePicture: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(formData); // Debugging: Check if formData is updating correctly

      const response = await fetch(
        "http://localhost:5000/api/customers/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.status === 201) {
        setMessage("User Created Successfully");
        setTimeout(() => {
          closeModal();
          setMessage("");
        }, 3000);
      } else {
        setMessage(data.message || "Failed to create user");
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to create user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container animate__animated animate__fadeIn">
        <div className="modal-content p-4">
          <div className="modal-header d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="modal-title fw-bold mb-2">Add New Customer</h4>
              <p className="text-muted mb-0">Enter the customer details below</p>
            </div>
            <button
              className="btn-close-modal"
              onClick={closeModal}
              disabled={isLoading}
            >
              <IoMdClose size={24} />
            </button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {formData?.profilePicture && (
                <div className="text-center mb-4 animate__animated animate__fadeIn">
                  <div className="profile-preview">
                    <img
                      src={formData.profilePicture}
                      alt="Profile Preview"
                      className="preview-image"
                    />
                  </div>
                </div>
              )}

              <div className="upload-btn-wrapper mb-4">
                <label
                  htmlFor="profilePicture"
                  className="btn btn-outline-primary upload-btn"
                >
                  <FaCloudUploadAlt className="me-2" />
                  {formData?.profilePicture ? "Change Photo" : "Upload Photo"}
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  disabled={isLoading}
                />
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    />
                    <label htmlFor="name">Full Name</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    />
                    <label htmlFor="email">Email Address</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="tel"
                      className="form-control"
                      id="phoneNo"
                      name="phoneNo"
                      placeholder="Enter phone"
                      value={formData.phoneNo}
                      onChange={handleChange}
                      pattern="[0-9]{10}"
                      maxLength={10}
                      disabled={isLoading}
                      required
                    />
                    <label htmlFor="phoneNo">Phone Number</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="date"
                      className="form-control"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    />
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="height"
                      name="height"
                      placeholder="Enter height"
                      value={formData.height}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    />
                    <label htmlFor="height">Height (cm)</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="weight"
                      name="weight"
                      placeholder="Enter weight"
                      value={formData.weight}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    />
                    <label htmlFor="weight">Weight (kg)</label>
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-floating">
                    <select
                      className="form-select"
                      id="branch"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    >
                      <option value="">Select a branch</option>
                      <option value="Gurgaon">Gurgaon</option>
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Chennai">Chennai</option>
                    </select>
                    <label htmlFor="branch">Branch</label>
                  </div>
                </div>
              </div>

              <div className="modal-footer border-top pt-4 mt-4">
                <button
                  type="button"
                  className="btn btn-light btn-lg"
                  onClick={closeModal}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary btn-lg px-4 position-relative ${
                    isLoading ? "is-loading" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-text">Creating...</span>
                      <FaSpinner className="spinner-icon" />
                    </>
                  ) : (
                    "Add Customer"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;
