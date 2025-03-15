import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
const DeleteCustomerModal = ({customer, closeDeleteModal }) => {
    const deleteCustomer = () => {
        return{
            
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
          <button type="button" class="btn btn-danger" onClick={deleteCustomer}>
            Delete
          </button>
        </div>
    </div>
  );
};

export default DeleteCustomerModal;
