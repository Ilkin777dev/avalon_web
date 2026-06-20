import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase";

import Header from "../components/Header";
import ContactUs from "../components/ContactUs";
import MediaLinks from "../components/MediaLinks";
import Footer from "../components/Footer";

import "./Projects.css";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const q = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filtered = data.filter(
        (item) => item.type === "project"
      );

      setProjects(filtered);
    };

    fetchProjects();
  }, []);

  return (
    <div>
      <Header />

      <div className="projects_section">
        <h1>Projects</h1>

        <div className="projects_grid">

          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`projectCard ${
                index % 2 === 0
                  ? "normal"
                  : "reverse"
              }`}
            >

              {/* IMAGE */}

              <div className="project_image_wrapper">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                />
              </div>

              {/* CONTENT */}

              <div className="project_content">

                <span className="project_label">
                  PROJECT
                </span>

                <Link to={`/project/${project.id}`}>
                  <h2>{project.title}</h2>
                </Link>

                <div className="projectUnderline">{/* Underline */}</div>

                <div
                  className="project_text"
                  dangerouslySetInnerHTML={{
                    __html: project.content,
                  }}
                ></div>

                <div className="projectUnderline">{/* Underline */}</div>

                <Link
                  to={`/project/${project.id}`}
                  className="project_more_btn"
                >
                  View Project
                </Link>

              </div>
            </div>
          ))}

        </div>
      </div>

      <ContactUs />
      <MediaLinks />
      <Footer />
    </div>
  );
}