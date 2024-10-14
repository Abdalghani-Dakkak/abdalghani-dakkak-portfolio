import { useEffect } from "react";
import { motion } from "framer-motion";
import Card from "../Components/Card";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faEnvelope,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import {
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { works } from "../Constants/works";
import { skills } from "../Constants/skills";
import { experience } from "../Constants/experience";

export default function Home() {
  // Vars
  let pointsA = [],
    pointsB = [],
    context = null,
    points = 8,
    viscosity = 20,
    mouseDist = 150,
    damping = 0.025,
    showIndicators = false,
    mouseX = 0,
    mouseY = 0,
    relMouseX = 0,
    relMouseY = 0,
    mouseLastX = 0,
    mouseLastY = 0,
    mouseDirectionX = 0,
    mouseDirectionY = 0,
    mouseSpeedX = 0,
    mouseSpeedY = 0;

  let liquidEffectOn = false,
    absorptionToBlackHole = false,
    display = false;

  let random,
    randomArr = [];

  let blackholeBounding = {};

  const liquidEffect = () => {
    let identification = document.querySelector(".identification");
    let canvas = document.querySelector(".identification canvas");

    /**
     * Get mouse direction
     **/
    function mouseDirection(e) {
      if (mouseX < e.pageX) mouseDirectionX = 1;
      else if (mouseX > e.pageX) mouseDirectionX = -1;
      else mouseDirectionX = 0;

      if (mouseY < e.pageY) mouseDirectionY = 1;
      else if (mouseY > e.pageY) mouseDirectionY = -1;
      else mouseDirectionY = 0;

      mouseX = e.pageX;
      mouseY = e.pageY;

      relMouseX = mouseX - canvas.getBoundingClientRect().left;
      relMouseY = mouseY - canvas.getBoundingClientRect().top;
    }
    window.onmousemove = mouseDirection;

    /**
     * Get mouse speed
     **/
    function mouseSpeed() {
      mouseSpeedX = mouseX - mouseLastX;
      mouseSpeedY = mouseY - mouseLastY;

      mouseLastX = mouseX;
      mouseLastY = mouseY;

      setTimeout(mouseSpeed, 50);
    }
    mouseSpeed();

    /**
     * Init button
     **/
    function initIdentification() {
      // Get identification
      let identificationWidth = identification.getBoundingClientRect().width;

      canvas.setAttribute("width", window.innerWidth);
      canvas.setAttribute("height", window.innerHeight);

      context = canvas.getContext("2d");

      // Add points
      let x = -(identificationWidth / points / 2 + 1);

      for (let i = 0; i < points; i++) {
        addPoints(x + (identificationWidth / points) * i, x);
      }

      addPoints(x + 700, x + 0);
      addPoints(x + 780, x + 60);
      addPoints(x + 780, x + 150);
      addPoints(x + 680, x + 180);
      addPoints(x + 600, x + 110);
      addPoints(x + 525, x + 190);
      addPoints(x + 560, x + 300);
      addPoints(x + 630, x + 300);
      addPoints(x + 660, x + 290);
      addPoints(x + 700, x + 280);
      addPoints(x + 730, x + 300);
      addPoints(x + 720, x + 370);
      addPoints(x + 700, x + 420);
      addPoints(x + 660, x + 470);
      addPoints(x + 620, x + 460);
      addPoints(x + 600, x + 420);
      addPoints(x + 560, x + 380);
      addPoints(x + 540, x + 390);
      addPoints(x + 545, x + 430);
      addPoints(x + 560, x + 470);
      addPoints(x + 600, x + 520);
      addPoints(x + 650, x + 530);
      addPoints(x + 700, x + 510);
      addPoints(x + 730, x + 490);
      addPoints(x + 760, x + 480);
      addPoints(x + 790, x + 490);
      addPoints(x + 800, x + 530);
      addPoints(x + 780, x + 600);
      addPoints(x + 730, x + 660);
      addPoints(x + 650, x + 690);
      addPoints(x + 560, x + 690);
      addPoints(x + 530, x + 675);
      addPoints(x + 550, x + 640);
      addPoints(x + 560, x + 600);
      addPoints(x + 500, x + 595);
      addPoints(x + 450, x + 600);
      addPoints(x + 350, x + 610);
      addPoints(x + 250, x + 620);
      addPoints(x + 100, x + 640);
      addPoints(x, x + 660);
      addPoints(x, x + 660);

      for (let i = points - 1; i >= 0; i--) {
        addPoints(x, x + (650 / points) * i);
      }

      addPoints(x, x + 700);
      addPoints(x, x + 700);
      addPoints(x + 100, x + 680);
      addPoints(x + 200, x + 660);
      addPoints(x + 300, x + 645);
      addPoints(x + 430, x + 625);
      addPoints(x + 510, x + 635);

      for (let i = 0; i <= points; i++) {
        addPoints(x + 490 - i * (520 / points), x + 680 + i * (520 / points));
      }

      addPoints(x - 30, x + 1200);

      // Start render
      renderCanvas();
    }

    /**
     * Point
     **/
    function Point(x, y, level) {
      this.x = this.ix = 50 + x;
      this.y = this.iy = 50 + y;
      this.vx = 0;
      this.vy = 0;
      this.cx1 = 0;
      this.cy1 = 0;
      this.cx2 = 0;
      this.cy2 = 0;
      this.level = level;
    }

    // Move Point
    Point.prototype.move = function () {
      this.vx += (this.ix - this.x) / (viscosity * this.level);
      this.vy += (this.iy - this.y) / (viscosity * this.level);

      let dx = this.ix - relMouseX,
        dy = this.iy - relMouseY;
      let relDist = 1 - Math.sqrt(dx * dx + dy * dy) / mouseDist;

      // Move x
      if (
        (mouseDirectionX > 0 && relMouseX > this.x) ||
        (mouseDirectionX < 0 && relMouseX < this.x)
      ) {
        if (relDist > 0 && relDist < 1) {
          this.vx = (mouseSpeedX / 4) * relDist;
        }
      }
      this.vx *= 1 - damping;
      this.x += this.vx;

      // Move y
      if (
        (mouseDirectionY > 0 && relMouseY > this.y) ||
        (mouseDirectionY < 0 && relMouseY < this.y)
      ) {
        if (relDist > 0 && relDist < 1) {
          this.vy = (mouseSpeedY / 4) * relDist;
        }
      }
      this.vy *= 1 - damping;
      this.y += this.vy;
    };

    // Define a function to move a point to a specific position and stay there for a duration
    Point.prototype.moveToAndStay = function (
      targetX,
      targetY,
      moveDuration,
      stayDuration
    ) {
      const startX = this.x;
      const startY = this.y;
      let startTime = performance.now();

      const updatePosition = (currentTime) => {
        const elapsed = currentTime - startTime;

        if (elapsed < moveDuration) {
          const progress = elapsed / moveDuration;
          const newX = startX + (targetX - startX) * progress;
          const newY = startY + (targetY - startY) * progress;

          // Update point's position
          this.x = newX;
          this.y = newY;

          // Continue animation until moveDuration is reached
          requestAnimationFrame(updatePosition);
        } else if (elapsed < moveDuration + stayDuration) {
          // Do nothing and wait during the stay duration
          requestAnimationFrame(updatePosition);
        } else {
          // Reset to the original position
          this.x = startX;
          this.y = startY;
        }
      };

      // Start the animation
      requestAnimationFrame(updatePosition.bind(this));
    };

    /**
     * Add points
     **/
    function addPoints(x, y) {
      pointsA.push(new Point(x, y, 1));
      pointsB.push(new Point(x, y, 2));
    }

    /**
     * Render canvas
     **/
    function renderCanvas() {
      // rAF
      requestAnimationFrame(renderCanvas);

      // Clear scene
      context.clearRect(
        0,
        0,
        canvas.getBoundingClientRect().width,
        canvas.getBoundingClientRect().height
      );
      context.fillStyle = "transparent";
      context.fillRect(
        0,
        0,
        canvas.getBoundingClientRect().width,
        canvas.getBoundingClientRect().height
      );

      // Move points
      if (!absorptionToBlackHole) {
        for (let i = 0; i <= pointsA.length - 1; i++) {
          pointsA[i].move();
          pointsB[i].move();
        }
      } else {
        for (let i = 0; i < pointsA.length; i++) {
          pointsA[i].moveToAndStay(
            window.innerWidth > 1250
              ? blackholeBounding.left + blackholeBounding.width / 2
              : blackholeBounding.left + blackholeBounding.width / 2 + 250,
            blackholeBounding.top + blackholeBounding.height / 2,
            (randomArr[i] * 1000) / ((pointsA[i].level + pointsB[i].level) / 2),
            (randomArr[i] * 8000) / ((pointsA[i].level + pointsB[i].level) / 2)
          );
          pointsB[i].moveToAndStay(
            window.innerWidth > 1250
              ? blackholeBounding.left + blackholeBounding.width / 2
              : blackholeBounding.left + blackholeBounding.width / 2 + 250,
            blackholeBounding.top + blackholeBounding.height / 2,
            (randomArr[i] * 1000) / pointsB[i].level,
            (randomArr[i] * 8000) / pointsB[i].level
          );
        }
      }

      // Create dynamic gradient
      let gradientX = Math.min(
        Math.max(mouseX - canvas.getBoundingClientRect().left, 0),
        canvas.getBoundingClientRect().width
      );
      let gradientY = Math.min(
        Math.max(mouseY - canvas.getBoundingClientRect().top, 0),
        canvas.getBoundingClientRect().height
      );
      let distance =
        Math.sqrt(
          Math.pow(gradientX - canvas.getBoundingClientRect().width / 2, 2) +
            Math.pow(gradientY - canvas.getBoundingClientRect().height / 2, 2)
        ) /
        Math.sqrt(
          Math.pow(canvas.getBoundingClientRect().width / 2, 2) +
            Math.pow(canvas.getBoundingClientRect().height / 2, 2)
        );

      let gradient;
      if (window.innerWidth > 767 && !display) {
        gradient = context.createRadialGradient(
          gradientX,
          gradientY,
          300 + 300 * distance,
          gradientX,
          gradientY,
          0
        );
        gradient.addColorStop(0, "#3338d8");
        gradient.addColorStop(1, "#E406D6");
      }

      // Draw shapes
      let groups = [pointsA, pointsB];

      for (let j = 0; j <= 1; j++) {
        let points = groups[j];

        if (j === 0) {
          // Background style
          context.fillStyle = "#1CE2D8";
        } else {
          // Foreground style
          context.fillStyle = gradient;
        }

        context.beginPath();
        context.moveTo(points[0].x, points[0].y);

        for (let i = 0; i < points.length; i++) {
          let p = points[i];
          let nextP = points[i + 1];

          if (nextP !== undefined) {
            p.cx1 = (p.x + nextP.x) / 2;
            p.cy1 = (p.y + nextP.y) / 2;
            p.cx2 = (p.x + nextP.x) / 2;
            p.cy2 = (p.y + nextP.y) / 2;

            context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
          } else {
            nextP = points[0];
            p.cx1 = (p.x + nextP.x) / 2;
            p.cy1 = (p.y + nextP.y) / 2;

            context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
          }
        }

        context.fill();
      }

      // Show Points
      if (showIndicators) {
        // Draw points
        context.fillStyle = "#000";
        context.beginPath();
        for (let i = 0; i < pointsA.length; i++) {
          let p = pointsA[i];

          context.rect(p.x - 1, p.y - 1, 2, 2);
        }
        context.fill();

        // Draw controls
        context.fillStyle = "#f00";
        context.beginPath();
        for (let i = 0; i < pointsA.length; i++) {
          let p = pointsA[i];

          context.rect(p.cx1 - 1, p.cy1 - 1, 2, 2);
          context.rect(p.cx2 - 1, p.cy2 - 1, 2, 2);
        }
        context.fill();
      }
    }

    // Init
    initIdentification();
  };

  window.onload = (e) => {
    // get bounding client rect of black hole
    blackholeBounding = {
      width: document.querySelector(".blackhole").getBoundingClientRect().width,
      height: document.querySelector(".blackhole").getBoundingClientRect()
        .height,
      top: document.querySelector(".blackhole").getBoundingClientRect().top,
      left: document.querySelector(".blackhole").getBoundingClientRect().left,
      bottom: document.querySelector(".blackhole").getBoundingClientRect()
        .bottom,
      right: document.querySelector(".blackhole").getBoundingClientRect().right,
    };

    if (window.innerWidth > 767 && !liquidEffectOn) {
      liquidEffectOn = !liquidEffectOn;
      liquidEffect();
    }
    if (e.currentTarget.innerWidth > 1250) {
      document
        .querySelector(".identification canvas")
        .setAttribute("width", window.innerWidth);
      document
        .querySelector(".identification canvas")
        .setAttribute("height", window.innerHeight);
    } else if (
      e.currentTarget.innerWidth >= 768 &&
      e.currentTarget.innerWidth <= 1250
    ) {
      document
        .querySelector(".identification canvas")
        .setAttribute("width", window.innerWidth + 250);
      document
        .querySelector(".identification canvas")
        .setAttribute("height", window.innerHeight);
    }
  };

  window.onresize = (e) => {
    document.querySelector(".scroll-down").style.pointerEvents = "none";
    // get bounding client rect of black hole
    let interval = setInterval(() => {
      blackholeBounding = {
        width: document.querySelector(".blackhole").getBoundingClientRect()
          .width,
        height: document.querySelector(".blackhole").getBoundingClientRect()
          .height,
        top: document.querySelector(".blackhole").getBoundingClientRect().top,
        left: document.querySelector(".blackhole").getBoundingClientRect().left,
        bottom: document.querySelector(".blackhole").getBoundingClientRect()
          .bottom,
        right: document.querySelector(".blackhole").getBoundingClientRect()
          .right,
        x: document.querySelector(".blackhole").getBoundingClientRect().x,
        y: document.querySelector(".blackhole").getBoundingClientRect().y,
      };
    }, 1);
    setTimeout(() => {
      clearInterval(interval);
      document.querySelector(".scroll-down").style.pointerEvents = "fill";
    }, 2000);

    if (window.innerWidth > 767 && !liquidEffectOn) {
      liquidEffectOn = !liquidEffectOn;
      liquidEffect();
    }
    if (e.currentTarget.innerWidth > 1250) {
      document
        .querySelector(".identification canvas")
        .setAttribute("width", window.innerWidth);
      document
        .querySelector(".identification canvas")
        .setAttribute("height", window.innerHeight);
    } else if (
      e.currentTarget.innerWidth >= 768 &&
      e.currentTarget.innerWidth <= 1250
    ) {
      document
        .querySelector(".identification canvas")
        .setAttribute("width", window.innerWidth + 250);
      document
        .querySelector(".identification canvas")
        .setAttribute("height", window.innerHeight);
    }
  };

  const absorption = () => {
    // Add random velocity
    for (let i = 0; i < pointsA.length; i++) {
      random = Math.ceil(Math.random() * 3);
      randomArr.push(random);
    }

    // Change move point's method
    absorptionToBlackHole = true;

    if (absorptionToBlackHole) {
      // Hidden the paragraph in the identification
      document.querySelector(".identification p").style.display = "none";

      // Move the identification mobile outside the screen
      document.querySelector(".identification-mobile").style.transform =
        "translate(-100%, -50%)";

      // Hidden the orbits
      Array.from(document.querySelectorAll(".orbits .orbit")).forEach((e) => {
        e.style.border = "none";
      });

      // Move the planets
      document.querySelector(".planets").style.cssText = `top: ${
        blackholeBounding.top + blackholeBounding.height / 2
      }px; right: ${
        window.innerWidth -
        (blackholeBounding.left + blackholeBounding.width / 2)
      }px; transform: translate(50%, -50%) scale(0);`;

      // Disable the "scroll down" button
      document.querySelector(".scroll-down").style.pointerEvents = "none";

      // Move the "scroll down" button
      document.querySelector(".scroll-down").style.cssText = `top: ${
        blackholeBounding.top + blackholeBounding.height / 2
      }px; left: ${
        blackholeBounding.left + blackholeBounding.width / 2
      }px; transform: translateX(-50%) rotate(45deg) scale(0);`;

      setTimeout(() => {
        // Hidden the black hole
        if (window.innerWidth > 767)
          document.querySelector(".blackhole").style.cssText =
            "transform: scale(0)";
        else
          document.querySelector(".blackhole").style.cssText =
            "transform: translate(50%, 0) scale(0)";

        setTimeout(() => {
          // Display portfolio section
          document.querySelector(".portfolio-section").style.cssText =
            "animation: moveToTop 3s cubic-bezier(0.45, 0.37, 0.42, 0.84) forwards;";

          setTimeout(() => {
            // Hidden the canvas affter move its points
            document.querySelector(".identification canvas").style.display =
              "none";

            // stop creating dynamic gradient
            display = true;

            setTimeout(() => {
              // Make the overflowY auto
              document.querySelector(".portfolio-section").style.overflowY =
                "auto";
            }, 2000);
          }, 1000);
        }, 1000);
      }, 2000);
    }
  };

  useEffect(() => {
    document.querySelector(".works-cards").onmousemove = (e) => {
      for (const card of document.querySelectorAll(".card")) {
        const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };
  }, []);

  // const [ref, inView] = useInView({
  //   rootMargin: "-50% 0px", // Trigger when the element's bottom enters the viewport
  // });

  // Return
  return (
    <>
      {/* Start Header */}
      <header>
        {/* Start Planets */}
        <div className="planets">
          {/* Start Sun */}
          <div className="sun">
            <span className="sun-in" />
            <span className="sun-in2" />
          </div>
          {/* End Sun */}

          {/* Start Orbits */}
          <div className="orbits">
            <div id="or1" className="orbit">
              <div className="planet mercury">
                <span className="mercury-in1" />
                <span className="mercury-in2" />
                <span className="mercury-in3" />
                <span className="mercury-in4" />
              </div>
            </div>
            <div id="or2" className="orbit">
              <div className="planet venus">
                <span className="venus-in1" />
                <span className="venus-in2" />
                <span className="venus-in3" />
                <span className="venus-in4" />
                <span className="venus-in5" />
              </div>
            </div>
            <div id="or3" className="orbit">
              <div className="planet earth">
                <span className="earth-in1" />
                <span className="earth-in2" />
              </div>
            </div>
            <div id="or4" className="orbit">
              <div className="planet mars">
                <span className="mars-in1" />
                <span className="mars-in2" />
                <span className="mars-in3" />
                <span className="mars-in4" />
              </div>
            </div>
          </div>
          {/* End Orbits */}
        </div>
        {/* End Planets */}

        {/* Start Identification */}
        <div className="identification">
          <p>I'm Abdalghani Dakkak and I'm a Front-End developer</p>
          <canvas />
        </div>
        {/* End Identification */}

        {/* Start Identification (Mobile Version) */}
        <div className="identification-mobile">
          <p>I'm Abdalghani Dakkak and I'm a Front-End developer</p>
        </div>
        {/* End Identification (Mobile Version) */}

        {/* Start Black Hole */}
        <div className="blackhole" />
        {/* End Black Hole */}

        {/* Start Scroll Down Button */}
        <button onClick={absorption} className="scroll-down">
          <p>Tap here</p>
          <p className="angle">
            <FontAwesomeIcon icon={faAngleDown} />
          </p>
        </button>
        {/* End Scroll Down Button */}
      </header>
      {/* End Header */}
      {/* Start Portfolio Section */}
      <main className="portfolio-section">
        {/* Start Me Section */}
        <motion.section
          className="me-parent"
          transition={{ duration: 0.5 }}
          initial={{
            x: -100,
            opacity: 0,
          }}
          whileInView={{ x: 0, opacity: 1 }}
        >
          <div className="my-image">
            <img src={require("../assets/images/me.png")} alt="" />
          </div>
          <p>
            Hello, I'm Abdalghani Dakkak, a passionate front-end developer with
            a strong commitment to crafting exceptional user experiences on the
            web. With a background rooted in both creativity and technology, I
            bridge the gap between design and functionality, transforming
            concepts into visually appealing and interactive digital solutions.
          </p>
          <ul>
            <li>
              <a
                href="https://www.facebook.com/abdalghani.dakkak"
                target="_blank"
                className="facebook"
                rel="noreferrer"
              >
                <FaFacebookSquare />
              </a>
            </li>

            <li>
              <a
                href="https://www.instagram.com/abdalghanidakkak/"
                target="_blank"
                className="instagram"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
            </li>

            <li>
              <a
                href="https://www.linkedin.com/in/abdalghani-dakkak-77705324a/"
                target="_blank"
                className="linkedin"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>
            </li>

            <li>
              <a
                href="https://github.com/Abdalghani-Dakkak?tab=repositories"
                target="_blank"
                className="github"
                rel="noreferrer"
              >
                <FaGithubSquare />
              </a>
            </li>
          </ul>
        </motion.section>
        {/* End Me Section */}

        {/* Start Works Section */}
        <section className="my-works">
          <h1 className="section-name">My Works</h1>
          <div className="works-cards">
            {works.map((work, index) => (
              <Card
                key={`card-${index}`}
                workName={work.workName}
                img={work.img}
                desc={work.desc}
                tools={work.tools}
                link={work.link}
                rtl={work.rtl}
              />
            ))}
            {/* <div>
              <Card
                workName="Game store"
                img={require("../assets/images/Game-store.png")}
                desc="Game store website"
                tools="HTML + CSS + JS"
                link="https://abdalghani-dakkak.github.io/Game-Store/"
              />
              <Card
                workName="Talal portfolio"
                img={require("../assets/images/talal-portofolio.png")}
                desc="Motion graphics Portfolio"
                tools="HTML + CSS + JS"
                link="https://abdalghani-dakkak.github.io/Motion-Graphics-Portfolio-1/"
              />
              <Card
                workName="Talal portfolio"
                img={require("../assets/images/talal-portfolio-2.png")}
                desc="Motion graphics Portfolio"
                tools="HTML + CSS + JS"
                link="https://abdalghani-dakkak.github.io/Motion-Graphics-Portfolio-2/"
              />
              <Card
                workName="Whatsapp"
                img={require("../assets/images/whatsapp.png")}
                width={"35%"}
                desc="Chating website (Mobile Version)"
                tools="HTML + CSS + JS"
                link="https://abdalghani-dakkak.github.io/Whatsapp/"
              />
            </div> */}
          </div>
        </section>
        {/* End Works Section */}

        {/* Start Experience Section */}
        <section className="my-experience">
          <h2 className="section-name">Work Experience</h2>
          {experience.map((exp, index) => (
            <div
              key={`experience-${index}`}
              style={{ display: "flex", gap: "10px" }}
            >
              <motion.div
                className="exp-border"
                transition={{ duration: 0.5 }}
                initial={{
                  height: 0,
                }}
                whileInView={{ height: "auto" }}
                // whileInView={
                //   inView
                //     ? { height: "auto" }
                //     : {
                //         height: 0,
                //       }
                // }
                // ref={ref}
              />

              <motion.div
                className="exp-container"
                transition={{ duration: 0.5 }}
                initial={{
                  x: -30,
                  opacity: 0,
                }}
                whileInView={{ x: 0, opacity: 1 }}
              >
                <div className="work-details">
                  <h3 className="job-title">{exp.jobTitle}</h3>
                  <p>{exp.companyName}</p>
                  <span>{exp.workDate}</span>
                </div>

                {exp.projects && (
                  <div className="exp-projects-container">
                    <h4 className="projects-word">Projects:</h4>
                    <ul className="exp-projects-ul">
                      {exp.projects.map((project, index) => (
                        <li key={`project-${index}`}>{project}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <ul className="exp-points">
                  {exp.points.map((point, index) => (
                    <li key={`point-${index}`}>{point}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </section>
        {/* End Experience Section */}

        {/* Start Skills Section */}
        <section className="skills">
          <h2 className="section-name">Skills</h2>
          <ul>
            {skills.map((skill, index) => (
              <motion.li
                key={`skill-${index}`}
                className="skill"
                transition={{ duration: 0.3 }}
                initial={{
                  x: index % 2 ? 100 : -100,
                  opacity: 0,
                }}
                whileInView={{ x: 0, opacity: 1 }}
              >
                <h3>
                  {skill.icon}
                  {skill.title}
                </h3>
                <div
                  className="skill-progress"
                  style={{ "--i": skill.progress }}
                  data-value={`${skill.progress}`}
                />
              </motion.li>
            ))}
          </ul>
          {/* <div className="problem-solving" /> */}
        </section>
        {/* End Skills Section */}

        {/* Start Footer */}
        <footer>
          <div className="media">
            <motion.div
              className="contact-and-cv"
              transition={{ duration: 0.5 }}
              initial={{
                x: -100,
                opacity: 0,
              }}
              whileInView={{ x: 0, opacity: 1 }}
            >
              <a href="mailto:abdalghanidakkak@gmail.com" className="contact">
                Contact
                <FontAwesomeIcon icon={faEnvelope} bounce />
              </a>
              <a
                href="./files/Abdalghani_CV.pdf"
                className="download-cv"
                download={true}
              >
                Download CV
                <FontAwesomeIcon icon={faFile} bounce />
              </a>
            </motion.div>

            <motion.ul
              transition={{ duration: 0.5 }}
              initial={{
                x: 100,
                opacity: 0,
              }}
              whileInView={{ x: 0, opacity: 1 }}
            >
              <li>
                <a
                  href="https://www.facebook.com/abdalghani.dakkak"
                  target="_blank"
                  className="facebook"
                  rel="noreferrer"
                >
                  <FaFacebookSquare />
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/abdalghanidakkak/"
                  target="_blank"
                  className="instagram"
                  rel="noreferrer"
                >
                  <FaInstagram />
                </a>
              </li>

              <li>
                <a
                  href="https://www.linkedin.com/in/abdalghani-dakkak/"
                  target="_blank"
                  className="linkedin"
                  rel="noreferrer"
                >
                  <FaLinkedin />
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/Abdalghani-Dakkak?tab=repositories"
                  target="_blank"
                  className="github"
                  rel="noreferrer"
                >
                  <FaGithubSquare />
                </a>
              </li>
            </motion.ul>
          </div>

          <p className="copyright">
            &copy; Copyright 2024-{new Date().getFullYear()} Abdalghani Dakkak
          </p>
        </footer>
        {/* End Footer */}
      </main>
      {/* End Portfolio Section */}
    </>
  );
}
