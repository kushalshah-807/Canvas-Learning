import React, { useState, useEffect } from "react";
import "../css/signup.css";

import avatar from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { url2 } from "../globalUrl";

function EditCourse() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const role = searchParams.get("role");
  const initialcourse_id = searchParams.get("course_id");
  const [instructor_name, setInstructor] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [instructors2, setInstructors2] = useState([]);

  const initialCourse = {
    course_name: searchParams.get("course_name"),
    course_id: searchParams.get("course_id"),
    instructor_name: searchParams.get("instructor_name"),
    course_period: searchParams.get("course_period"),
  };

  const [course, setCourse] = useState(initialCourse);

  const handleInputChange = (e) => {
    // Update the course state when input fields change
    const { name, value } = e.target;
    setCourse({
      ...course,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("initialcourse_id", initialcourse_id);
    formData.append("course_id", course.course_id);
    formData.append("course_name", course.course_name);
    formData.append("instructor_name", course.instructor_name);
    formData.append("course_period", course.course_period);
    fetch(`${url2}/editCourse`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "Course updated successfully") {
          Swal.fire("Success!", "Course updated successfully!", "success").then(
            (result) => {
              if (result.isConfirmed) {
                if (role === "admin") {
                  window.location.href = `/admin?email=${email}`;
                } else {
                  window.location.href = `/instructor?email=${email}`;
                }
              }
            }
          );
        } else {
          alert(data);
          Swal.fire("Oops!", "Failed to update course", "error").then(
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
          <title>Edit Courses</title>
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
              <h3>Edit Courses</h3>
              <div className="signinput-group">
                <input
                  type="text"
                  name="course_name"
                  id="loginUser"
                  value={course.course_name}
                  onChange={handleInputChange}
                  required
                />
                <label for="loginUser">Course Name</label>
              </div>
              <div className="signinput-group">
                <input
                  type="text"
                  name="course_id"
                  id="loginUser"
                  value={course.course_id}
                  onChange={handleInputChange}
                  required
                />
                <label for="loginUser">Course ID</label>
              </div>
              <div className="signselect-container">
                {name === null ? (
                  <select
                    name="instructor_name"
                    id="instructorSelect"
                    onChange={handleInputChange}
                  >
                    <option value={course.instructor_name}>
                      {course.instructor_name}
                    </option>
                    {instructors.map(
                      (instructor, index) =>
                        course.instructor_name !==
                          `${instructor} ${instructors2[index]}` && (
                          <option
                            key={index}
                            value={`${instructor} ${instructors2[index]}`}
                          >
                            {instructor} {instructors2[index]}
                          </option>
                        )
                    )}
                  </select>
                ) : (
                  <select
                    name="instructor_name"
                    id="instructorSelect"
                    onChange={handleInputChange}
                  >
                    <option value={name}>{name}</option>
                  </select>
                )}
                <div className="signselect-arrow"></div>
              </div>

              <div className="signinput-group">
                <input
                  type="text"
                  name="course_period"
                  id="loginUser"
                  value={course.course_period}
                  onChange={handleInputChange}
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

export default EditCourse;
