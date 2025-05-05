import { Link } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { FaEye, FaEdit, FaTrash} from 'react-icons/fa';
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import EditCustomerModal from "../EditCustomerModal/EditCustomerModal";
import DeleteCustomerModal from "../DeleteCustomerModal/DeleteCustomerModal";
import './customersTable.css';

const CustomersTable = ({ customers, setFetchCustomers, fetchCustomers }) => {
  const [isDisplayEdit, setIsDisplayEdit] = useState(false);
  const [isDisplayDelete, setIsDisplayDelete] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const openEditModal = (customer) => {
    if (!isDisplayDelete) {
      setSelectedCustomer(customer);
      setIsDisplayEdit(true);
    }
  };

  const closeEditModal = () => {
    setIsDisplayEdit(false);
    setSelectedCustomer(null);
  };

  const openDeleteModal = (customer) => {
    if (!isDisplayEdit) {
      setSelectedCustomer(customer);
      setIsDisplayDelete(true);
    }
  };

  const closeDeleteModal = () => {
    setIsDisplayDelete(false);
    setSelectedCustomer(null);
  };

  return (
    <div className="table-responsive customers-table-wrapper animate__animated animate__fadeIn">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th scope="col" className="py-3">Name</th>
            <th scope="col" className="py-3">Email</th>
            <th scope="col" className="py-3">Phone</th>
            <th scope="col" className="py-3">Status</th>
            <th scope="col" className="py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="customer-row animate__animated animate__fadeInUp">
              <td className="py-3">
                <div className="d-flex align-items-center">
                  <div className="customer-avatar">
                    <FaUserLarge />
                  </div>
                  <div className="ms-3 customer-name">
                    {customer.name}
                  </div>
                </div>
              </td>
              <td className="py-3">
                <div className="customer-info">
                  <i className="bi bi-envelope me-2"></i>
                  {customer.email}
                </div>
              </td>
              <td className="py-3">
                <div className="customer-info">
                  <i className="bi bi-telephone me-2"></i>
                  {customer.phoneNo}
                </div>
              </td>
              <td className="py-3">
                <span className={`status-badge ${customer.status?.toLowerCase()}`}>
                  {customer.status}
                </span>
              </td>
              <td className="py-3">
                <div className="action-buttons">
                  <Link 
                    to={`/customer/${customer.id}`}
                    className="btn btn-sm btn-outline-primary action-btn"
                    title="View Details"
                  >
                    View
                  </Link>
                  <button 
                    className="btn btn-sm btn-outline-info action-btn"
                    onClick={() => openEditModal(customer)}
                    title="Edit Customer"
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger action-btn"
                    onClick={() => openDeleteModal(customer)}
                    title="Delete Customer"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {customers.length === 0 && (
        <div className="text-center py-5 empty-state animate__animated animate__fadeIn">
          <div className="empty-state-icon mb-3">
            <FaUserLarge size={40} />
          </div>
          <h5>No Customers Found</h5>
          <p className="text-muted mb-0">There are no customers to display at the moment.</p>
        </div>
      )}

      {isDisplayEdit && (
        <EditCustomerModal 
          customer={selectedCustomer} 
          closeEditModal={closeEditModal} 
          setFetchCustomers={setFetchCustomers} 
          fetchCustomers={fetchCustomers} 
        />
      )}
      
      {isDisplayDelete && (
        <DeleteCustomerModal 
          customer={selectedCustomer} 
          closeDeleteModal={closeDeleteModal} 
        />
      )}
    </div>
  );
};

export default CustomersTable;
