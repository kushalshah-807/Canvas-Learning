import { useState, useEffect, React } from "react";
import "../css/style.css"; // Import your CSS file
import avatar1 from "../assets/avatar4.jpeg";
import { Link } from "react-router-dom";
import axios from "axios";
import DropDownProfile from "./dropdown";
import "font-awesome/css/font-awesome.min.css";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { url2 } from "../globalUrl";
import { set } from "lodash";

function Admin() {
  const [openProfile, setOpenProfile] = useState(false);
  const [course, setCourse] = useState([]);
  const [courses, setCourses] = useState("");
  const [sname, setSName] = useState("");
  const [semail, setSEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [editingCourse, setEditingCourse] = useState(null); // Track the course being edited
  const [isEditing, setIsEditing] = useState(false); // Control the visibility of the edit form
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const email = searchParams.get("email");
  const [program, setProgram] = useState([]);
  const [programs, setPrograms] = useState("");
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState("");
  const [name, setName] = useState("");
  const [policy, setPolicies] = useState("");

  // Program handler start
  const loadPrograms = async () => {
    const programResults = await axios.get(
      `${url2}/viewPrograms`
    );
    setProgram(programResults.data);
    setPrograms(programResults.data.length);
    console.log("inside proframs view");
    console.log(programResults.data.AllPrograms);
    fetch(`${url2}/getName`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${email}`,
    })
      .then((response) => response.text())
      .then((data) => {
        setName(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCloseModal = () => {
    setOpenProfile(false);
  };

  const handleProgramEdit = (program) => {
    window.location.href = `/editProgram?email=${email}&p_id=${program.p_id}&programName=${program.programName}&programDescription=${program.programDescription}&programOrganizer=${program.programOrganizer}&startDate=${program.startDate}&endDate=${program.endDate}`;
  };

  const handleProgramDelete = (programName) => {
    // Send a request to the PHP backend to delete the course
    fetch(`${url2}/deleteProgram`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `program=${programName}`,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "Program deleted successfully") {
          Swal.fire("Success!", "Record Deleted Successfully", "success").then(
            (result) => {
              if (result.isConfirmed) {
                window.location.href = `/admin?email=${email}`;
              }
            }
          );
        } else {
          Swal.fire("Oops!", "Failed to delete Progra ", "error");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire(
          "Oops!",
          "An error occurred while deleting the Program.",
          "error"
        );
      });
  };

  useEffect(() => {
    loadPrograms();
  }, []);

  // Program handler End
  // User handler Start
  const loadUsers = async () => {
    try{
      const userResults = await axios.get(
        `${url2}/viewUsers`
      );
      setUser(userResults.data);
      setUsers(userResults.data.length);
      console.log("inside users view");
    
    }catch(error){
      console.log(error);
    }
   
  };

  const handleUserEdit = (user) => {
    window.location.href = `/editUser?email=${email}&first_name=${user.first_name}&last_name=${user.last_name}&passemail=${user.email}&password=${user.password}&role=${user.role}`;
  };

  const handleUserDelete = (emailID) => {
    // Send a request to the PHP backend to delete the course
    fetch(`${url2}/deleteUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${emailID}`,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "User deleted successfully") {
          Swal.fire("Success!", "User deleted successfully", "success").then(
            (result) => {
              if (result.isConfirmed) {
                window.location.href = `/admin?email=${email}`;
              }
            }
          );
        } else {
          Swal.fire("Oops!", "Failed to delete User ", "error");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire(
          "Oops!",
          "An error occurred while deleting the User.",
          "error"
        );
      });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const [admin, setAdmin] = useState("");
  const [students, setStudents] = useState("");
  const [instructors, setInstructors] = useState("");
  const [pc, setPC] = useState("");
  const [qa, setQA] = useState("");

  useEffect(() => {
    fetch(`${url2}/viewPolicies`)
      .then((response) => response.json())
      .then((data) => {
        setPolicies(data.length);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    fetch("https://sxt9335.uta.cloud/fetchbar.php")
      .then((response) => response.text())
      .then((data) => {
        const [admin, students, instructors, pc, qa] = data.split(",");
        setAdmin(admin);
        setStudents(students);
        setInstructors(instructors);
        setPC(pc);
        setQA(qa);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // User handler End
  const loadCourses = async () => {
    const courseResults = await axios.get(
      `${url2}/viewCourses`
    );
    setCourse(courseResults.data);
    setCourses(courseResults.data.length);
    console.log(courseResults.data);
  };

  const handleEdit = (course) => {
    window.location.href = `/editCourse?email=${email}&course_id=${course.course_id}&course_name=${course.course_name}&instructor_name=${course.instructor_name}&course_period=${course.course_period}&role=admin`;
  };

  useEffect(() => {
    loadCourses();
    // loadPrograms();
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
                window.location.href = `/admin?email=${email}`;
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
              window.location.href = `/admin?email=${email}`;
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
              window.location.href = `/admin?email=${email}`;
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
            window.location.href = `/admin?email=${email}`;
          }
        });
      });
  };

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
            <Link to={`/admin?email=${email}`}>
              <i class="fa fa-bars" aria-hidden="true"></i>
              <div className="styletitle">SkillBridge</div>
            </Link>
          </li>
          <li>
            {/* <a href="#">
              <i className="fas fa-th-large"></i>
              <div className="styletitle">Admin Dashboard</div>
            </a> */}
            <Link to={`/admin?email=${email}`}>
              <i className="fas fa-th-large"></i>
              <div className="styletitle">Admin Dashboard</div>
            </Link>
          </li>
          <li>
            <Link to={`/addCourses?email=${email}`}>
              <i class="fa fa-sticky-note" aria-hidden="true"></i>
              <div className="styletitle">Add Course</div>
            </Link>
          </li>
          <li>
            <Link to={`/addProgram?email=${email}`}>
              <i class="fa fa-tasks" aria-hidden="true"></i>
              <div className="styletitle">Add Programs</div>
            </Link>
          </li>
          <li>
            <Link to={`/addUser?email=${email}`}>
              <i class="fa fa-users" aria-hidden="true"></i>
              <div className="styletitle">Add Users</div>
            </Link>
          </li>
          <li>
            {/* <a href="#">
              <i className="fas fa-tag"></i>
              <div className="styletitle">Repots</div>
            </a> */}
            <Link
              to={`/reports?email=${email}&admin=${admin}&students=${students}&instructors=${instructors}&pc=${pc}&qa=${qa}&name=${name}`}
            >
              <i class="fa fa-line-chart" aria-hidden="true"></i>
              <div className="styletitle">Reports</div>
            </Link>
          </li>
          <li>
            <Link to={`/edit?email=${email}`}>
              <i class="fa fa-user-md" aria-hidden="true"></i>
              <div className="styletitle">Edit Profile</div>
            </Link>
          </li>
          <li>
            <Link to={`/updatePassword?email=${email}`}>
              <i class="fa fa-user-md" aria-hidden="true"></i>
              <div className="styletitle">Update Password</div>
            </Link>
          </li>
          <li>
            <Link to={`/messagechat?name=${name}&email=${email}`}>
              <i class="fa fa-comment" aria-hidden="true"></i>
              <div className="styletitle">WebChat</div>
            </Link>
          </li>
          <li>
            <Link to={`/aiBot?name=${name}&email=${email}`}>
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
            <DropDownProfile email={email} closeModal={handleCloseModal} />
          )}
        </div>
        <div className="stylecards">
          <div className="stylecard">
            <div className="stylecard-content">
              <div className="stylenumber">{users}</div>
              <div className="stylecard-name">Users</div>
            </div>
            <div className="styleicon-box">
              <i class="fa fa-user" aria-hidden="true"></i>
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
          <div className="stylecard">
            <div className="stylecard-content">
              <div className="stylenumber">{programs}</div>
              <div className="stylecard-name">Programs</div>
            </div>
            <div className="styleicon-box">
              <i class="fa fa-list-alt" aria-hidden="true"></i>
            </div>
          </div>
          <div className="stylecard">
            <div className="stylecard-content">
              <div className="stylenumber">{policy}</div>
              <div className="stylecard-name">QA Policies</div>
            </div>
            <div className="styleicon-box">
              <i class="fa fa-envelope" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div className="styletables">
          {/* Course Table Start*/}
          <div className="StyleAllRoles">
            <div className="styleheading">
              <h2>Manage Courses</h2>
            </div>
            <table className="styleroles">
              <thead>
                <tr>
                  <th>Course Name</th>
                  <th>Course Id</th>
                  <th>Instructor Name</th>
                  <th>Course Period</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {course.map((res, index) => {
                  // if (res.status === "no") {
                    return (
                      <tr key={index}>
                        <td>{res.course_name}</td>
                        <td>{res.course_id}</td>
                        <td>{res.instructor_name}</td>
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
                  // }
                  // return null; // If the condition is not met, return null (or any other placeholder)
                })}
              </tbody>
            </table>
          </div>
          {/* Course Table End */}
          {/* Program Management Table Start */}
          <div className="StyleAllRoles">
            <div className="styleheading">
              <h2>Manage Programs</h2>
            </div>
            <table className="styleroles">
              <thead>
                <tr>
                  <th>Program Name</th>
                  <th>Program Organiser</th>
                  <th>Program Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Venue</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {program?.map((res, index) => (
                  <tr key={index}>
                    <td>{res.programName}</td>
                    <td>{res.programOrganizer}</td>
                    <td>{res.programDescription}</td>
                    <td>{res.startDate}</td>
                    <td>{res.endDate}</td>
                    <td>{res.venue}</td>
                    <td>
                      <i
                        className="fas fa-edit"
                        onClick={() => handleProgramEdit(res)}
                      ></i>
                      &nbsp;
                      <i
                        className="fas fa-trash"
                        onClick={() => handleProgramDelete(res.programName)}
                      ></i>
                      &nbsp;
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Program Table end */}
          {/* Manage Users Start*/}
          <div className="StyleAllRoles">
            <div className="styleheading">
              <h2>Manage Users</h2>
            </div>
            <table className="styleroles">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {user.map((res, index) => (
                  <tr key={index}>
                    <td>{res.first_name}</td>
                    <td>{res.last_name}</td>
                    <td>{res.email}</td>
                    <td>{res.password}</td>
                    <td>{res.role}</td>
                    <td>
                      <i
                        className="fas fa-edit"
                        onClick={() => handleUserEdit(res)}
                      ></i>
                      &nbsp;
                      <i
                        className="fas fa-trash"
                        onClick={() => handleUserDelete(res.email)}
                      ></i>
                      &nbsp;
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Manage Users End*/}
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

export default Admin;
