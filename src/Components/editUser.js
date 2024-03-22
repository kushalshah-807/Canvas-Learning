import React, { useState } from "react";
import "../css/signup.css";

import avatar from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { url2 } from "../globalUrl";

function EditUser() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const email = searchParams.get("email");
  const initialuser_id = searchParams.get("passemail");
  console.log("emai is ", initialuser_id);

  const initialUser = {
    first_name: searchParams.get("first_name"),
    last_name: searchParams.get("last_name"),
    email: searchParams.get("passemail"),
    password: searchParams.get("password"),
    role: searchParams.get("role"),
  };

  const [user, setUser] = useState(initialUser);

  const handleInputChange = (e) => {
    // Update the course state when input fields change
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("initialuser_id", initialuser_id);
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("role", user.role);

    fetch(`${url2}/editUser`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "User updated successfully") {
          Swal.fire("Success!", "User updated successfully", "success").then(
            (result) => {
              if (result.isConfirmed) {
                window.location.href = `/admin?email=${email}`;
              }
            }
          );
        } else {
          alert(data);
          Swal.fire("Oops!", "Failed to update User", "error").then(
            (result) => {
              if (result.isConfirmed) {
                window.location.href = `/admin?email=${email}`;
              }
            }
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire(
          "Oops!",
          "An error occurred while updating the course.",
          "error"
        ).then((result) => {
          if (result.isConfirmed) {
            // window.location.href = `/admin?email=${email}`;
          }
        });
      });
  };

  return (
    <div>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <link rel="stylesheet" href="../css/signup.css" />
          <title>Edit User</title>
        </head>
        <body className="signbody">
          <header>
            <img className="signuplogo" src={avatar} alt="skillbridge" />
          </header>
          <div className="signlogin-wrapper">
            <form
              onSubmit={handleFormSubmit}
              method="POST"
              className="signform"
            >
              <h3>Edit user</h3>
              <div className="signinput-group">
                <input
                  type="text"
                  name="first_name"
                  id="loginUser"
                  value={user.first_name}
                  onChange={handleInputChange}
                  required
                />
                <label for="loginUser">First Name</label>
              </div>
              <div className="signinput-group">
                <input
                  type="text"
                  name="last_name"
                  id="loginUser"
                  value={user.last_name}
                  onChange={handleInputChange}
                  required
                />
                <label for="loginUser">Last Name</label>
              </div>
              <div className="signinput-group">
                <input
                  type="text"
                  name="password"
                  id="loginUser"
                  value={user.password}
                  onChange={handleInputChange}
                  required
                />
                <label for="loginUser">Password</label>
              </div>
              <div className="signinput-group">
                <input
                  type="text"
                  name="role"
                  id="loginUser"
                  value={user.role}
                  onChange={handleInputChange}
                  required
                />
                <label for="loginUser">Role</label>
              </div>

              <div className="signinput-group">
                <input
                  type="text"
                  name="email"
                  id="loginUser"
                  value={user.email}
                  onChange={handleInputChange}
                  required
                />
                <label for="loginUser">Email</label>
              </div>

              <input
                type="submit"
                value="Continue"
                className="signsubmit-btn"
              />
              {/* <a href="login.html" className="signforgot-pw">Sign in instead</a> */}
              <Link to={`/admin?email=${email}`} className="signforgot-pw">
                Go Back
              </Link>
            </form>
          </div>
        </body>
      </html>
    </div>
  );
}

export default EditUser;
