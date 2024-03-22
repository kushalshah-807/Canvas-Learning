import React, { useState } from "react";
import "../css/home.css";
import avatar from "../assets/about.jpg";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch("https://sxt9335.uta.cloud/contactform.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${email}&name=${name}&subject=${subject}&message=${message}`,
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
              window.location.href = "/Home";
            }
          });
        } else {
          Swal.fire(
            "Oops!",
            "Failed to send email. Please try again.",
            "error"
          ).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/Home";
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
            window.location.href = "/login";
          }
        });
      });
  };
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="../css/style.css" />
        <title>SkillBridge</title>
      </head>

      <body>
        {/* homeheader */}
        <section id="homeheader">
          <div className="homeheader homecontainer">
            <div className="homenav-bar">
              <div className="homebrand">
                <a href="#homehero">
                  <h1>
                    <span>S</span>kill<span>B</span>ridge
                  </h1>
                </a>
              </div>
              <div className="homenav-list">
                <ul>
                  <li>
                    <a href="#homehero" data-after="Home">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#homeservices" data-after="Service">
                      Services
                    </a>
                  </li>
                  <li>
                    <a href="#homeabout" data-after="About">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#homecontact" data-after="Contact">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="http://hxv6993.uta.cloud/skillbridge/"
                      target="_blank"
                      data-after="Contact"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    {/* <a href="signup.html" data-after="About">
                      Sign up
                    </a> */}
                    <Link
                      to="/signup"
                      className="your-class-name"
                      data-after="About"
                    >
                      Sign up
                    </Link>
                  </li>
                  <li>
                    {/* <a href="login.html" data-after="About">
                      Sign in
                    </a> */}
                    <Link
                      to="/login"
                      className="your-class-name"
                      data-after="About"
                    >
                      Sign In
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* End Header */}

        {/* homehomehero Section */}
        <section id="homehero">
          <div className="homehero homecontainer">
            <div>
              <h1>
                The Best <span></span>
              </h1>
              <h1>
                Educators <span></span>
              </h1>
              <h1>
                Never Stop Learning. <span></span>
              </h1>
              {/* <a href="login.html" type="button" className="homecta">
                Get Started
              </a> */}
              <Link to="/login" className="homecta">
                Get Started
              </Link>
            </div>
          </div>
        </section>
        {/* End homehero Section */}

        {/* Service Section */}
        <section id="homeservices">
          <div className="homeservices homecontainer">
            <div className="heroservice-top">
              <h1 className="homeherosection-title">
                Serv<span>i</span>ces
              </h1>
              <p>
                SkillBridge is committed to providing educators and learners
                with unparalleled access to educational resources and support
                around the clock. Explore how SkillBridge seamlessly and
                masterfully tailors education to individual needs, allowing
                learners to chart their unique paths to success.
              </p>
            </div>
            <div className="homeheroservice-bottom">
              <div className="homeheroservice-item">
                <div className="homeheroicon">
                  <img src="https://img.icons8.com/bubbles/100/000000/services.png" />
                </div>
                <h2>Web Design</h2>
                <p>
                  Join our web design program. Learn UX, UI, and coding. Master
                  responsive design. Create captivating websites. Unlock your
                  creative potential.
                </p>
              </div>
              <div className="homeheroservice-item">
                <div className="homeheroicon">
                  <img src="https://img.icons8.com/bubbles/100/000000/services.png" />
                </div>
                <h2>Business Analytics</h2>
                <p>
                  Unlock insights with data. Analyze trends, make data-driven
                  decisions, and drive business growth with our analytics
                  program.
                </p>
              </div>
              <div className="homeheroservice-item">
                <div className="homeheroicon">
                  <img src="https://img.icons8.com/bubbles/100/000000/services.png" />
                </div>
                <h2>Photography</h2>
                <p>
                  Capture moments, tell stories. Learn photography basics,
                  composition, and editing to express your creative vision
                  through stunning visuals.
                </p>
              </div>
              <div className="homeheroservice-item">
                <div className="homeheroicon">
                  <img src="https://img.icons8.com/bubbles/100/000000/services.png" />
                </div>
                <h2>Health & Fitness</h2>
                <p>
                  Transform lives. Train, coach, and optimize well-being. Our
                  fitness program empowers you to lead a healthier lifestyle
                  than any other programs out there.
                </p>
              </div>
              <div className="homeheroservice-item">
                <div className="homeheroicon">
                  <img src="https://img.icons8.com/bubbles/100/000000/services.png" />
                </div>
                <h2>Marketing</h2>
                <p>
                  Market like a pro. Develop marketing strategies, digital
                  campaigns, and branding skills to grow businesses and reach
                  customers effectively.
                </p>
              </div>
              <div className="homeheroservice-item">
                <div className="homeheroicon">
                  <img src="https://img.icons8.com/bubbles/100/000000/services.png" />
                </div>
                <h2>Finances & Sales</h2>
                <p>
                  Master finance and sales. Acquire financial literacy and sales
                  techniques to boost revenue and make informed financial
                  decisions.
                </p>
              </div>
              <div className="homeheroservice-item">
                <div className="homeheroicon">
                  <img src="https://img.icons8.com/bubbles/100/000000/services.png" />
                </div>
                <h2>Video Creating</h2>
                <p>
                  Lights, camera, action! Learn video production, editing, and
                  storytelling. Craft engaging videos for diverse purposes and
                  audiences.
                </p>
              </div>
              <div className="homeheroservice-item">
                <div className="homeheroicon">
                  <img src="https://img.icons8.com/bubbles/100/000000/services.png" />
                </div>
                <h2>Graphic Design</h2>
                <p>
                  Design with impact. Cultivate design skills, from concept to
                  execution, to create visually compelling graphics and
                  illustrations.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* End Service Section */}

        {/* About Section */}
        <section id="homeabout">
          <div className="homeabout homecontainer">
            <div className="homecol-left">
              <div className="homeabout-img">
                {/* <img src="images/about.jpg" alt="img" /> */}
                <img src={avatar} alt="skillbridge" />
              </div>
            </div>
            <div className="homecol-right">
              <h1 className="homeherosection-title">
                About <span>us</span>
              </h1>
              <h2>
                <p className="homelead">
                  <b>Our Mission:</b> To promote OPENNESS, INNOVATION, and
                  EXPERIMENTATION in education by providing educators access to
                  professional development courses and programs that will help
                  them thrive and succeed in their careers.
                </p>
                <p className="homelead">
                  <b>Our Vision:</b> To lead the transformation of education by
                  championing openness, innovation, and experimentation. At
                  SkillBridge, we are dedicated to empowering educators and
                  learners worldwide through our commitment to these principles.
                </p>
              </h2>
              <a href="#" className="homecta">
                Learn More
              </a>
            </div>
          </div>
        </section>
        {/* End About Section */}

        {/* Contact Section */}
        <section id="homecontact">
          <div className="homecontact homecontainer">
            <div>
              <h1 className="homeherosection-title">
                Contact <span>Us</span>
              </h1>
            </div>
            <div className="homecontact-items">
              <div className="homecontact-item">
                <div className="homeheroicon">
                  <img src="https://img.icons8.com/bubbles/100/000000/phone.png" />
                </div>
                <div className="homecontact-info">
                  <h1>Phone</h1>
                  <h2>+1 234 123 1234</h2>
                  <h2>+1 987 897 3787</h2>
                </div>
              </div>
              <div className="homecontact-item">
                <div className="homeheroicon">
                  <img src="https://img.icons8.com/bubbles/100/000000/new-post.png" />
                </div>
                <div className="homecontact-info">
                  <h1>Email</h1>
                  <h2>info@skillbridge.com</h2>
                  <h2>contactus@skillbridge.com</h2>
                </div>
              </div>
              <div className="homecontact-item">
                <div className="homeheroicon">
                  <img src="https://img.icons8.com/bubbles/100/000000/map-marker.png" />
                </div>
                <div className="homecontact-info">
                  <h1>Address</h1>
                  <h2>
                    2045 Newport Dr, Irving, Texas, United States of America.
                  </h2>
                </div>
              </div>
            </div>
            <div className="homecontact-container">
              <main className="homerow">
                <section className="homecol homeright">
                  <form onSubmit={handleFormSubmit} className="homemessageForm">
                    <div className="homeinputGroup halfWidth">
                      <input
                        type="text"
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                        required="required"
                      />
                      <label>Your Name</label>
                    </div>
                    <div className="homeinputGroup halfWidth">
                      <input
                        type="text"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required="required"
                      />
                      <label>Email</label>
                    </div>
                    <div className="homeinputGroup fullWidth">
                      <input
                        type="text"
                        name="subject"
                        onChange={(e) => setSubject(e.target.value)}
                        required="required"
                      />
                      <label>Subject</label>
                    </div>
                    <div className="homeinputGroup fullWidth">
                      <textarea
                        name="message"
                        onChange={(e) => setMessage(e.target.value)}
                        required="required"
                      ></textarea>
                      <label>Say Something</label>
                    </div>
                    <div className="homeinputGroup fullWidth">
                      <button>Send Message</button>
                    </div>
                  </form>
                </section>
              </main>
            </div>
          </div>
        </section>
        {/* End Contact Section */}
      </body>
    </html>
  );
}

export default Home;
