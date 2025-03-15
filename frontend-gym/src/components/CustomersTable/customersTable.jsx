import { Link } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

const CustomersTable = ({ customers }) => {
  const getStyleByStatus = (status) => {
    switch (status) {
      case "Active":
        return {
          background: "#d4edda", // Light green
          color: "green",
        };
      case "Inactive":
        return {
          background: "#f8d7da", // Light red
          color: "red",
        };
      case "Expired":
        return {
          background: "#e2e3e5", // Light grey
          color: "#6c757d", // Dark grey text
        };
    }
  };
  return (
    <div
      className="container-fluid"
      style={{ border: "1px solid #ddd", margin: "12px" }}
    >
      <table class="table">
        <thead>
          <tr>
            <th style={{ fontWeight: "200" }} scope="col">
              Name
            </th>
            <th style={{ fontWeight: "200" }} scope="col">
              Email
            </th>
            <th style={{ fontWeight: "200" }} scope="col">
              Phone
            </th>
            <th style={{ fontWeight: "200" }} scope="col">
              Start Date
            </th>
            <th style={{ fontWeight: "200" }} scope="col">
              Status
            </th>
            <th style={{ fontWeight: "200" }} scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr style={{ fontFamily: "sans-serif", fontSize: "14px" }}>
              <td
                style={{
                  fontWeight: "bold",
                  fontFamily: "sans-serif",
                  padding: "16px",
                }}
              >
                <div className="d-flex align-items-start">
                  <div>
                    <FaUserLarge />
                  </div>
                  <div>{customer.name}</div>
                </div>
              </td>
              <td style={{ padding: "16px" }}>{customer.email}</td>
              <td style={{ padding: "16px" }}>{customer.phoneNo}</td>
              <td style={{ padding: "16px" }}>{customer.startDate}</td>
              <td style={{ padding: "16px" }}>
                <div
                  className="text-center"
                  style={{
                    ...getStyleByStatus(customer.status),
                    width: "60px",
                    height: "20px",
                    borderRadius: "20px",
                  }}
                >
                  {customer.status}
                </div>
              </td>
              <td style={{ padding: "16px" }}>
                <div className="d-flex gap-2">
                  <Link>
                    <CiEdit style={{color:"black"}}/>
                  </Link>
                  <Link>
                  <MdDeleteOutline style={{color:"red"}}/>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      ;
    </div>
  );
};

export default CustomersTable;
