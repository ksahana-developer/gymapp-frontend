import { TiUserAdd } from "react-icons/ti";
import CustomersTable from "../CustomersTable/customersTable";
import { useState } from "react";
import AddCustomerModal from "../AddCustomerModal/addCustomerModal";
const CustomersBody = () => {
    const [customers, setCustomers] = useState([
        {
            name: "Harsha",
            email : "test123@gmail.com",
            phoneNo: "(555) 123-4567",
            startDate : "1/15/2023",
            status: "Active",
        },
        {
            name: "Chaitanya",
            email : "test123@gmail.com",
            phoneNo: "(555) 123-4567",
            startDate : "1/15/2023",
            status: "Active",
        },
        {
            name: "Mohi",
            email : "test123@gmail.com",
            phoneNo: "(555) 123-4567",
            startDate : "1/15/2023",
            status: "Active",
        },
        {
            name: "Sainath",
            email : "test123@gmail.com",
            phoneNo: "(555) 123-4567",
            startDate : "1/15/2023",
            status: "Inactive",
        },
        {
            name: "Cbum",
            email : "test123@gmail.com",
            phoneNo: "(555) 123-4567",
            startDate : "1/15/2023",
            status: "Active",
        },
        {
            name: "Saahana",
            email : "test1111@gmail.com",
            phoneNo: "(555) 123-4567",
            startDate : "1/15/2023",
            status: "Expired",
        }
    ]);
    const [ isDisplay, setIsDisplay] = useState(false)
    const openModal = () => {
        setIsDisplay(true)
    }
    const closeModal = () => {
        setIsDisplay(false)
    }
   return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center" style={{fontFamily:"sans-serif"}}>
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
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
      <CustomersTable customers= {customers} />
        {isDisplay && <AddCustomerModal closeModal= {closeModal}/>}
    </div>
    
  );
};

export default CustomersBody;
