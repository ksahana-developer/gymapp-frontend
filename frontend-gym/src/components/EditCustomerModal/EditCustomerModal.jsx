import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import "./EditCustomerModal.css";
import { useEffect, useState } from "react";

const EditCustomerModal = ({ customer, closeEditModal }) => {
  const [message, setMessage] = useState("")
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
  }, [customer]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const customerId = customer.id;
  const updateUser = async (customerId, updatedFormData) => {
    console.log(customerId, "12344")
    console.log(updatedFormData, "data")
    // e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/customers/${customerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
          body: JSON.stringify(updatedFormData)
        }
      )
      const data = await response.json()
      if (response.status == 200) {
        setMessage("User updated successfully");
        setTimeout(() => {
          setMessage("");
          closeEditModal();
        }, 3000);
      } else {
        setMessage("User update failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="centered-content d-flex flex-column"
      style={{ fontWeight: "600" }}
    >
      <div className="d-flex mb-2 justify-content-between">
        <div className="d-flex flex-column">
          <span style={{ fontWeight: "bold" }}>Edit Customer</span>
          {/* <span>Enter the details for the new customer.</span> */}
        </div>
        <Link onClick={closeEditModal} style={{ color: "grey" }}>
          <RxCross2 />
        </Link>
      </div>
      {/* <form> */}
        <div className="mb-2">
          <label for="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-2">
          <label for="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div className="mb-2">
          <label for="mobile-number" className="form-label">
            Phone Number
          </label>
          {/* change from text to number later */}
          <input
            type="text"
            name="phoneNo"
            className="form-control"
            id="mobile-number"
            onChange={handleChange}
            value={formData.phoneNo}
          />
        </div>
        <div className="d-flex gap-3">
          <div className="mb-2">
            <label for="age" className="form-label">
              Date of Birth
            </label>
            {/* change from text to number later */}
            <input
              type="text"
              className="form-control"
              id="age"
              name="dateOfBirth"
              onChange={handleChange}
              value={formData.dateOfBirth}
            />
          </div>
          <div class="mb-2">
            <label for="disabledSelect" class="form-label">
              Role
            </label>
            <select
              id="disabledSelect"
              class="form-select"
              name="role"
              onChange={handleChange}
              value={formData.role}
            >
              <option>Admin</option>
              <option>Member</option>
            </select>
          </div>
        </div>
        <div class="mb-2">
          <label for="disabledSelect" class="form-label">
            Branch
          </label>
          <select
            id="disabledSelect"
            class="form-select"
            name="branch"
            onChange={handleChange}
            value={formData.branch}
          >
            <option>Gurgaon</option>
            <option>Ahmedabad</option>
            <option>Chennai</option>
          </select>
        </div>
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" onClick={() => updateUser(customerId, formData)}>
            Edit Customer
          </button>
        </div>
      {/* </form> */}
      {message && (
        <div
          className={`alert ${message.includes(
            "successfully"
          )? "alert-success" : "alert-danger"}`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default EditCustomerModal;
