import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
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

      // 🔥 фильтр только проекты
      const filtered = data.filter(item => item.type === "project");

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
          {projects.map((project) => (
            <div className="projectCard" key={project.id}>
              <img src={project.imageUrl} alt="" />

              <Link to={`/project/${project.id}`}>
                <h2>{project.title}</h2>
              </Link>

              <p>{project.content}</p>
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