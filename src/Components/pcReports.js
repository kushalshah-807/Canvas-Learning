import React, { useEffect, useState, useRef } from "react";
import "../css/pc.css";
import avatar1 from "../assets/avatar4.jpeg";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import Swal from "sweetalert2";
import Chart from "chart.js/auto";
import DropDownProfile from "./dropdown";
import { useLocation } from "react-router-dom";

function PCReports() {
  const [openProfile, setOpenProfile] = useState(false);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const pieChartRef = useRef(null);
  const [chartData, setChartData] = useState(null);
  const handleCloseModal = () => {
    setOpenProfile(false);
  };

  useEffect(() => {
    // Data for the charts
    fetch("https://sxt9335.uta.cloud/fetchpie.php") // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        setChartData(data);

        // Create the Pie Chart
        new Chart(pieChartRef.current, {
          type: "pie",
          data: data,
          options: {
            responsive: false,
          },
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
            <Link to={`/pc?email=${email}`}>
              <i className="fas fa-book"></i>
              <div className="pctitle">SkillBridge</div>
            </Link>
          </li>
          <li>
            <Link to={`/pc?email=${email}`}>
              <i className="fas fa-th-large"></i>
              <div className="pctitle">PC Dashboard</div>
            </Link>
          </li>
          <li>
            <Link to={`/addProgram?email=${email}`}>
              <i class="fa fa-tasks" aria-hidden="true"></i>
              <div className="pctitle">Add Programs</div>
            </Link>
          </li>
          <li>
            <Link to={`/pcreports?email=${email}&name=${name}`}>
              <i class="fa fa-line-chart" aria-hidden="true"></i>
              <div className="pctitle">Reports</div>
            </Link>
          </li>
          <li>
            <Link to={`/edit?email=${email}`}>
              <i class="fa fa-user-md" aria-hidden="true"></i>
              <div className="pctitle">Edit Profile</div>
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
              <div className="pctitle">WebChat</div>
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
          <div></div>
        </div>
        <div className="styletables">
          <div style={{ textAlign: "center" }}>
            <h1 style={{ marginLeft: "-110px" }}>Students Enrolled</h1>
            <div className="App">
              <canvas ref={pieChartRef} width="1000" height="700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PCReports;
