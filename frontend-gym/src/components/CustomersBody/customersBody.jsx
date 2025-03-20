import { TiUserAdd } from "react-icons/ti";
import CustomersTable from "../CustomersTable/customersTable";
import { useEffect, useState } from "react";
import axios from "axios";
import AddCustomerModal from "../AddCustomerModal/addCustomerModal";
const CustomersBody = () => {
  const [message, setMessage] = useState("");
  const [customers, setCustomers] = useState([]);

  const getCustomers = async (e) => {
    const token = localStorage.getItem("token");
    // console.log(token)
    try {
      const response = await fetch("http://localhost:5000/api/customers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setCustomers(data.customers);
    } catch (error) {
      console.log(error);
      setMessage(error.response?.message);
    }
  };
  useEffect(() => {
    getCustomers();
  }, []);
  const [isDisplay, setIsDisplay] = useState(false);
  const openModal = () => {
    setIsDisplay(true);
  };
  const closeModal = () => {
    setIsDisplay(false);
  };
  return (
    <div className="container-fluid">
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ fontFamily: "sans-serif" }}
      >
        <div className="flex-column">
          <h2>Customers</h2>
          <span>Manage your gym customers</span>
        </div>
        <button type="button" className="btn btn-secondary" onClick={openModal}>
          <div className="d-flex justify-content-between gap-1">
            <TiUserAdd size={25} />
            <span>Add Customer</span>
          </div>
        </button>
      </div>
      <form className="d-flex pt-2 container-fluid" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <CustomersTable customers={customers} />
      {isDisplay && <AddCustomerModal closeModal={closeModal} />}
    </div>
  );
};

export default CustomersBody;
