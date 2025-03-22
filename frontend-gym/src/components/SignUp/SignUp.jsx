import { LuUsers } from "react-icons/lu";
import "./SignUp.css";
import { Link } from "react-router-dom";

const SignUp = () => {
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
          <form style={{ padding: "20px" , borderRadius: "10px"}}>
            <div>
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                // value={formData.name}
                // onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="form-label mt-2">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="you@example.com"
                // value={formData.email}
                // onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label mt-2">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Create a password"
                // value={formData.password}
                // onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="form-label mt-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                // value={formData.confirmPassword}
                // onChange={handleChange}
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="phoneNo" className="form-label mt-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phoneNo"
                name="phoneNo"
                placeholder="Enter your mobile number"
                pattern="[0-9]{10}"
                maxLength={10}
                // value={formData.phoneNo}
                // onChange={handleChange}
                required
              />
            </div>

            <div className="d-flex gap-3 justify-content-between">
              <div>
                <label htmlFor="dateOfBirth" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  //   value={formData.dateOfBirth}
                  //   onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-1">
                <label htmlFor="branch" className="form-label">
                  Branch
                </label>
                <select
                  id="branch"
                  name="branch"
                  className="form-select"
                  // value={formData.branch}
                  // onChange={handleChange}
                >
                  <option value="Gurgaon">Gurgaon</option>
                  <option value="Ahmedabad">Ahmedabad</option>
                  <option value="Chennai">Chennai</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-center mt-1">
              <button type="submit" className="btn btn-primary w-100">
                Sign Up
              </button>
            </div>
            <div className="d-flex justify-content-center mt-2">
              <span>
                Already have an account? <Link>Sign in</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
