import React, { useState } from "react";
import "../css/signup.css";

import avatar from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { url2 } from "../globalUrl";

function AddQA() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const email = searchParams.get("email");
  const [policyId, setPolicyId] = useState("");
  const [qaPolicies, setqaPolicies] = useState("");
  const [year, setYear] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(`${url2}/addPolicy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `policyId=${policyId}&qaPolicies=${qaPolicies}&year=${year}`,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "QA added successfully") {
          Swal.fire("Success!", "QA added successfully!", "success").then(
            (result) => {
              if (result.isConfirmed) {
                window.location.href = `/QAOrganizer?email=${email}`;
              }
            }
          );
        } else {
          alert(data);
          Swal.fire("Oops!", "Failed to add course", "error").then((result) => {
            if (result.isConfirmed) {
              window.location.href = `/QAOrganizer?email=${email}`;
            }
          });
        }
      })
      .catch((error) => {
        alert(error);
        console.error("Error:", error);
        Swal.fire(
          "Oops!",
          "An error occurred while registering the user.",
          "error"
        ).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `/QAOrganizer?email=${email}`;
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
          <title>Add Courses</title>
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
              <h3>Add Policies</h3>
              <div className="signinput-group">
                <input
                  type="text"
                  name="policyId" // Set the name attribute to "firstname"
                  id="loginUser"
                  onChange={(e) => setPolicyId(e.target.value)} // Extract and set the value
                  required
                />
                <label for="loginUser">Policy Id</label>
              </div>
              <div className="signinput-group">
                <input
                  type="text"
                  name="qaPolicies" // Set the name attribute to "lastname"
                  id="loginUser"
                  onChange={(e) => setqaPolicies(e.target.value)} // Extract and set the value
                  required
                />
                <label for="loginUser">QA Policies</label>
              </div>
              <div className="signinput-group">
                <input
                  type="text"
                  name="year" // Set the name attribute to "lastname"
                  id="loginUser"
                  onChange={(e) => setYear(e.target.value)} // Extract and set the value
                  required
                />
                <label for="loginUser">QA Year</label>
              </div>

              <input
                type="submit"
                value="Continue"
                className="signsubmit-btn"
              />
              {/* <a href="login.html" className="signforgot-pw">Sign in instead</a> */}
              <Link
                to={`/QAOrganizer?email=${email}`}
                className="signforgot-pw"
              >
                Go Back
              </Link>
            </form>
          </div>
        </body>
      </html>
    </div>
  );
}

export default AddQA;
