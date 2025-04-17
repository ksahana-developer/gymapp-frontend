import { TiUserAdd } from "react-icons/ti";
import CustomersTable from "../CustomersTable/customersTable";
import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddCustomerModal from "../AddCustomerModal/addCustomerModal";
import "./customersBody.css"

const CustomersBody = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState("");
  const [customers, setCustomers] = useState([]);
  const [custBookmark, setCustBookmark] = useState(null)

  const checkAdmin = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/customers/isAdmin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token")
        }
      })
      console.log(response)
      const data = await response.json()
      console.log(data)
      if(!data.isAdmin){
        navigate("/subscriptions")
      }
    } catch (error) {
      console.log(error)
    }
  }


  const getCustomers = async (e) => {
    const token = localStorage.getItem("token");
    try {
      const baseUrl = 'http://localhost:5000/api/customers';
      const queryParams = {
        nextBookmark: custBookmark
      };

      const url = new URL(baseUrl);
      if (custBookmark !== null) {
        Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        }
      });
      const data = await response.json();
      setCustomers([...customers, ...data.customers]);
      setCustBookmark(data?.nextBookmark)
      console.log(data)
    } catch (error) {
      console.log(error);
      setMessage(error.response?.message);
    }
  };
  useEffect(() => {
    checkAdmin()
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
     {custBookmark!== undefined && <div className="d-flex justify-content-end load-more">
        <button onClick={getCustomers} className="btn btn-primary">Load More</button>
      </div>}
      {custBookmark === undefined && <p className="text-secondary"> Have reached the end of results </p>}
      {isDisplay && <AddCustomerModal closeModal={closeModal} />}
    </div>
  );
};

export default CustomersBody;
