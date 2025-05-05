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
  const [fetchCustomers, setFetchCustomers] = useState(false)
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
  useEffect(() => {
    if(fetchCustomers){
      getCustomers()
    }
    setFetchCustomers(false)
  }, [fetchCustomers])
  const [isDisplay, setIsDisplay] = useState(false);
  const openModal = () => {
    setIsDisplay(true);
  };
  const closeModal = () => {
    setIsDisplay(false);
  };
  return (
    <div className="customers-container animate__animated animate__fadeIn">
      <div className="customers-header py-4 mb-4">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="header-content animate__animated animate__fadeInLeft">
                <h2 className="display-5 fw-bold text-primary mb-2">Customers</h2>
                <p className="text-muted lead">Manage your gym customers effectively</p>
              </div>
            </div>
            <div className="col-lg-6 d-flex justify-content-lg-end mt-3 mt-lg-0">
              <button 
                type="button" 
                onClick={openModal}
                className="btn btn-primary btn-lg d-flex align-items-center gap-2 animate__animated animate__fadeInRight"
              >
                <TiUserAdd className="add-icon" size={25} />
                <span>Add Customer</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid customers-content">
        <div className="search-section mb-4 animate__animated animate__fadeInUp">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <form className="search-form d-flex gap-2" role="search">
                <input 
                  className="form-control form-control-lg shadow-sm" 
                  type="search" 
                  placeholder="Search customers..." 
                  aria-label="Search"
                />
                <button className="btn btn-primary px-4" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="table-section animate__animated animate__fadeInUp animation-delay-1">
          <CustomersTable 
            customers={customers} 
            setFetchCustomers={setFetchCustomers} 
            fetchCustomers={fetchCustomers} 
          />
        </div>

        {custBookmark !== undefined && (
          <div className="d-flex justify-content-center mt-4 mb-5 animate__animated animate__fadeInUp animation-delay-2">
            <button 
              onClick={getCustomers} 
              className="btn btn-outline-primary btn-lg load-more-btn"
            >
              Load More
            </button>
          </div>
        )}
        
        {custBookmark === undefined && (
          <p className="text-center text-muted mt-4 end-message animate__animated animate__fadeIn">
            You've reached the end of the results
          </p>
        )}
      </div>

      {isDisplay && <AddCustomerModal closeModal={closeModal} />}
    </div>
  );
};

export default CustomersBody;
