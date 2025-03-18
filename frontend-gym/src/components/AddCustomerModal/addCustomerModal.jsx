import "./addCustomerModal.css";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

const AddCustomerModal = ({ closeModal }) => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
    dateOfBirth: "",
    role: "Member", // Set default value
    branch: "Gurgaon", // Set default value
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerCustomer = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

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
    }
  };

  return (
    <div
      className="centered-content d-flex flex-column"
      style={{ fontWeight: "600", fontSize: "14px" }}
    >
      <div className="d-flex mb-1 justify-content-between">
        <div className="d-flex flex-column">
          <span style={{ fontWeight: "bold" }}>Add New Customer</span>
          <span>Enter the details for the new customer.</span>
        </div>
        <Link onClick={closeModal} style={{ color: "grey" }}>
          <RxCross2 />
        </Link>
      </div>

      <form onSubmit={registerCustomer}>
        <div>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="phoneNo" className="form-label">
            Phone Number
          </label>
          <input
            type="number"
            className="form-control"
            id="phoneNo"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex gap-3">
          <div>
            <label htmlFor="dateOfBirth" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-1">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Admin">Admin</option>
              <option value="Member">Member</option>
            </select>
          </div>
        </div>

        <div className="mb-1">
          <label htmlFor="branch" className="form-label">
            Branch
          </label>
          <select
            id="branch"
            name="branch"
            className="form-select"
            value={formData.branch}
            onChange={handleChange}
          >
            <option value="Gurgaon">Gurgaon</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            Add Customer
          </button>
        </div>
      </form>

      {message && (
        <div
          className={`alert ${
            message.includes("successfully") ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default AddCustomerModal;
