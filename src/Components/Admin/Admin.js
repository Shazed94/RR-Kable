import React from "react";
import "./admin.css";

const Admin = () => {
  return (
    <>
      <div className="admin-container">
        <div className="admin-form-wrapper">
          <div className=" mt-4 mb-2 logo pb-5">
            <h3 className="fw-bolder letter">TRODAD</h3>
            {/* <img src={logo} alt="logo" /> */}
          </div>
          <p>Enter Your Login Details Here:</p>

          <form id="form" className="form" method="POST">
            <div className="form-control custom-form-control">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Enter email"
                className="rounded-pill"
              />
              <small>Error message</small>
            </div>
            <div className="form-control  custom-form-control">
              <label htmlFor="password">password</label>
              <input
                type="password"
                id="password"
                className="rounded-pill"
                placeholder="Enter password"
              />
              <small>Error message</small>
            </div>

            <button type="submit" className="rounded-0">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Admin;
