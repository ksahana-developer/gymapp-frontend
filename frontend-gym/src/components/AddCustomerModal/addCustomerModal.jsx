import "./addCustomerModal.css";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const AddCustomerModal = ({ closeModal }) => {
  return (
    <div
      className="centered-content d-flex flex-column"
      style={{ fontWeight: "600" }}
    >
      <div className="d-flex mb-2 justify-content-between">
        <div className="d-flex flex-column">
          <span style={{ fontWeight: "bold" }}>Add New Customer</span>
          <span>Enter the details for the new customer.</span>
        </div>
        <Link onClick={closeModal} style={{ color: "grey" }}>
          <RxCross2 />
        </Link>
      </div>
      <form>
        <div className="mb-2">
          <label for="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="name" />
        </div>
        <div className="mb-2">
          <label for="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-2">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-2">
          <label for="mobile-number" className="form-label">
            Phone Number
          </label>
          <input type="number" className="form-control" id="mobile-number" />
        </div>
        <div className="d-flex gap-3">
          <div className="mb-2">
            <label for="age" className="form-label">
              Date of Birth
            </label>
            <input type="number" className="form-control" id="age" />
          </div>
          <div class="mb-2">
            <label for="disabledSelect" class="form-label">
              Role
            </label>
            <select id="disabledSelect" class="form-select">
              <option>Admin</option>
              <option>Member</option>
            </select>
          </div>
        </div>
        <div class="mb-2">
          <label for="disabledSelect" class="form-label">
            Branch
          </label>
          <select id="disabledSelect" class="form-select">
            <option>Gurgaon</option>
            <option>Ahmedabad</option>
            <option>Chennai</option>
          </select>
        </div>
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            Add Customer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCustomerModal;
