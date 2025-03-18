import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
const DeleteCustomerModal = ({customer, closeDeleteModal }) => {
  const customerId = customer.id;
  console.log(customerId)
  const [ message, setMessage ] = useState("");
    const deleteCustomer = async (customerId) => {
      // e.preventDefault();
      try {
        const response  = await fetch(`http://localhost:5000/api/customers/${customerId}`, {
          method: "DELETE",
          headers: {
            "Content-Type" : "application/json",
            "token" : localStorage.getItem("token")
          }
        })
        if(response.status === 204){
          setMessage("User deleted successfully")
        }
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div
      className="centered-content d-flex flex-column"
      style={{ fontWeight: "600" }}
    >
      <div className="d-flex">
        <span style={{ fontWeight: "bold" }}>Delete Customer</span>
        <Link onClick={closeDeleteModal} style={{ color: "grey" }}>
          <RxCross2 />
        </Link>
      </div>
        <div className="d-flex">
          <button type="button" class="btn btn-light">
            Cancel
          </button>
          <button type="button" class="btn btn-danger" onClick={() => deleteCustomer(customerId)}>
            Delete
          </button>
        </div>
    </div>
  );
};

export default DeleteCustomerModal;
