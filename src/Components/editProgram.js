import React, { useState } from "react";
import "../css/signup.css";

import avatar from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { url2 } from "../globalUrl";

function EditProgram() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const email = searchParams.get("email");
  const initialprogram_id = searchParams.get("programName");
  // const course_name = searchParams.get("course_name");
  // const course_id = searchParams.get("course_id");
  // const instructor_name = searchParams.get("instructor_name");
  // const course_period = searchParams.get("course_period");

  const initialProgram = {
    programName: searchParams.get("programName"),
    programDescription: searchParams.get("programDescription"),
    programOrganizer: searchParams.get("programOrganizer"),
    startDate: searchParams.get("startDate"),
    endDate: searchParams.get("endDate"),
  };

  const [program, setProgram] = useState(initialProgram);

  const handleInputChange = (e) => {
    // Update the course state when input fields change
    const { name, value } = e.target;
    setProgram({
      ...program,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("initialprogram_id", initialprogram_id);
    formData.append("programName", program.programName);
    formData.append("programDescription", program.programDescription);
    formData.append("programOrganizer", program.programOrganizer);
    formData.append("startDate", program.startDate);
    formData.append("endDate", program.endDate);

    fetch(`${url2}/editProgram`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "Program updated successfully") {
          Swal.fire(
            "Success!",
            "Program updated successfully!",
            "success"
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.href = `/admin?email=${email}`;
            }
          });
        } else {
          Swal.fire("Oops!", "Failed to update course", "error").then(
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
          // if (result.isConfirmed) {
          //   window.location.href = `/admin?email=${email}`;
          // }
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
          <title>Edit Program</title>
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
              <h3>Edit Program</h3>
              <div className="signinput-group">
                <input
                  type="text"
                  name="programName"
                  id="loginUser"
                  value={program.programName}
                  onChange={handleInputChange}
                  required
                />
                <label for="loginUser">Program Name</label>
              </div>
              <div className="signinput-group">
                <input
                  type="text"
                  name="programDescription"
                  id="loginUser"
                  value={program.programDescription}
                  onChange={handleInputChange}
                  required
                />
                <label for="loginUser">Program Description</label>
              </div>
              <div className="signinput-group">
                <input
                  type="text"
                  name="programOrganizer"
                  id="loginUser"
                  value={program.programOrganizer}
                  onChange={handleInputChange}
                  required
                />
                <label for="loginUser">Program Organizer</label>
              </div>
              <div className="signinput-group">
                <input
                  type="date"
                  name="startDate"
                  id="loginUser"
                  value={program.startDate}
                  onChange={handleInputChange}
                  required
                />
                <label for="loginUser">Start Date</label>
              </div>

              <div className="signinput-group">
                <input
                  type="date"
                  name="endDate"
                  id="loginUser"
                  value={program.endDate}
                  onChange={handleInputChange}
                  required
                />
                <label for="loginUser">End Date</label>
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

export default EditProgram;
