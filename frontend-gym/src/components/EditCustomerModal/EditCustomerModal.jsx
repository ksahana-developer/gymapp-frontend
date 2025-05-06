import { IoMdClose } from "react-icons/io";
import "./EditCustomerModal.css";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const EditCustomerModal = ({ customer, closeEditModal, setFetchCustomers, fetchCustomers }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (customer) {
      setFormData({
        id: customer.id || "",
        name: customer.name || "",
        email: customer.email || "",
        phoneNo: customer.phoneNo || "",
        startDate: customer.startDate || "",
        status: customer.status || "",
        branch: customer.branch || "",
        dateOfBirth: customer.dateOfBirth || "",
        role: customer.role || "",
      });
    }
  }, [customer, fetchCustomers]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const customerId = customer.id;

  const updateUser = async (customerId, updatedFormData) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/customers/${customerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify(updatedFormData),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        setMessage("User updated successfully");
        setTimeout(() => {
          setMessage("");
          closeEditModal();
        }, 3000);
        setFetchCustomers(true);
      } else {
        setMessage("User update failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container animate__animated animate__fadeIn">
        <div className="modal-content p-4">
          <div className="modal-header d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="modal-title fw-bold mb-2">Edit Customer</h4>
              <p className="text-muted mb-0">Update customer information</p>
            </div>
            <button
              className="btn-close-modal"
              onClick={closeEditModal}
              disabled={loading}
            >
              <IoMdClose size={24} />
            </button>
          </div>

          <div className="modal-body">
            <form className="row g-3">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    disabled
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
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    disabled
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
                    value={formData.phoneNo}
                    onChange={handleChange}
                    placeholder="Enter phone"
                    disabled
                  />
                  <label htmlFor="phoneNo">Phone Number</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    placeholder="Enter date of birth"
                    disabled
                  />
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Member">Member</option>
                  </select>
                  <label htmlFor="role">Role</label>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-floating">
                  <select
                    className="form-select"
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    disabled={loading}
                  >
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                  <label htmlFor="branch">Branch</label>
                </div>
              </div>
            </form>

            {message && (
              <div
                className={`alert ${
                  message.includes("successfully")
                    ? "alert-success"
                    : "alert-danger"
                } mt-3 animate__animated animate__fadeIn`}
              >
                {message}
              </div>
            )}
          </div>

          <div className="modal-footer border-top pt-4 mt-3">
            <button
              type="button"
              className="btn btn-light btn-lg"
              onClick={closeEditModal}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`btn btn-primary btn-lg px-4 position-relative ${
                loading ? "is-loading" : ""
              }`}
              onClick={() => updateUser(customerId, formData)}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-text">Updating...</span>
                  <FaSpinner className="spinner-icon" />
                </>
              ) : (
                "Update Customer"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCustomerModal;
