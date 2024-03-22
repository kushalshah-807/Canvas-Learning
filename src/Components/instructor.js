import React, { useState, useEffect } from "react";
import "../css/style.css";
import avatar1 from "../assets/avatar4.jpeg";
import { Link } from "react-router-dom";
import axios from "axios";
import DropDownProfile from "./dropdown";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { url2 } from "../globalUrl";
import { set, zip } from "lodash";
function Instructor() {
  const [openProfile, setOpenProfile] = useState(false);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const passemail = searchParams.get("email");
  const [sname, setSName] = useState("");
  const [semail, setSEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [users, setUsers] = useState("");
  const [students, setStudents] = useState("");
  const [assess, setAssessments] = useState("");
  const [courses, setCourses] = useState("");
  const  [course, setCourse] = useState([]);

  const handleCloseModal = () => {
    setOpenProfile(false);
  };

  const loadPrograms = async () => {
    fetch(`${url2}/getName`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${passemail}`,
    })
      .then((response) => response.text())
      .then((data) => {
        setName(data);
        loadCourses(data);
        loadStudents(data)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    loadPrograms();
  }, []);
  const [student, setStudent] = useState([]);

  const loadStudents = async (name) => {
    const studentResults = await axios.get(
      `${url2}/viewQuiz`
    );
    setStudent(studentResults.data);
    let c= 0;
    let d= 0;
    studentResults?.data?.map((res, index) => {
      if (res.professorName === name && res.exam==null) {
        c++;
      }
      if (res.status === "yes" && res.professorName === name) {
        d++;
      }
    })

      setCourses(c);
      setStudents(d);
      setAssessments(d);
    console.log("inside studentResults view");
    console.log(studentResults.data.studentResults);
  };

  const loadCourses = async (name) => {
    const courseResults = await axios.get(
      `${url2}/viewCourses`
    );
    const c = courseResults.data.filter((res) => res.instructor_name === name);
    setCourse(c);
    console.log("inside courseResults view");
    setCourses(c.length);
    console.log(courseResults.data);
  }
  
  const handleStudentEdit = (student) => {
    // console.log(student.email, "jhdsgjhsdgfjhfj");
    window.location.href = `/editQuiz?id=${student.id}&passemail=${passemail}&studentName=${student.studentName}&email=${student.email}&exam=${student.exam}&startTime=${student.startTime}&endTime=${student.endTime}&quizlink=${student.quizlink}`;
  };

  const handleGradeEdit = (student) => {

    // console.log( student);
    window.location.href = `/editGrade?id=${student.id}&passemail=${passemail}&studentName=${student.studentName}&courseId=${student.courseId}&email=${student.email}&grade=${student.grade}&percentage=${student.percentage}&resources=${student.resources}&quizlink=${student.quizlink}&role=instructor`;
  };
  // useEffect(() => {
  //   loadStudents();
    
  // }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch("https://sxt9335.uta.cloud/feedbackform.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `name=${sname}&email=${semail}&feedback=${feedback}`,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "Email Sent") {
          Swal.fire(
            "Success!",
            "Your query has been sent successfully!",
            "success"
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.href = `/instructor?email=${passemail}`;
            }
          });
        } else {
          alert(data);
          Swal.fire(
            "Oops!",
            "Failed to send email. Please try again.",
            "error"
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.href = `/instructor?email=${passemail}`;
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire(
          "Oops!",
          "An error occurred while sending the email.",
          "error"
        ).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `/instructor?email=${passemail}`;
          }
        });
      });
  };

  useEffect(() => {
    fetch(`${url2}/countAllStudents`, {
      method: "GET",
      
    })
      .then((response) => response.text())
      .then((data) => {
        // const [users, students, assess, courses] = data.split(",");
        setUsers(data);
        // setStudents(students);
        // setAssessments(assess);
        // setCourses(courses);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const handleDelete = (courseId) => {
    // Send a request to the PHP backend to delete the course
    fetch(`${url2}/deleteCourse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `course=${courseId}`,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "Course deleted successfully") {
          Swal.fire("Success!", "Record Deleted Successfully", "success").then(
            (result) => {
              if (result.isConfirmed) {
                window.location.href = `/instructor?email=${passemail}`;
              }
            }
          );
        } else {
          Swal.fire("Oops!", "Failed to delete user", "error");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire(
          "Oops!",
          "An error occurred while deleting the user.",
          "error"
        );
      });
  };
  const handleEdit = (student) => {
    window.location.href = `/editCourse?email=${passemail}&instructor_name=${name}&course_id=${student.course_id}&course_name=${student.course_name}&instructor_name=${student.professorName}&course_period=${student.course_period}`;
  };
  // console.log("s", student);
  return (
    <div className="stylecontainer">
      <div className="stylesidebar">
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
          integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
          crossOrigin="anonymous"
        />
        <ul>
          <li>
            <Link to={`/instructor?email=${passemail}`}>
              <i className="fas fa-book"></i>
              <div className="styletitle">SkillBridge</div>
            </Link>
          </li>
          <li>
            <Link to={`/instructor?email=${passemail}`}>
              <i className="fas fa-th-large"></i>
              <div className="styletitle">Instructor Dashboard</div>
            </Link>
          </li>
          <li>
            <Link to={`/addCourses?email=${passemail}&name=${name}`}>
              <i className="fa fa-sticky-note"></i>
              <div className="styletitle">Add Course</div>
            </Link>
          </li>
          <li>
            {/* <a href="#">
              <i className="fas fa-tag"></i>
              <div className="styletitle">Assessment Creation</div>
            </a> */}
            <Link to={`/assessment?email=${passemail}`}>
              <i class="fa fa-file" aria-hidden="true"></i>
              <div className="styletitle">Assessment Creation</div>
            </Link>
          </li>
          <li>
            <Link to={`/edit?email=${passemail}`}>
              <i class="fa fa-user-md" aria-hidden="true"></i>
              <div className="styletitle">Edit Profile</div>
            </Link>
          </li>
          <li>
            <Link to={`/updatePassword?email=${passemail}`}>
              <i class="fa fa-user-md" aria-hidden="true"></i>
              <div className="styletitle">Update Password</div>
            </Link>
          </li>
          <li>
            <Link to={`/messagechat?name=${name}&email=${passemail}`}>
              <i class="fa fa-comment" aria-hidden="true"></i>
              <div className="styletitle">WebChat</div>
            </Link>
          </li>
          <li>
            <Link to={`/aiBot?name=${name}&email=${passemail}`}>
              <i class="fa fa-comment" aria-hidden="true"></i>
              <div className="styletitle">AI Bot</div>
            </Link>
          </li>
        </ul>
      </div>
      <div className="stylemain">
        <div className="styletop-bar">
          <div className="stylesearch">
            <input type="text" name="search" placeholder="Search here.." />
            <label htmlFor="search">
              <i className="fas fa-search"></i>
            </label>
          </div>
          <i>{name}</i>
          <div
            className="styleuser"
            onClick={() => setOpenProfile((prev) => !prev)}
          >
            {/* <img src="images/avatar.png" alt="User Avatar" /> */}
            <img src={avatar1} alt="skillbridge" />
          </div>
          {openProfile && (
            <DropDownProfile email={passemail} closeModal={handleCloseModal} />
          )}
        </div>
        <div className="stylecards">
          <div className="stylecard">
            <div className="stylecard-content">
              <div className="stylenumber">{users}</div>
              <div className="stylecard-name">All Students</div>
            </div>
            <div className="styleicon-box">
              <i class="fa fa-user" aria-hidden="true"></i>
            </div>
          </div>
          <div className="stylecard">
            <div className="stylecard-content">
              <div className="stylenumber">{students}</div>
              <div className="stylecard-name">Students Enrolled</div>
            </div>
            <div className="styleicon-box">
              <i class="fa fa-users" aria-hidden="true"></i>
            </div>
          </div>
          <div className="stylecard">
            <div className="stylecard-content">
              <div className="stylenumber">{assess}</div>
              <div className="stylecard-name">Assessments</div>
            </div>
            <div className="styleicon-box">
              <i class="fa fa-list-alt" aria-hidden="true"></i>
            </div>
          </div>
          <div className="stylecard">
            <div className="stylecard-content">
              <div className="stylenumber">{courses}</div>
              <div className="stylecard-name">Courses</div>
            </div>
            <div className="styleicon-box">
              <i class="fa fa-file" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div className="styletables">
          {/* Student Grading and Tracking */}
          <div className="StyleAllRoles">
            <div className="styleheading">
              {/* <Link to={`/addCourses?email=${email}`} className="stylebtn">
                Add Course
              </Link> */}
              <h2>Your Courses</h2>
            </div>
            <table className="styleroles">
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Course Period</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {course?.map((res, index) => {
                  if (res.instructor_name === name) {
                    return (
                      <tr key={index}>
                        <td>{res.course_id}</td>
                        <td>{res.course_name}</td>
                        <td>{res.course_period}</td>
                        <td>
                          <i
                            className="fas fa-edit"
                            onClick={() => handleEdit(res)}
                          ></i>
                          &nbsp;
                          <i
                            className="fas fa-trash"
                            onClick={() => handleDelete(res.course_id)}
                          ></i>
                          &nbsp;
                        </td>
                      </tr>
                    );
                  }
                  return null; // If studentName is null, return null to skip rendering
                })}
              </tbody>
            </table>
          </div>
          <div className="StyleAllRoles">
            <div className="styleheading">
              {/* <Link to={`/addCourses?email=${email}`} className="stylebtn">
                Add Course
              </Link> */}
              <h2>Students Enrolled</h2>
            </div>
            <table className="styleroles">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Student Email</th>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Professor Name</th>
                  <th>Course Period</th>
                </tr>
              </thead>
              <tbody>
                {student.map((res, index) => {
                  // console.log('rr',res);
                  if (res.status === "yes" && res.professorName === name) {
                    return (
                      <tr key={index}>
                        <td>{res.studentName}</td>
                        <td>{res.email}</td>
                        <td>{res.courseId}</td>
                        <td>{res.courseName}</td>
                        <td>{res.professorName}</td>
                        <td>{res.period}</td>
                      </tr>
                    );
                  }
                  return null; // If studentName is null, return null to skip rendering
                })}
              </tbody>
            </table>
          </div>
          {/* Student Grading and Tracking */}
          {/* Grades */}
          <div className="StyleAllRoles">
            <div className="styleheading">
              <h2> Assessments</h2>
            </div>
            <table className="styleroles">
              <thead>
                {}
                <tr>
                  <th>Student Name</th>
                  <th>Student Email</th>
                  <th>Assessment Link</th>
                  <th>Resources</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {student.map((res, index) => {
                  if (res.professorName === name && res.exam!=null) {
                    return (
                      <tr key={index}>
                        <td>{res.studentName}</td>
                        <td>{res.email}</td>
                        <td>{res.quizlink}</td>
                        <td>{res.resources}</td>
                        <td>{res.startTime}</td>
                        <td>{res.endTime}</td>
                        <td>{res.grade}</td>
                        <td>
                          <i
                            className="fas fa-edit"
                            onClick={() => handleGradeEdit(res)}
                          ></i>
                          &nbsp;
                          {/* <i className="fas fa-trash" onClick={() => handleDelete(res.course_id)}></i> */}
                          &nbsp;
                        </td>
                      </tr>
                    );
                  }
                  return null; // If studentName is null, return null to skip rendering
                })}
              </tbody>
            </table>
          </div>
          {/* Grades */}
        </div>
        <div className="stylefeedback">
          <div className="stylefeedback1">
            <h1>Provide Update</h1>
            <form onSubmit={handleFormSubmit}>
              <input
                onChange={(e) => setSName(e.target.value)}
                type="text"
                placeholder="Student Name"
              />
              <input
                type="email"
                onChange={(e) => setSEmail(e.target.value)}
                placeholder="Student UTA Email ID"
              />
              <textarea
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Your Feedback..."
              ></textarea>
              <button type="submit">Send Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Instructor;
