import React, { useState } from "react";
import "../css/signup.css";

import avatar from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { url2 } from "../globalUrl";

function EditQA() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const email = searchParams.get("email");
  const intialpolicyId = searchParams.get("policyId");
  console.log("email jsdjcf", intialpolicyId);

  const intialQA = {
    qaPolicies: searchParams.get("qaPolicies"),
    // email: searchParams.get("email"),
    year: searchParams.get("year"),
  };

  const [QA, setQA] = useState(intialQA);

  const handleInputChange = (e) => {
    // Update the course state when input fields change
    const { name, value } = e.target;
    setQA({
      ...QA,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("intialpolicyId", intialpolicyId);
    // formData.append("studentName", exam.studentName);
    formData.append("qaPolicies", QA.qaPolicies);
    formData.append("year", QA.year);

    fetch(`${url2}/editPolicy`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "QA updated successfully") {
          Swal.fire("Success!", "QA updated successfully!", "success").then(
            (result) => {
              if (result.isConfirmed) {
                window.location.href = `/QAOrganizer?email=${email}`;
              }
            }
          );
        } else {
          Swal.fire("Oops!", "Failed to update course", "error").then(
            (result) => {
              if (result.isConfirmed) {
                window.location.href = `/QAOrganizer?email=${email}`;
              }
            }
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire("Success!", "Policy Updated Successfully!", "success").then(
          (result) => {
            if (result.isConfirmed) {
              window.location.href = `/QAOrganizer?email=${email}`;
            }
          }
        );
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
          <title>Edit Quiz</title>
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
              <h3>Edit Policy</h3>
              <div className="signinput-group">
                <input
                  type="text"
                  name="qaPolicies"
                  id="loginUser"
                  value={QA.qaPolicies}
                  onChange={handleInputChange}
                  required
                />
                <label for="loginUser">QA Policies</label>
              </div>
              <div className="signinput-group">
                <input
                  type="text"
                  name="year"
                  id="loginUser"
                  value={QA.year}
                  onChange={handleInputChange}
                  required
                />
                <label for="loginUser">Year</label>
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

export default EditQA;
