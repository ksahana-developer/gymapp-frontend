import { LuUsers } from "react-icons/lu";
import "./SignUp.css";
import { FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlineEyeOff } from "react-icons/hi";
import { FaPhone } from "react-icons/fa6";
// import registerCustomer from "../AddCustomerModal/addCustomerModal"

const SignUp = () => {
  const [passwordIcon, setPasswordIcon] = useState(false)
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(false)
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
    dateOfBirth: "",
    role: "Member", // Set default value
    branch: "Gurgaon", // Set default value
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signUpCustomer = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Enter the same password");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:5000/api/customers/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.status === 201) {
        setMessage("Sign up successfull");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNo: "",
          dateOfBirth: "",
          role: "Member", // Set default value
          branch: "Gurgaon", // Set default value
        });
        e.target.reset();
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(data.message || "Sign up failed");
      }
    } catch (error) {
      console.log(error);
      setMessage("Failed to signUp");
    }
  };

  return (
    <div className="d-flex flex-column p-3 align-items-center">
      <div
        style={{ background: "white", width: "40%" }}
        className="d-flex align-items-center flex-column"
      >
        <div className="d-flex flex-column align-items-center">
          <div style={{ borderRadius: "5px", background: "" }}>
            <LuUsers style={{ color: "#0d6efd" }} size={40} />
          </div>
          <h1>Create your account</h1>
        </div>
        <p>Sign up to get started with your journey with us</p>
        <div
          className="d-flex flex-column shadow p-3 mb-5 bg-white rounded"
          style={{ width: "90%", padding: "20px", borderRadius: "5px" }}
        >
          <form
            style={{ padding: "15px", borderRadius: "10px" }}
            onSubmit={signUpCustomer}
          >
              <div className="container">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
                <div className="input-group">
                  <span className="input-group-text" style={{backgroundColor: "white"}}>
                    <FiUser />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

            <div className="container">
            <label htmlFor="email" className="form-label mt-2">
                Email Address
              </label>
              <div className="input-group">
                <span className="input-group-text" style={{backgroundColor: "white"}}>
                <MdAlternateEmail />
                </span>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
                </div>
              </div>

            <div className="container">
              <label htmlFor="password" className="form-label mt-2">
                Password
              </label>
              <div className="input-group">
                <input
                type={passwordIcon? "password" : "text"}
                className="form-control"
                id="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button className="input-group-text" style={{backgroundColor: "white"}} onClick={() => setPasswordIcon(!passwordIcon)}>
              {passwordIcon? <HiOutlineEye /> : <HiOutlineEyeOff />}
                    </button>
              </div>
            </div>

            <div className="container">
              <label htmlFor="confirmPassword" className="form-label mt-2">
                Confirm Password
              </label>
              <div className="input-group">
              <input
                type= {confirmPasswordIcon? "password" : "text"}
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button className="input-group-text" style={{backgroundColor: "white"}} onClick={() => setConfirmPasswordIcon(!confirmPasswordIcon)}>
                {confirmPasswordIcon? <HiOutlineEye /> : <HiOutlineEyeOff/>}
              </button>
              </div>
            </div>

            <div className="container">
              <label htmlFor="phoneNo" className="form-label mt-2">
                Phone Number
              </label>
              <div className="input-group">
                <span className="input-group-text" style={{backgroundColor: "white"}}> 
                <FaPhone />
                </span>
              <input
                type="tel"
                className="form-control"
                id="phoneNo"
                name="phoneNo"
                placeholder="Enter your mobile number"
                pattern="[0-9]{10}"
                maxLength={10}
                value={formData.phoneNo}
                onChange={handleChange}
                required
              />
              </div>
              
            </div>

            <div className="container cursor-pointer">
              <div>
                <label htmlFor="dateOfBirth" className="form-label mt-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="container mb-3">
                <label htmlFor="branch" className="form-label mt-2">
                  Branch
                </label>
                <select
                  id="branch"
                  name="branch"
                  className="form-select"
                  value={formData.branch}
                  onChange={handleChange}
                >
                  <option value="Gurgaon">Gurgaon</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Chennai">Chennai</option>
                </select>
              </div>

            <div className="d-flex justify-content-center mt-1">
              <button type="submit" className="btn btn-primary w-100">
                Sign Up
              </button>
            </div>
            <div className="d-flex justify-content-center mt-2">
              <span>
                Already have an account? <Link to="/login">Sign in</Link>
              </span>
            </div>
          </form>
          {message && (
            <div
              className={`alert ${
                message.includes("successfull")
                  ? "alert-success"
                  : "alert-danger"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
