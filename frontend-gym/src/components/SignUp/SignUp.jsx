import { LuUsers } from "react-icons/lu";
import "./SignUp.css";
import { FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { HiOutlineEye } from "react-icons/hi2";
import { HiOutlineEyeOff } from "react-icons/hi";
import { FaPhone } from "react-icons/fa6";

const SignUp = () => {
  const [passwordIcon, setPasswordIcon] = useState(false);
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
    dateOfBirth: "",
    role: "Member",
    branch: "Gurgaon",
    profilePicture: "",
    height: "",
    weight: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result });
        console.log(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
        localStorage.setItem("token", data.token);
        console.log(data);
        localStorage.setItem("customer", JSON.stringify(data.customer));
        setMessage("Sign up successfull");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNo: "",
          dateOfBirth: "",
          role: "Member",
          branch: "Gurgaon",
          profilePicture: null,
          height: "",
          weight: "",
        });
        e.target.reset();
        setTimeout(() => setMessage(""), 3000);
        navigate("/");
      } else {
        setMessage(data.message || "Sign up failed");
      }
    } catch (error) {
      console.log(error);
      setMessage("Failed to signUp");
    }
  };

  return (
    <div className="signup-wrapper min-vh-100 d-flex align-items-center justify-content-center">
      <div className="signup-card animate__animated animate__fadeIn">
        <div className="text-center mb-4 animate__animated animate__fadeInDown">
          <div className="logo-container mb-3">
            <LuUsers className="logo-icon" />
          </div>
          <h2 className="fw-bold text-primary">Join Chetak Gym</h2>
          <p className="text-muted">Start your fitness journey with us</p>
        </div>

        <div className="form-container">
          <form onSubmit={signUpCustomer} className="registration-form">
            {formData?.profilePicture && (
              <div className="profile-preview mb-3 animate__animated animate__fadeIn">
                <img
                  src={formData?.profilePicture}
                  alt="Profile"
                  className="profile-image"
                />
              </div>
            )}

            <div className="upload-btn-wrapper mb-4">
              <label htmlFor="userProfilePic" className="btn btn-outline-primary upload-btn">
                <i className="bi bi-cloud-upload me-2"></i>
                {!formData?.profilePicture ? "Upload Profile Picture" : "Update Picture"}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="userProfilePic"
                name="profilePicture"
              />
            </div>

            <div className="row g-3">
              <div className="col-12">
                <label className="form-label">Full Name</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FiUser />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="col-12">
                <label className="form-label">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <MdAlternateEmail />
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={passwordIcon ? "password" : "text"}
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    required
                  />
                  <button
                    type="button"
                    className="input-group-text btn-eye"
                    onClick={() => setPasswordIcon(!passwordIcon)}
                  >
                    {passwordIcon ? <HiOutlineEye /> : <HiOutlineEyeOff />}
                  </button>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Confirm Password</label>
                <div className="input-group">
                  <input
                    type={confirmPasswordIcon ? "password" : "text"}
                    className="form-control"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    required
                  />
                  <button
                    type="button"
                    className="input-group-text btn-eye"
                    onClick={() => setConfirmPasswordIcon(!confirmPasswordIcon)}
                  >
                    {confirmPasswordIcon ? <HiOutlineEye /> : <HiOutlineEyeOff />}
                  </button>
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FaPhone />
                  </span>
                  <input
                    type="tel"
                    className="form-control"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Height (cm)</label>
                <input
                  type="number"
                  className="form-control"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  min="0"
                  max="300"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Weight (kg)</label>
                <input
                  type="number"
                  className="form-control"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label">Branch</label>
                <select
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

              <div className="col-12">
                <button type="submit" className="btn btn-primary w-100 py-2 mt-3">
                  Create Account
                </button>
              </div>

              <div className="col-12 text-center mt-3">
                <span className="text-muted">
                  Already have an account? <Link to="/login" className="text-primary text-decoration-none">Sign in</Link>
                </span>
              </div>
            </div>
          </form>

          {message && (
            <div className={`alert ${message.includes("successfull") ? "alert-success" : "alert-danger"} mt-3 animate__animated animate__fadeIn`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
