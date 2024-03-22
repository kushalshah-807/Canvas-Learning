import React, { useEffect, useState } from "react";
import "../css/signup.css";

import avatar from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { url2 } from "../globalUrl";

function AddCourses() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const [course_name, setCourseName] = useState("");
  const [course_id, setCourseId] = useState("");
  const [instructor_name, setInstructor] = useState("");
  const [course_period, setCoursePeriod] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [instructors2, setInstructors2] = useState([]);
  const [role, setRole] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(instructor_name);
    fetch(`${url2}/addCourse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `course_name=${course_name}&course_id=${course_id}&instructor_name=${instructor_name}&course_period=${course_period}`,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "Course added successfully") {
          Swal.fire("Success!", "Course added successfully!", "success").then(
            (result) => {
              if (result.isConfirmed) {
                if (name === null) {
                  window.location.href = `/admin?email=${email}`;
                } else {
                  window.location.href = `/instructor?email=${email}`;
                }
              }
            }
          );
        } else {
          alert(data);
          Swal.fire("Oops!", "Failed to add course", "error").then((result) => {
            if (result.isConfirmed) {
              if (name === null) {
                window.location.href = `/admin?email=${email}`;
              } else {
                window.location.href = `/instructor?email=${email}`;
              }
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire(
          "Oops!",
          "An error occurred while registering the user.",
          "error"
        ).then((result) => {
          if (result.isConfirmed) {
            if (name === null) {
              window.location.href = `/admin?email=${email}`;
            } else {
              window.location.href = `/instructor?email=${email}`;
            }
          }
        });
      });
  };

  useEffect(() => {
    fetch("https://sxt9335.uta.cloud/fetch_instructors.php")
      .then((response) => response.json())
      .then((data) => {
        setInstructors(data);
      })
      .catch((error) => {
        alert(error);
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    fetch("https://sxt9335.uta.cloud/fetch_instructors2.php")
      .then((response) => response.json())
      .then((data) => {
        setInstructors2(data);
      })
      .catch((error) => {
        alert(error);
        console.error("Error fetching data:", error);
      });
  }, []);

  const loadPrograms = async () => {
    fetch("https://sxt9335.uta.cloud/fetchRole.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${email}`,
    })
      .then((response) => response.text())
      .then((data) => {
        setRole(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    loadPrograms();
  }, []);

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
              <h3>Add Courses</h3>
              <div className="signinput-group">
                <input
                  type="text"
                  name="course_name" // Set the name attribute to "firstname"
                  id="loginUser"
                  onChange={(e) => setCourseName(e.target.value)} // Extract and set the value
                  required
                />
                <label for="loginUser">Course Name</label>
              </div>
              <div className="signinput-group">
                <input
                  type="text"
                  name="course_id" // Set the name attribute to "lastname"
                  id="loginUser"
                  onChange={(e) => setCourseId(e.target.value)} // Extract and set the value
                  required
                />
                <label for="loginUser">Course ID</label>
              </div>
              <div className="signselect-container">
                {name === null ? (
                  <select
                    name="instructor_name"
                    id="instructorSelect"
                    onChange={(e) => setInstructor(e.target.value)}
                  >
                    <option value="">Select an instructor</option>
                    {instructors.map((instructor, index) => (
                      <option
                        key={index}
                        value={`${instructor} ${instructors2[index]}`}
                      >
                        {instructor} {instructors2[index]}
                      </option>
                    ))}
                  </select>
                ) : (
                  <select
                    name="instructor_name"
                    id="instructorSelect"
                    onChange={(e) => setInstructor(e.target.value)}
                  >
                    <option value="">Select an instructor</option>
                    <option value={name}>{name}</option>
                  </select>
                )}
                <div className="signselect-arrow"></div>
              </div>

              <div className="signinput-group">
                <input
                  type="text"
                  name="course_period" // Set the name attribute to "lastname"
                  id="loginUser"
                  onChange={(e) => setCoursePeriod(e.target.value)} // Extract and set the value
                  required
                />
                <label for="loginUser">Course Period</label>
              </div>

              <input
                type="submit"
                value="Continue"
                className="signsubmit-btn"
              />

              {name === null ? (
                <Link to={`/admin?email=${email}`} className="signforgot-pw">
                  Go Back
                </Link>
              ) : (
                <Link
                  to={`/instructor?email=${email}`}
                  className="signforgot-pw"
                >
                  Go Back
                </Link>
              )}
            </form>
          </div>
        </body>
      </html>
    </div>
  );
}

export default AddCourses;
